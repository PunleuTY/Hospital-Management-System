import express from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  allPatientId,
} from "../controllers/patient_controller.js";

const router = express.Router();

// Router for get patients
router.get("/", getAllPatients);

// Router for get patient by id
router.get("/:id", getPatientById);

router.get("/patients/id", allPatientId);

// Router for create patient
router.post("/", createPatient);

// Router for update patient
router.put("/:id", updatePatient);

// Router for delete patient
router.delete("/:id", deletePatient);

export default router;
