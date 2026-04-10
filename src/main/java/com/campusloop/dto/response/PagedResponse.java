package com.campusloop.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PagedResponse<T> {

    private final List<T> items;
    private final int page;
    private final int size;
    private final long totalElements;
    private final int totalPages;
}
