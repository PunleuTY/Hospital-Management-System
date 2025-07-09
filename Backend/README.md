# Backend

# Configuration Files

This README explains the purpose, structure, and usage of the key configuration files in your backend project:

```text
backend/
├── .env             # Environment-specific variables (not checked into Git)
├── .env.example     # Template for required environment variables
└── .sequelizerc     # Configuration for Sequelize CLI paths
```

---

## 📜 `.env`

**Location:** `backend/.env`

**Purpose:**

* Store **sensitive** or **environment-specific** settings (database credentials, ports, secrets).
* Decouple configuration from code, allowing different values for development, testing, and production.

**Typical Contents:**

```dotenv
# Database connection
DB_USER=postgres
DB_PASS=supersecret
DB_NAME=hms_dev
DB_HOST=127.0.0.1
DB_PORT=5432

# Application settings\ nPORT=3000
JWT_SECRET=changeMeInProduction
NODE_ENV=development
```

**Usage:**

1. **Install `dotenv`** (if not already):

   ```bash
   npm install dotenv
   ```
2. **Load variables** at the top of `server.js` (or `app.js`):

   ```js
   require('dotenv').config();
   ```
3. **Access** variables anywhere in your code:

   ```js
   const port = process.env.PORT;
   const dbUser = process.env.DB_USER;
   ```

> **Security Tip:**
>
> * **Never** commit your `.env` containing real credentials to version control. Commit only `.env.example`.

---

## 📄 `.env.example`

**Location:** `backend/.env.example`

**Purpose:**

* Provide a **template** listing all required environment variables without exposing real secrets.
* New developers can copy this file to `.env` and fill in their own values.

**Typical Contents:**

```dotenv
DB_USER=
DB_PASS=
DB_NAME=
DB_HOST=
DB_PORT=

PORT=
JWT_SECRET=
NODE_ENV=
```

> **Usage:**
>
> ```bash
> cp .env.example .env
> # Then edit .env to add real values
> ```

---

## 🔧 `.sequelizerc`

**Location:** `backend/.sequelizerc`

**Purpose:**

* Configure **Sequelize CLI** to locate your project’s custom directories for models, migrations, seeders, and configuration.
* Avoids relying on default folder names, matching your established structure.

**Typical Contents:**

```js
const path = require('path');

module.exports = {
  'config':        path.resolve(__dirname, 'config', 'db.config.js'),
  'models-path':   path.resolve(__dirname, 'db', 'models'),
  'seeders-path':  path.resolve(__dirname, 'db', 'seeders'),
  'migrations-path': path.resolve(__dirname, 'db', 'migrations'),
};
```

**Key Mappings:**

* **`config`**: Points to your **Sequelize connection settings** file (e.g., `config/db.config.js`).
* **`models-path`**: Location of your **ORM model definitions**.
* **`migrations-path`**: Where **versioned schema changes** live.
* **`seeders-path`**: Where **data-seeding scripts** are stored.

**Usage:**

* Run CLI commands knowing they’ll use these paths automatically:

  ```bash
  npx sequelize-cli db:migrate      # Uses migrations-path
  npx sequelize-cli db:seed:all     # Uses seeders-path
  ```

---

## 🛡️ Best Practices

* **Keep `.env.example` up-to-date** whenever your code requires new environment variables.
* **Do not commit** real `.env` to Git.
* **Document** any new variables in `.env.example` and in your project’s main README.
* **Verify** your `.sequelizerc` paths if you ever refactor directory names.

---

With these configuration files correctly set up, your backend will be flexible across environments and your Sequelize CLI commands will run seamlessly against your project structure.
