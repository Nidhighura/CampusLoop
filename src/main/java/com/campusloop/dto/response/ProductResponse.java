package com.campusloop.dto.response;

import com.campusloop.model.ProductCategory;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final BigDecimal price;
    private final ProductCategory category;
    private final boolean sold;
    private final LocalDateTime createdAt;
    private final UserSummaryResponse seller;
    private final List<ProductImageResponse> images;
}
