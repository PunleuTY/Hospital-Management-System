import express from "express";
import {
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordById,
} from "../controllers/medicalRecord_controller.js";
const router = express.Router();

// Route to create a new medical record
router.post("/api/medical_records", createMedicalRecord);

// Route to get a medical record by ID
router.get("/api/medical_records/:id", getMedicalRecordById);

// Route to update a medical record by ID
router.put("/api/medical_records/:id", updateMedicalRecord);

// Route to delete a medical record by ID
router.delete("/api/medical_records/:id", deleteMedicalRecord);

export default router;
