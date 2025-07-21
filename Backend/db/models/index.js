import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize, DataTypes } from "sequelize";
import configJson from "../config/config.json" assert { type: "json" };

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];

// Init Sequelize
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// Import models FIRST
import Appointment from "./appointment.js";
import Medical_record from "./medical_record.js";
import Patient from "./patient.js";
import Staff from "./staff.js";
import Billing from "./billing.js";
import Department from "./department.js";
import User from "./user.js";
import Role from "./role.js";

// Define db and models
const db = {
  Appointment,
  Medical_record,
  Patient,
  Staff,
  Billing,
  Department,
  Role,
  User,
};

// Dynamically define other models
const files = fs
  .readdirSync(__dirname)
  .filter(
    (f) => f !== basename && f.endsWith(".js") && !f.endsWith(".test.js")
  );

for (const file of files) {
  const importedModule = await import(path.join(__dirname, file));
  const defineModel = importedModule.default || importedModule;

  if (typeof defineModel !== "function") {
    throw new Error(`The file ${file} does not export a valid function.`);
  }

  const model = defineModel(sequelize, DataTypes);
  db[model.name] = model;
}

// Associate if needed
Object.values(db)
  .filter((m) => typeof m.associate === "function")
  .forEach((m) => m.associate(db));

// Export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
