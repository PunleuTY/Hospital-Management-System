import express from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  allPatientId,
  countPatient,
} from "../controllers/patient_controller.js";

const router = express.Router();

router.get("/", getAllPatients);

// Router to count patient
router.get("/count", countPatient);

// Router for get patient by id
router.get("/:id", getPatientById);
router.get("/patients/id", allPatientId);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
