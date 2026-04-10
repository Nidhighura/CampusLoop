package com.campusloop.controller;

import com.campusloop.dto.request.LoginRequest;
import com.campusloop.dto.request.OtpVerificationRequest;
import com.campusloop.dto.request.SignupRequest;
import com.campusloop.dto.response.ApiResponse;
import com.campusloop.dto.response.AuthResponse;
import com.campusloop.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth", description = "Authentication and OTP verification APIs")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @Operation(summary = "Register a new user and trigger OTP delivery")
    public ResponseEntity<ApiResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Signup successful. OTP sent to email.", authService.signup(request)));
    }

    @PostMapping("/verify-otp")
    @Operation(summary = "Verify a user's OTP code")
    public ResponseEntity<ApiResponse> verifyOtp(@Valid @RequestBody OtpVerificationRequest request) {
        authService.verifyOtp(request);
        return ResponseEntity.ok(ApiResponse.success("OTP verified successfully.", request.getEmail()));
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate a user and return a JWT")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful.", authResponse));
    }
}
