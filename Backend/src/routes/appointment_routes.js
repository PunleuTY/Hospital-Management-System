import e from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getUpcomingAppointments,
  countAppointment,
} from "../controllers/appointment_controller.js";

const router = e.Router();

router.get("/", getAllAppointments);
router.get("/upcoming", getUpcomingAppointments);

// Router for counting appointment
router.get("/count", countAppointment);

// Router for get appointment by id
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
