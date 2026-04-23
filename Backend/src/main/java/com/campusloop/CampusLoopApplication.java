package com.campusloop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class CampusLoopApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusLoopApplication.class, args);
    }
}
