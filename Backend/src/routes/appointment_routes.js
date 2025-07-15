import e from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getUpcomingAppointments,
} from "../controllers/appointment_controller.js";

const router = e.Router();

// Router for get all appointments
router.get("/", getAllAppointments);

// Router for get upcoming scheduled appointments (10 limit)
router.get("/upcoming", getUpcomingAppointments);

// Router for get appointment by id
router.get("/:id", getAppointmentById);

// Router for create appointment
router.post("/", createAppointment);

// Router for update appointment
router.put("/:id", updateAppointment);

// Router for delete appointment
router.delete("/:id", deleteAppointment);

export default router;
