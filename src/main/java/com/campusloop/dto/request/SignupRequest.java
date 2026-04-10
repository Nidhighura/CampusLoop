package com.campusloop.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Payload used to register a new user")
public class SignupRequest {

    @NotBlank
    @Size(max = 100)
    @Schema(example = "Aarav Sharma")
    private String name;

    @NotBlank
    @Email
    @Schema(example = "aarav@college.edu")
    private String email;

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must contain exactly 10 digits")
    @Schema(example = "9876543210")
    private String phoneNumber;

    @NotBlank
    @Schema(example = "LNCT Bhopal")
    private String collegeName;

    @NotBlank
    @Size(min = 8, max = 64)
    @Schema(example = "CampusLoop@123")
    private String password;
}
