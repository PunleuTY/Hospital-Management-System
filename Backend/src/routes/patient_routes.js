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
router.get("/count", countPatient);
router.get("/id", allPatientId);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
