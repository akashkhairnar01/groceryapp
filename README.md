# Local Grocery Application (Angular + Java)

A modern full-stack grocery application with login, responsive UI, animations, validation, and role-based workflows.

- `frontend/` → Angular UI (Customer + Admin)
- `backend/` → Spring Boot REST API + H2 persistence

## Highlights

- **Login screen first** with role-based access simulation:
  - Customer: `customer / customer123`
  - Admin: `admin / admin123`
- **Responsive modern UI** with glassmorphism styling and mobile-friendly layout.
- **Animations** for page transitions and dynamic list rendering.
- **Improved input UX + validations**:
  - Frontend form validations for login, inventory input, and quantity checks.
  - Backend bean validations for item fields and checkout payment mode.

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

## Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`

## Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend URL: `http://localhost:4200`

## Notes

- Backend DB: H2 file database at `backend/data/grocerydb`.
- CORS enabled for Angular dev server (`http://localhost:4200`).
