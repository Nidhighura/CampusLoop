package com.campusloop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserSummaryResponse {

    private final Long id;
    private final String name;
    private final String email;
    private final String collegeName;
    private final boolean verified;
}
