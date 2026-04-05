package com.campusloop.controller;

import com.campusloop.dto.response.ApiResponse;
import com.campusloop.service.ProductService;
import com.campusloop.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "User profile and seller ownership APIs")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/{id}")
    @Operation(summary = "Fetch a user profile")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully.", userService.getUserProfile(id)));
    }

    @GetMapping("/{id}/products")
    @Operation(summary = "Fetch products listed by a specific user")
    public ResponseEntity<ApiResponse> getUserProducts(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
                "User products fetched successfully.",
                productService.getProductsByUser(id)));
    }
}
