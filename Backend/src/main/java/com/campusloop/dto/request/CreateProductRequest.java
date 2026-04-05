package com.campusloop.dto.request;

import com.campusloop.model.ProductCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Payload used to create a new product listing")
public class CreateProductRequest {

    @NotBlank
    @Size(max = 150)
    @Schema(example = "Second-hand Engineering Mathematics book")
    private String title;

    @NotBlank
    @Size(max = 1500)
    @Schema(example = "Well maintained book with a few pencil notes.")
    private String description;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Schema(example = "499.00")
    private BigDecimal price;

    @NotNull
    @Schema(example = "BOOKS")
    private ProductCategory category;

    @Schema(description = "Optional image URLs when files are not uploaded")
    private List<String> imageUrls;
}
