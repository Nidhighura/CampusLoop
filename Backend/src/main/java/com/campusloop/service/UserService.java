package com.campusloop.service;

import com.campusloop.dto.response.UserProfileResponse;
import com.campusloop.exception.ResourceNotFoundException;
import com.campusloop.model.User;
import com.campusloop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(Long id) {
        User user = findUser(id);
        return toProfileResponse(user);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(User user) {
        return toProfileResponse(user);
    }

    private UserProfileResponse toProfileResponse(User user) {
        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getCollegeName(),
                user.isVerified());
    }

    @Transactional(readOnly = true)
    public User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
}
