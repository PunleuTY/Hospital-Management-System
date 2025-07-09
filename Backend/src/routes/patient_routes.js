import express from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient_controller.js";
const router = express.Router();

// Router for get patients
router.get("/api/patients", getAllPatients);

// Router for get patient by id
router.get("/api/patients/:id", getPatientById);

// Router for create patient
router.post("/api/patients", createPatient);

// Router for update patient
router.put("/api/patients/:id", updatePatient);

// Router for delete patient
router.delete("/api/patients/:id", deletePatient);

export default router;
