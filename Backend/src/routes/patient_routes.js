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

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.get("/patients/id", allPatientId);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
