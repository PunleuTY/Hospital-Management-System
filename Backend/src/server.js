import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { notFound, catchErrors } from "./middlewares/error_middlewares.js";
import db from "../db/models/index.js";

// Mounting Routes
import patientRoutes from "./routes/patient_routes.js";
import billRoutes from "./routes/billing_routes.js";
import medicalRecordRoutes from "./routes/medicalRecord_routes.js";
import staffRoutes from "./routes/staff_routes.js";
import appointmentRoutes from "./routes/appointment_routes.js";
import departmentRoutes from "./routes/department_routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

dotenv.config({
  path: path.resolve(__dirname, "../backend/.env"),
});

app.use(cors(), express.json());

app.use(patientRoutes);
app.use(billRoutes);
app.use(medicalRecordRoutes);
app.use(staffRoutes);
app.use(appointmentRoutes);
app.use(departmentRoutes);

app.use(notFound);
app.use(catchErrors);

// Test DB connection
db.sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
