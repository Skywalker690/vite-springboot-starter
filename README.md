# 🧪 React + Spring Boot Boilerplate

This is a full-stack starter project using:

* ⚛️ React (Vite) for the frontend
* ☕ Spring Boot for the backend

---

## 📁 Folder Structure

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

If you want to use Vite default port (5173), update CORS and proxy accordingly.

---

## ⚙️ CORS & API Setup

CORS is enabled in `CorsConfig.java` (backend).
Make sure allowed origins match your frontend port (`http://localhost:3000` or `5173`).

For smoother local development, add a proxy to `vite.config.js`:

```js
server: {
  proxy: {
    '/api': 'http://localhost:8080'
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
* Setup authentication (JWT)
* Integrate a database (MySQL/PostgreSQL)
* Setup CI/CD pipeline

---

## 🤝 Contributing

Feel free to fork this repo and contribute with PRs!

---

## 📄 License

MIT License. Use freely and customize to your needs.

--
## 👨‍💻 Developed By

* Created and maintained by Skywalker690.
* Special thanks to the open source community for tools and inspiration.

  <div align="center">
  <br/><br/>
  <p>
    <a href="https://buymeacoffee.com/skywalker690">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="Buy Me A Coffee" />
    </a>
  </p>
</div>
