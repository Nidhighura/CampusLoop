package com.campusloop.service;

import com.campusloop.exception.UnauthorizedException;
import com.campusloop.model.User;
import com.campusloop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final UserRepository userRepository;

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("Authentication is required.");
        }

        String email = String.valueOf(authentication.getPrincipal());
        if ("anonymousUser".equalsIgnoreCase(email)) {
            throw new UnauthorizedException("Authentication is required.");
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Authenticated user no longer exists."));
    }
}
