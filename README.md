# Local Grocery Application (Angular + Java)

This repository now uses a **proper full-stack project structure**:

- `frontend/` → Angular app for Customer and Admin UI
- `backend/` → Java Spring Boot REST API and local database persistence

## Project Structure

```text
.
├── backend
│   ├── pom.xml
│   └── src/main
│       ├── java/com/localgrocery
│       │   ├── config
│       │   ├── controller
│       │   ├── dto
│       │   ├── model
│       │   ├── repository
│       │   └── service
│       └── resources/application.properties
└── frontend
    ├── package.json
    ├── angular.json
    ├── tsconfig*.json
    └── src/app
        ├── components
        │   ├── customer-store
        │   └── admin-dashboard
        ├── models
        └── services
```

## Features

### Customer
- View grocery items and stock.
- Add items to cart.
- Checkout with **COD** or **ONLINE** payment.

### Admin
- Add, edit, and delete item details.
- Monitor all orders.
- Dashboard metrics (revenue, total orders, low stock count).

## Run Backend (Java / Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Runs on `http://localhost:8080`.

## Run Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:4200`.

## Notes
- Backend uses H2 file DB at `backend/data/grocerydb`.
- CORS is enabled for Angular dev server (`http://localhost:4200`).
