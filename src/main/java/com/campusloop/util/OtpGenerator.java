package com.campusloop.util;

import java.security.SecureRandom;
import org.springframework.stereotype.Component;

@Component
public class OtpGenerator {

    private static final SecureRandom RANDOM = new SecureRandom();

    public String generate() {
        int value = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(value);
    }
}
