package com.campusloop.service;

import com.campusloop.dto.request.LoginRequest;
import com.campusloop.dto.request.OtpVerificationRequest;
import com.campusloop.dto.request.SignupRequest;
import com.campusloop.dto.response.AuthResponse;
import com.campusloop.dto.response.UserSummaryResponse;
import com.campusloop.exception.BadRequestException;
import com.campusloop.model.OtpVerification;
import com.campusloop.model.User;
import com.campusloop.repository.OtpVerificationRepository;
import com.campusloop.repository.UserRepository;
import com.campusloop.security.JwtTokenProvider;
import com.campusloop.util.OtpGenerator;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OtpVerificationRepository otpVerificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpGenerator otpGenerator;
    private final EmailService emailService;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${app.otp.expiration-minutes}")
    private long otpExpirationMinutes;

    @Transactional
    public String signup(SignupRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("A user with this email already exists.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(email);
        user.setPhoneNumber(request.getPhoneNumber());
        user.setCollegeName(request.getCollegeName());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setVerified(false);
        userRepository.save(user);

        otpVerificationRepository.deleteByEmail(user.getEmail());
        String otp = otpGenerator.generate();
        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setEmail(user.getEmail());
        otpVerification.setOtp(otp);
        otpVerification.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpirationMinutes));
        otpVerification.setUsed(false);
        otpVerificationRepository.save(otpVerification);

        emailService.sendOtpEmail(user.getEmail(), otp);
        return user.getEmail();
    }

    @Transactional
    public void verifyOtp(OtpVerificationRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        OtpVerification otpVerification = otpVerificationRepository.findTopByEmailOrderByCreatedAtDesc(email)
                .orElseThrow(() -> new BadRequestException("OTP not found for this email."));

        if (otpVerification.isUsed()) {
            throw new BadRequestException("OTP has already been used.");
        }
        if (otpVerification.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP has expired.");
        }
        if (!otpVerification.getOtp().equals(request.getOtp())) {
            throw new BadRequestException("Invalid OTP.");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found for OTP verification."));
        user.setVerified(true);
        otpVerification.setUsed(true);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password.");
        }
        if (!user.isVerified()) {
            throw new BadRequestException("Please verify your email before logging in.");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());
        return new AuthResponse(token, toSummary(user));
    }

    public UserSummaryResponse toSummary(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCollegeName(),
                user.isVerified());
    }
}
