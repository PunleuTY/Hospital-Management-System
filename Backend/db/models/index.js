import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize, DataTypes } from "sequelize";
import configJson from "../config/config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};

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

Object.values(db)
  .filter((m) => typeof m.associate === "function")
  .forEach((m) => m.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
