package com.localgrocery.dto;

public record DashboardStatsResponse(double revenue, long orderCount, long lowStockCount) {}
