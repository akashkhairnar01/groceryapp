package com.localgrocery.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private GroceryOrder order;

    @Column(nullable = false)
    private Long itemId;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private int qty;

    @Column(nullable = false)
    private double unitPrice;

    @Column(nullable = false)
    private double lineTotal;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public GroceryOrder getOrder() { return order; }
    public void setOrder(GroceryOrder order) { this.order = order; }
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }
    public double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(double unitPrice) { this.unitPrice = unitPrice; }
    public double getLineTotal() { return lineTotal; }
    public void setLineTotal(double lineTotal) { this.lineTotal = lineTotal; }
}
