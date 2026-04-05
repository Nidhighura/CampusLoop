package com.campusloop.service;

import com.campusloop.dto.response.ContactResponse;
import com.campusloop.model.Product;
import com.campusloop.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ProductService productService;

    @Transactional(readOnly = true)
    public ContactResponse getSellerContact(Long productId) {
        Product product = productService.findProduct(productId);
        User seller = product.getSeller();
        return new ContactResponse(
                seller.getName(),
                seller.getEmail(),
                seller.getPhoneNumber(),
                seller.getCollegeName());
    }
}
