import express from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getUpcomingAppointments,
  countAppointment,
} from "../controllers/appointment_controller.js";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/upcoming", getUpcomingAppointments);
router.get("/count", countAppointment);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
