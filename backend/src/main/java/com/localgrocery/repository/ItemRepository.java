package com.localgrocery.repository;

import com.localgrocery.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    long countByStockLessThanEqual(int stock);
}
