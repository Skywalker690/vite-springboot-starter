# 💪 React + Spring Boot Boilerplate

This is a full-stack starter project using:

* ⚛️ React (Vite) for the frontend
* ☕ Spring Boot for the backend

---

## 📁 Folder Structure

```
React-SpringBoot-Boilerplate/
├── backend/        # Spring Boot backend (Java 21)
│   ├── src/
│   └── pom.xml
├── frontend/       # React frontend (Vite + React 18+)
│   ├── src/
│   └── package.json
├── README.md
```

---

## 🚀 How to Run

### 1. Backend

> ⚠️ Before starting the backend, make sure to:
>
> * Set the correct backend URL and DB credentials in `application.properties`
> * Create a `.env` file if using `spring-dotenv` to load environment variables

```bash
cd backend
./mvnw spring-boot:run
```

Runs on: `http://localhost:8080`

#### ✅ Backend Dependencies Added:

* `spring-boot-starter-data-jpa` – For database operations
* `spring-boot-starter-web` – For building REST APIs
* `spring-boot-devtools` – For live reload and fast development
* `mysql-connector-j` – To connect to MySQL database
* `lombok` – For reducing boilerplate code
* `spring-boot-starter-test` – For writing tests
* `spring-dotenv` – For loading environment variables from `.env`

---

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:5173`

If you want to use a different port like `3000`, update both CORS settings and the proxy configuration.

---

## ⚙️ CORS & API Setup

CORS is enabled in `CorsConfig.java` (backend).
Make sure `allowedOrigins` matches your frontend port (e.g., `http://localhost:5173`).

For smoother local development, add a proxy to `vite.config.js`:

```js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
}
```

---

## 🔁 Environment Variables

Use a `.env` file in the frontend to manage base URLs:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Then fetch like this:

```js
fetch(`${import.meta.env.VITE_API_BASE_URL}/api/hello`)
```

---

## 🛠 Optional Improvements

* Add Docker support
* Setup authentication (e.g., JWT)
* Integrate a database (MySQL/PostgreSQL)
* Setup a CI/CD pipeline

---

## 🤝 Contributing

Feel free to fork this repo and contribute via PRs!

---

## 📄 License

MIT License. Use freely and customize to your needs.

---

## 👨‍💻 Developed By

* Created and maintained by **Skywalker690**.
* Special thanks to the open-source community for tools and inspiration.

<div align="center">
  <br/><br/>
  <p>
    <a href="https://buymeacoffee.com/skywalker690">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="Buy Me A Coffee" />
    </a>
  </p>
</div>
