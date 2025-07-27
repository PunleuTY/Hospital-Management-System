import express from "express";
import {
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordById,
  getAllMedicalRecords,
  getAllAppointmentsForDropdown,
  getAllPatientsForDropdown,
} from "../controllers/medicalRecord_controller.js";
const router = express.Router();

router.get("/patients", getAllPatientsForDropdown);
router.get("/appointments", getAllAppointmentsForDropdown);
router.get("/", getAllMedicalRecords);
router.get("/:id", getMedicalRecordById);
router.post("/", createMedicalRecord);
router.put("/:id", updateMedicalRecord);
router.delete("/:id", deleteMedicalRecord);

export default router;
