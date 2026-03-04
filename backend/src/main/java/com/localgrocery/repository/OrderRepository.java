package com.localgrocery.repository;

import com.localgrocery.model.GroceryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<GroceryOrder, Long> {
    @Query("select coalesce(sum(o.total), 0) from GroceryOrder o")
    double totalRevenue();
}
