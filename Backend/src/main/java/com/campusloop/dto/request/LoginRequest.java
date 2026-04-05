package com.campusloop.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Payload used to authenticate a user")
public class LoginRequest {

    @NotBlank
    @Email
    @Schema(example = "aarav@college.edu")
    private String email;

    @NotBlank
    @Schema(example = "CampusLoop@123")
    private String password;
}
