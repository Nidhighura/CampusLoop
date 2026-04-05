package com.campusloop.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "Seller contact details for a product")
public class ContactResponse {

    @Schema(example = "Aarav Sharma")
    private final String sellerName;

    @Schema(example = "aarav@college.edu")
    private final String email;

    @Schema(example = "9876543210")
    private final String phoneNumber;

    @Schema(example = "LNCT Bhopal")
    private final String collegeName;
}
