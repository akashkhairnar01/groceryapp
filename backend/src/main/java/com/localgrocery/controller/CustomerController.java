package com.localgrocery.controller;

import com.localgrocery.dto.CheckoutRequest;
import com.localgrocery.model.GroceryOrder;
import com.localgrocery.model.Item;
import com.localgrocery.service.GroceryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {
    private final GroceryService groceryService;

    public CustomerController(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    @GetMapping("/items")
    public List<Item> getItems() {
        return groceryService.allItems();
    }

    @PostMapping("/checkout")
    public GroceryOrder checkout(@Valid @RequestBody CheckoutRequest request) {
        return groceryService.checkout(request);
    }
}
