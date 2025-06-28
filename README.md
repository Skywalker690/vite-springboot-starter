# 🧪 React + Spring Boot Boilerplate

A modern full-stack boilerplate that integrates **React (Vite)** for the frontend and **Spring Boot** for the backend. Perfect for building fast, scalable web apps with a clear separation of concerns.

---

## 📁 Project Structure

```
React-SpringBoot-Boilerplate/
├── backend/        # Spring Boot backend (Java 17+)
│   ├── src/
│   └── pom.xml
├── frontend/       # React frontend (Vite + React 18+)
│   ├── src/
│   └── package.json
├── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

* **Java 17+**
* **Node.js v18+**
* **Maven**
* (Optional) IDE: IntelliJ (for backend), VS Code (for frontend)

---

## 🔙 Backend Setup (Spring Boot)

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Run the Spring Boot app:

   ```bash
   ./mvnw spring-boot:run
   ```

3. Backend runs at:
   👉 `http://localhost:8080`

---

## 🌐 Frontend Setup (React + Vite)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Frontend runs at:
   👉 `http://localhost:5173`

---

## 🔁 Connecting Frontend to Backend

Update your API base URL using `.env` in the `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

In your frontend code, fetch data like this:

```js
const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/hello`);
```

---

## 📦 Building for Production

1. Build frontend:

   ```bash
   npm run build
   ```

2. Copy the `dist/` output into `backend/src/main/resources/static/`

3. Package the Spring Boot app:

   ```bash
   ./mvnw package
   ```

4. Run the bundled JAR:

   ```bash
   java -jar target/*.jar
   ```

   Now both frontend and backend are served from `http://localhost:8080`

---

## 🛠️ Optional Improvements

* Add Dockerfile and docker-compose for containerized development
* Add authentication (JWT/session-based)
* Use `.env` and `application.properties` effectively
* Integrate a database (MySQL/PostgreSQL)

---

## 🤝 Contributing

Feel free to fork this repo and contribute with PRs! Suggestions and improvements welcome.

---

## 📄 License

MIT License. Use freely and customize to your needs.
