package com.campusloop.controller;

import com.campusloop.dto.response.ApiResponse;
import com.campusloop.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contact")
@Tag(name = "Contact", description = "Protected seller contact access APIs")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @GetMapping("/products/{productId}")
    @Operation(summary = "Reveal seller contact details for a product")
    public ResponseEntity<ApiResponse> getSellerContact(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.success(
                "Seller contact fetched successfully.",
                contactService.getSellerContact(productId)));
    }
}
