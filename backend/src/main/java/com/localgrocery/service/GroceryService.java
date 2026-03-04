package com.localgrocery.service;

import com.localgrocery.dto.CartItemRequest;
import com.localgrocery.dto.CheckoutRequest;
import com.localgrocery.dto.DashboardStatsResponse;
import com.localgrocery.model.GroceryOrder;
import com.localgrocery.model.Item;
import com.localgrocery.model.OrderItem;
import com.localgrocery.repository.ItemRepository;
import com.localgrocery.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GroceryService {
    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;

    public GroceryService(ItemRepository itemRepository, OrderRepository orderRepository) {
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
    }

    public List<Item> allItems() {
        return itemRepository.findAll();
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item updateItem(Long id, Item input) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        item.setName(input.getName());
        item.setCategory(input.getCategory());
        item.setPrice(input.getPrice());
        item.setStock(input.getStock());
        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    @Transactional
    public GroceryOrder checkout(CheckoutRequest request) {
        GroceryOrder order = new GroceryOrder();
        order.setCreatedAt(LocalDateTime.now());
        order.setPaymentMethod(request.paymentMethod().toUpperCase());
        order.setStatus("PLACED");

        double total = 0;
        for (CartItemRequest cartItem : request.items()) {
            Item item = itemRepository.findById(cartItem.itemId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
            if (item.getStock() < cartItem.qty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Insufficient stock for " + item.getName());
            }
            item.setStock(item.getStock() - cartItem.qty());
            itemRepository.save(item);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setItemId(item.getId());
            orderItem.setItemName(item.getName());
            orderItem.setQty(cartItem.qty());
            orderItem.setUnitPrice(item.getPrice());
            orderItem.setLineTotal(item.getPrice() * cartItem.qty());
            total += orderItem.getLineTotal();

            order.getItems().add(orderItem);
        }

        order.setTotal(total);
        return orderRepository.save(order);
    }

    public List<GroceryOrder> allOrders() {
        return orderRepository.findAll();
    }

    public DashboardStatsResponse dashboard() {
        return new DashboardStatsResponse(
                orderRepository.totalRevenue(),
                orderRepository.count(),
                itemRepository.countByStockLessThanEqual(10)
        );
    }
}
