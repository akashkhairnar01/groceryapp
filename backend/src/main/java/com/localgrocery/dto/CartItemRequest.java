package com.localgrocery.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemRequest(
        @NotNull Long itemId,
        @Min(1) int qty
) {}
