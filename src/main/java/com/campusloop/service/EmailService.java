package com.campusloop.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    public void sendOtpEmail(String toEmail, String otp) {
        if (!StringUtils.hasText(mailUsername)) {
            log.info("Mail credentials are not configured. OTP for {} is {}", toEmail, otp);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("CampusLoop OTP Verification");
        message.setText("Your CampusLoop OTP is: " + otp + ". It will expire soon.");
        mailSender.send(message);
    }
}
