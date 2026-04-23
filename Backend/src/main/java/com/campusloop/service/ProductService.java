package com.campusloop.service;

import com.campusloop.dto.request.CreateProductRequest;
import com.campusloop.dto.response.PagedResponse;
import com.campusloop.dto.response.ProductImageResponse;
import com.campusloop.dto.response.ProductResponse;
import com.campusloop.dto.response.UserSummaryResponse;
import com.campusloop.exception.ResourceNotFoundException;
import com.campusloop.exception.UnauthorizedException;
import com.campusloop.model.Product;
import com.campusloop.model.ProductCategory;
import com.campusloop.model.ProductImage;
import com.campusloop.model.User;
import com.campusloop.repository.ProductRepository;
import com.campusloop.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageStorageService imageStorageService;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PagedResponse<ProductResponse> getProducts(String search, ProductCategory category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Product> products = productRepository.searchProducts(normalizeSearch(search), category, pageable);
        return new PagedResponse<>(
                products.getContent().stream().map(this::toResponse).toList(),
                products.getNumber(),
                products.getSize(),
                products.getTotalElements(),
                products.getTotalPages());
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        return toResponse(findProduct(id));
    }

    @Transactional
    public ProductResponse createProduct(User seller, CreateProductRequest request, org.springframework.web.multipart.MultipartFile[] files) {
        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setSold(false);
        product.setSeller(seller);

        List<String> imageUrls = new ArrayList<>();
        if (request.getImageUrls() != null) {
            imageUrls.addAll(request.getImageUrls().stream()
                    .filter(url -> url != null && !url.isBlank())
                    .map(String::trim)
                    .filter(this::isSupportedImageUrl)
                    .toList());
        }
        imageUrls.addAll(imageStorageService.uploadImages(files));

        for (String imageUrl : imageUrls) {
            ProductImage productImage = new ProductImage();
            productImage.setImageUrl(imageUrl);
            productImage.setProduct(product);
            product.getImages().add(productImage);
        }

        return toResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id, User currentUser) {
        Product product = findProduct(id);
        ensureOwner(product, currentUser);
        productRepository.delete(product);
    }

    @Transactional
    public ProductResponse markAsSold(Long id, User currentUser) {
        Product product = findProduct(id);
        ensureOwner(product, currentUser);
        product.setSold(true);
        return toResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return productRepository.findBySellerId(userId).stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByUser(User user) {
        return productRepository.findBySellerId(user.getId()).stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public Product findProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    private void ensureOwner(Product product, User currentUser) {
        if (!product.getSeller().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You do not have permission to modify this product.");
        }
    }

    private ProductResponse toResponse(Product product) {
        User seller = product.getSeller();
        UserSummaryResponse sellerSummary = new UserSummaryResponse(
                seller.getId(),
                seller.getName(),
                seller.getEmail(),
                seller.getCollegeName(),
                seller.isVerified());

        List<ProductImageResponse> images = product.getImages().stream()
                .map(image -> new ProductImageResponse(image.getId(), image.getImageUrl()))
                .toList();

        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(),
                product.isSold(),
                product.getCreatedAt(),
                sellerSummary,
                images);
    }

    private String normalizeSearch(String search) {
        return (search == null || search.isBlank()) ? null : search.trim();
    }

    private boolean isSupportedImageUrl(String url) {
        String normalized = url.toLowerCase(Locale.ROOT);
        return normalized.startsWith("http://") || normalized.startsWith("https://");
    }
}
