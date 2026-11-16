# ⚛️ Vite + ☕ Spring Boot Starter

[![CI](https://github.com/Skywalker690/vite-springboot-starter/actions/workflows/workflow.yml/badge.svg)](https://github.com/Skywalker690/vite-springboot-starter/actions/workflows/workflow.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A full-stack starter that **runs with zero setup**: React 19 + Vite on the front, Spring Boot 3 + Java 21 on the back, wired together with a working example feature, tests, Docker and CI.

- **Zero-config database** – in-memory H2 by default; switch to MySQL by setting one variable
- **Example CRUD feature** – `todos` shows the full path: React → API client → controller → service → JPA
- **Consistent errors** – RFC 9457 `problem+json` responses with per-field validation messages
- **No CORS headaches** – Vite proxies `/api` in dev, nginx proxies it in Docker
- **Health checks** – `/actuator/health` for Docker and load balancers
- **Docker Compose** – MySQL + backend + frontend with one command
- **CI** – GitHub Actions builds and tests both apps and the Docker images; Dependabot keeps deps fresh

---

## 📁 Project structure

```
vite-springboot-starter/
├── backend/                         Spring Boot 3.5 · Java 21 · Maven
│   ├── src/main/java/com/demo/backend/
│   │   ├── config/CorsConfig.java   CORS from CORS_ALLOWED_ORIGINS
│   │   ├── common/                  Global exception handler, NotFoundException
│   │   ├── hello/                   GET /api/hello
│   │   └── todo/                    Example CRUD feature (entity, repo, service, controller, DTOs)
│   ├── src/main/resources/application.properties
│   ├── .env.example
│   └── Dockerfile
├── frontend/                        React 19 · Vite 7 · ESLint
│   ├── src/api/                     fetch wrapper + endpoint helpers
│   ├── src/App.jsx                  Demo UI using the API
│   ├── .env.example
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
└── .github/                         CI workflow + Dependabot
```

---

## ✅ Prerequisites

- **Java 21** (Maven is not required; use the bundled `mvnw` wrapper)
- **Node.js 20.19+ or 22.12+**
- Docker (optional)

---

## 🚀 Quick start (local dev)

Run each in its own terminal:

**Backend** → http://localhost:8080

```bash
cd backend
./mvnw spring-boot:run
```

On Windows use `mvnw.cmd spring-boot:run`.

**Frontend** → http://localhost:5173

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. You should see "Hello from Spring Boot!" and a working todo list.

---

## 🐳 Run everything with Docker

```bash
docker compose up --build
```

| Service  | URL                                 |
| -------- | ----------------------------------- |
| App      | http://localhost:3000               |
| API      | http://localhost:8080/api/hello     |
| Health   | http://localhost:8080/actuator/health |
| MySQL    | internal only (`db:3306`, data in the `db-data` volume) |

---

## 🔌 API

| Method | Path              | Description                                 |
| ------ | ----------------- | ------------------------------------------- |
| GET    | `/api/hello`      | `{ "message": "...", "timestamp": "..." }`  |
| GET    | `/api/todos`      | List todos                                  |
| GET    | `/api/todos/{id}` | Get one todo (404 if missing)               |
| POST   | `/api/todos`      | Create: `{ "title": "Buy milk" }`           |
| PATCH  | `/api/todos/{id}` | Partial update: `{ "completed": true }`     |
| DELETE | `/api/todos/{id}` | Delete                                      |
| GET    | `/actuator/health`| Health check                                |

Errors look like this:

```json
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "Validation failed",
  "instance": "/api/todos",
  "errors": { "title": "must not be blank" }
}
```

The frontend's `ApiError` exposes `status`, `message` (from `detail`) and `errors`.

---

## ⚙️ Configuration

### Backend (`backend/.env` or real environment variables)

Copy `backend/.env.example` to `backend/.env`. Spring Boot loads it automatically; real environment variables take precedence.

| Variable               | Default                          | Purpose                               |
| ---------------------- | -------------------------------- | ------------------------------------- |
| `PORT`                 | `8080`                           | HTTP port                             |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173`          | Comma-separated allowed origins       |
| `DB_URL`               | `jdbc:h2:mem:app` (in-memory)    | JDBC URL; driver is auto-detected     |
| `DB_USERNAME`          | `sa`                             | DB user                               |
| `DB_PASSWORD`          | *(empty)*                        | DB password                           |
| `JPA_DDL_AUTO`         | `update`                         | Hibernate schema mode                 |
| `JPA_SHOW_SQL`         | `false`                          | Log SQL                               |

**Use MySQL locally:**

```env
DB_URL=jdbc:mysql://localhost:3306/app?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=secret
```

With the default H2 database, data resets on restart and the H2 console is available at http://localhost:8080/h2-console while DevTools is active (JDBC URL `jdbc:h2:mem:app`, user `sa`).

### Frontend (`frontend/.env.local`)

| Variable            | Default                 | Purpose                                                          |
| ------------------- | ----------------------- | ---------------------------------------------------------------- |
| `VITE_PROXY_TARGET` | `http://localhost:8080` | Where the dev server proxies `/api`                              |
| `VITE_API_BASE_URL` | *(empty)*               | Absolute API URL baked into the build; only for cross-origin APIs |

Keep `VITE_API_BASE_URL` empty and call relative URLs (`/api/...`): the Vite proxy (dev) and nginx (Docker) forward them to the backend, so the browser never makes a cross-origin request. If you do host the API on another origin, add the frontend's origin to `CORS_ALLOWED_ORIGINS`.

---

## 🧱 Adding a feature

1. **Backend**: copy `backend/src/main/java/com/demo/backend/todo/` to a new package, rename the entity, repository, DTOs, service and controller, and add a test like `TodoControllerTest`.
2. **Frontend**: add endpoint helpers next to `src/api/todos.js` using the shared `api` client, then use them in your components.

Throw `NotFoundException` from services for 404s; add `@Valid` + Bean Validation annotations on request records for 400s with field errors.

---

## 🧪 Scripts

| Where      | Command                     | What it does                    |
| ---------- | --------------------------- | ------------------------------- |
| `backend`  | `./mvnw spring-boot:run`    | Run with live restart           |
| `backend`  | `./mvnw verify`             | Compile and run all tests       |
| `backend`  | `./mvnw package`            | Build `target/backend-*.jar`    |
| `frontend` | `npm run dev`               | Dev server with HMR             |
| `frontend` | `npm run lint` / `lint:fix` | ESLint                          |
| `frontend` | `npm run build`             | Production build to `dist/`     |
| `frontend` | `npm run preview`           | Serve the production build      |

---

## 🛠 Ideas for next steps

- Authentication (Spring Security + JWT or sessions)
- Schema migrations with Flyway (set `JPA_DDL_AUTO=validate` once you do)
- OpenAPI docs via `springdoc-openapi`
- Client-side routing (React Router) and data fetching (TanStack Query)
- TypeScript on the frontend

---

## 🤝 Contributing

Fork the repo and open a PR. CI must pass (`./mvnw verify` in `backend`, `npm run lint && npm run build` in `frontend`).

## 📄 License

[MIT](LICENSE). Use freely and customize to your needs.

## 👨‍💻 Developed by

Created and maintained by **Skywalker690**. Thanks to the open-source community for the tools and inspiration.

<div align="center">
  <br/>
  <a href="https://buymeacoffee.com/skywalker690">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="Buy Me A Coffee" />
  </a>
</div>
