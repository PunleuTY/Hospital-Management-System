# Backend `db/` Directory

This README describes every file and folder within the `backend/db/` directory of your Hospital Management System, detailing Sequelize model definitions, schema migrations, and data seeders.

---

## 📁 Directory Structure

```text
backend/
└── db/
    ├── models/       # Sequelize model definitions mirroring your tables
    ├── migrations/   # Versioned schema change scripts (up/down)
    └── seeders/      # Initial and sample data insertion scripts (up/down)
```

> **Note:** A top-level `.sequelizerc` (in `backend/`) points Sequelize CLI at these folders.

---

## 📂 `models/`

Each file in `models/` defines a table structure and its relationships:

* **`index.js`**

  * Initializes Sequelize with your `db.config.js` settings.
  * Dynamically imports every model file and sets up associations.

* **`<entity>.js`** (e.g., `patient.js`, `doctor.js`, `appointment.js`)

  * Exports a function that defines the schema:

    ```js
    module.exports = (sequelize, DataTypes) => {
      const Patient = sequelize.define('Patient', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        // …other columns…
      }, {
        tableName: 'patients',
        timestamps: true
      });

      Patient.associate = (models) => {
        Patient.hasMany(models.Appointment, { foreignKey: 'patientId' });
      };

      return Patient;
    };
    ```

### How to generate a new model

```bash
npx sequelize-cli model:generate \
  --name <ModelName> \
  --attributes name:string,age:integer
```

* Creates `models/<modelname>.js` and a matching migration stub in `migrations/`.

---

## 📜 `migrations/`

Migrations version and apply schema changes in order:

* **Filename convention:** `YYYYMMDDHHmmss-create-patients.js`
* **Structure:** Each file exports `up` and `down`:

  ```js
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('patients', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        name: Sequelize.STRING,
        // …other columns…
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('patients');
    }
  };
  ```

### Common commands

* **Run all pending migrations**

  ```bash
  npx sequelize-cli db:migrate
  ```

* **Undo last migration**

  ```bash
  npx sequelize-cli db:migrate:undo
  ```

* **Undo all migrations**

  ```bash
  npx sequelize-cli db:migrate:undo:all
  ```

### Creating a new migration

```bash
npx sequelize-cli migration:generate --name <descriptive-name>
```

* Returns a timestamped file ready for your `up`/`down` logic.

---

## 🌱 `seeders/`

Seeders insert or remove sample data to help with development and testing:

* **Filename convention:** `YYYYMMDDHHmmss-demo-data.js`
* **Structure:** Each file exports `up` and `down`:

  ```js
  module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('doctors', [
        { id: '...', name: 'Dr. Adams', specialty: 'Cardiology', createdAt: new Date(), updatedAt: new Date() }
      ]);
    },
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('doctors', { name: 'Dr. Adams' });
    }
  };
  ```

### Common commands

* **Run all seeders**

  ```bash
  npx sequelize-cli db:seed:all
  ```

* **Undo last seeder**

  ```bash
  npx sequelize-cli db:seed:undo
  ```

* **Undo all seeders**

  ```bash
  npx sequelize-cli db:seed:undo:all
  ```

### Creating a new seeder

```bash
npx sequelize-cli seed:generate --name <descriptive-name>
```

* Creates a stub in `seeders/` for your data scripts.

---

## 🛡️ Best Practices & Tips

1. **Keep DDL in sync**: Whenever you manually alter `database/ddl`, generate a matching migration.
2. **Atomic changes**: One table or feature per migration.
3. **Clean rollbacks**: Ensure each `down` undoes its `up` completely.
4. **Idempotent seeders**: `down` should remove exactly what `up` added, nothing more.
5. **Version control everything**: Commit migrations and seeders together with related model changes.

---

## 📚 Resources

* [Sequelize Migrations](https://sequelize.org/master/manual/migrations.html)
* [Sequelize Seeders](https://sequelize.org/master/manual/migrations.html#data-seeding)
