# Backend Prerequisites & Installation

This document lists all the frameworks, libraries, and tools you need to install and configure to run the backend of the Hospital Management System.

---

## 📦 System Requirements

* **Node.js**: 16.x or later (LTS)
* **npm**: 8.x or later (bundled with Node.js) or **Yarn**: 1.22.x
* **PostgreSQL**: 13.x or later (local or Docker)
* **Git**: for cloning the repository

Optional:

* **Docker & Docker Compose**: if you prefer containerized development

---

## 🔧 Global CLI Tools

Install these globally to ease development:

```bash
npm install -g sequelize-cli
npm install -g nodemon
```

* **sequelize-cli**: generate models, migrations, and seeders
* **nodemon**: automatically restart the server on file changes

---

## 📚 Core Dependencies

From the `backend/` folder, install:

```bash
npm install express                   # Web framework
npm install sequelize pg pg-hstore    # ORM + Postgres driver
npm install dotenv                    # Environment variable loader
npm install cors                      # Cross-origin resource sharing
npm install joi                       # Schema validation
npm install winston                   # Logging
npm install jsonwebtoken              # JWT auth (if used)
```

These packages provide:

* **Express**: HTTP server and routing
* **Sequelize**: ORM for model definitions and migrations
* **pg / pg-hstore**: Postgres driver and hstore support
* **dotenv**: `.env` config loader
* **cors**: enable CORS on API
* **joi**: input validation schemas
* **winston**: structured logging
* **jsonwebtoken**: token-based authentication

---

## 🛠️ Development & Testing Dependencies

Install as devDependencies:

```bash
npm install --save-dev sequelize-cli nodemon jest supertest eslint
```

* **sequelize-cli**: migration and seeder commands
* **nodemon**: auto-restart server in dev
* **jest**: unit and integration testing
* **supertest**: HTTP assertions for endpoints
* **eslint**: code linting

---

## 🚀 Installation Steps

1. **Clone the repo**:

   ```bash
   git clone https://github.com/PunleuTY/Hospital-Management-System-Project.git
   cd Hospital-Management-System-Project/backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your DB credentials and secrets
   ```

4. **Initialize the database**:

   ```bash
   npm run db:init       # runs raw SQL (database/ddl) and Sequelize migrations
   npm run db:seed       # loads raw SQL seeds and JS seeders
   ```

5. **Start the server in development**:

   ```bash
   npm run dev           # uses nodemon
   ```

6. **Run tests**:

   ```bash
   npm test
   ```

---

## 📝 npm Scripts (in `package.json`)

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "db:init": "psql $DATABASE_URL -f ../database/ddl/create_tables.sql && npx sequelize-cli db:migrate",
    "db:seed": "psql $DATABASE_URL -f ../database/dml/seed_data.sql && npx sequelize-cli db:seed:all",
    "migrate": "npx sequelize-cli db:migrate",
    "seed": "npx sequelize-cli db:seed:all",
    "test": "jest"
  }
}
```

* **dev**: launch in development with auto-reload
* **start**: launch production server
* **db\:init**, **db\:seed**: sync raw SQL and ORM seeders
* **migrate** / **seed**: run only ORM migrations/seeders
* **test**: run test suite

---

With these frameworks and tools in place, your backend will be fully equipped to develop, migrate schemas, seed data, and run tests reliably. 🎉
