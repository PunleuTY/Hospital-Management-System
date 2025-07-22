import express from "express";
import cors from "cors";
import { notFound, catchErrors } from "./middlewares/error_middlewares.js";
import sequelize from "../db/config/db_config.js";
import "../config.js";

import logger from "./middlewares/logger_middleware.js";

import "../db/models/department.js";
import "../db/models/staff.js";
import "../db/models/patient.js";
import "../db/models/billing.js";
import "../db/models/medical_record.js";
import "../db/models/appointment.js";
import "../db/models/user.js";
import "../db/models/role.js";

// Mounting Routes
import patientRoutes from "./routes/patient_routes.js";
import billRoutes from "./routes/billing_routes.js";
import medicalRecordRoutes from "./routes/medicalRecord_routes.js";
import staffRoutes from "./routes/staff_routes.js";
import appointmentRoutes from "./routes/appointment_routes.js";
import departmentRoutes from "./routes/department_routes.js";
import userRoutes from "./routes/user_routes.js";
import authRoutes from "./routes/auth_routes.js";

const app = express();
app.use(cors(), express.json());
app.use(logger);

// Mount routes BEFORE starting the server
app.use("/api/patients", patientRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/medical_records", medicalRecordRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(catchErrors);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

const PORT = 3000;

// Start server and connect to database
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
