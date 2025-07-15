import express from "express";
import {
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordById,
  getAllMedicalRecords,
} from "../controllers/medicalRecord_controller.js";
const router = express.Router();

// Route to get all medical records
router.get("/", getAllMedicalRecords);
// Route to get a medical record by ID
router.get("/:id", getMedicalRecordById);
// Route to create a new medical record
router.post("/", createMedicalRecord);
// Route to update a medical record by ID
router.put("/:id", updateMedicalRecord);
// Route to delete a medical record by ID
router.delete("/:id", deleteMedicalRecord);

export default router;
