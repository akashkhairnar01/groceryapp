package com.localgrocery.controller;

import com.localgrocery.dto.DashboardStatsResponse;
import com.localgrocery.model.GroceryOrder;
import com.localgrocery.model.Item;
import com.localgrocery.service.GroceryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    private final GroceryService groceryService;

    public AdminController(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    @GetMapping("/items")
    public List<Item> items() {
        return groceryService.allItems();
    }

    @PostMapping("/items")
    public Item create(@Valid @RequestBody Item item) {
        return groceryService.createItem(item);
    }

    @PutMapping("/items/{id}")
    public Item update(@PathVariable Long id, @Valid @RequestBody Item item) {
        return groceryService.updateItem(id, item);
    }

    @DeleteMapping("/items/{id}")
    public void delete(@PathVariable Long id) {
        groceryService.deleteItem(id);
    }

    @GetMapping("/orders")
    public List<GroceryOrder> orders() {
        return groceryService.allOrders();
    }

    @GetMapping("/dashboard")
    public DashboardStatsResponse dashboard() {
        return groceryService.dashboard();
    }
}
