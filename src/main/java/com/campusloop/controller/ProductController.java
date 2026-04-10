package com.campusloop.controller;

import com.campusloop.dto.request.CreateProductRequest;
import com.campusloop.dto.response.ApiResponse;
import com.campusloop.model.ProductCategory;
import com.campusloop.service.CurrentUserService;
import com.campusloop.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Products", description = "Marketplace product APIs")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final CurrentUserService currentUserService;
    private final ObjectMapper objectMapper;
    private final Validator validator;

    @GetMapping
    @Operation(summary = "Get paginated product listings")
    public ResponseEntity<ApiResponse> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) ProductCategory category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        String effectiveSearch = (query != null && !query.isBlank()) ? query : search;
        return ResponseEntity.ok(ApiResponse.success(
                "Products fetched successfully.",
                productService.getProducts(effectiveSearch, category, page, size)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product details by id")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully.", productService.getProductById(id)));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    @Operation(summary = "Create a new product listing")
    public ResponseEntity<ApiResponse> createProduct(
            @RequestPart("metadata") String metadata,
            @RequestPart(value = "images", required = false) MultipartFile[] images) {
        CreateProductRequest request = parseMetadata(metadata);
        validateRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(
                "Product created successfully.",
                productService.createProduct(currentUserService.getAuthenticatedUser(), request, images)));
    }

    @PostMapping(consumes = {"application/json"})
    @Operation(summary = "Create a new product listing using direct image URLs")
    public ResponseEntity<ApiResponse> createProductFromJson(@RequestBody CreateProductRequest request) {
        validateRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(
                "Product created successfully.",
                productService.createProduct(currentUserService.getAuthenticatedUser(), request, null)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a product listing owned by the authenticated user")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id, currentUserService.getAuthenticatedUser());
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully.", id));
    }

    @PatchMapping("/{id}/mark-sold")
    @Operation(summary = "Mark a product as sold")
    public ResponseEntity<ApiResponse> markAsSold(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Product marked as sold successfully.",
                productService.markAsSold(id, currentUserService.getAuthenticatedUser())));
    }

    private CreateProductRequest parseMetadata(String metadata) {
        try {
            return objectMapper.readValue(metadata, CreateProductRequest.class);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid product metadata JSON.");
        }
    }

    private void validateRequest(CreateProductRequest request) {
        Set<ConstraintViolation<CreateProductRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            String message = violations.stream()
                    .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                    .sorted()
                    .reduce((first, second) -> first + ", " + second)
                    .orElse("Invalid product request.");
            throw new IllegalArgumentException(message);
        }
    }
}
