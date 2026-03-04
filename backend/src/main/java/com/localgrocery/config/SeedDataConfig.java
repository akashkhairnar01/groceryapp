package com.localgrocery.config;

import com.localgrocery.model.Item;
import com.localgrocery.repository.ItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SeedDataConfig {
    @Bean
    CommandLineRunner seedItems(ItemRepository itemRepository) {
        return args -> {
            if (itemRepository.count() > 0) {
                return;
            }

            itemRepository.saveAll(List.of(
                    create("Tomato", "Vegetables", 30.0, 80),
                    create("Milk", "Dairy", 55.0, 60),
                    create("Bread", "Bakery", 40.0, 45),
                    create("Rice 1kg", "Grains", 72.0, 70),
                    create("Apple", "Fruits", 120.0, 35)
            ));
        };
    }

    private Item create(String name, String category, double price, int stock) {
        Item item = new Item();
        item.setName(name);
        item.setCategory(category);
        item.setPrice(price);
        item.setStock(stock);
        return item;
    }
}
