import Sequelize from "sequelize";
import "../../config.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: console.log, // Disable logging to reduce overhead
  }
);

export default sequelize;
