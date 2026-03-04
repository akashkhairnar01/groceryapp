package com.localgrocery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record CheckoutRequest(
        @NotEmpty List<CartItemRequest> items,
        @NotBlank String paymentMethod
) {}
