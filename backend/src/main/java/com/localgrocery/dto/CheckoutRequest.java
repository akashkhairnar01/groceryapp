package com.localgrocery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.util.List;

public record CheckoutRequest(
        @NotEmpty List<CartItemRequest> items,
        @NotBlank @Pattern(regexp = "COD|ONLINE", message = "Payment method must be COD or ONLINE") String paymentMethod
) {}
