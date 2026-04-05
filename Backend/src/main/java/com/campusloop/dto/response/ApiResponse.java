package com.campusloop.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "Standard API response envelope")
public class ApiResponse {

    @Schema(example = "true")
    private final boolean success;

    @Schema(example = "Signup completed successfully.")
    private final String message;

    private final Object data;

    public static ApiResponse success(String message, Object data) {
        return new ApiResponse(true, message, data);
    }

    public static ApiResponse failure(String message, Object data) {
        return new ApiResponse(false, message, data);
    }
}
