# React + Spring Boot Boilerplate

This is a full-stack starter project using:
- ⚛️ React (Vite) for the frontend
- ☕ Spring Boot for the backend

---

## 📁 Folder Structure

```
/backend     → Spring Boot app
/frontend    → React app (Vite)
```

## 🚀 How to Run

### 1. Backend
```bash
cd backend
./mvnw spring-boot:run
```

Runs on: `http://localhost:8080`

---

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:3000`

---

## ⚙️ CORS & API Setup

CORS is enabled in `CorsConfig.java` (backend).
Make sure to match allowed origins with frontend port.

If you need to proxy requests during dev, add this to `vite.config.js`:
```js
server: {
  proxy: {
    '/api': 'http://localhost:8080'
  }
}
```

---
