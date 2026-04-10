package com.campusloop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductImageResponse {

    private final Long id;
    private final String imageUrl;
}
