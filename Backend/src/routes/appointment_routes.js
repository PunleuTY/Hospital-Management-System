import e from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment_controller.js";

const router = e.Router();

// Router for get all appointments
router.get("/api/appointments", getAllAppointments);

// Router for get appointment by id
router.get("/api/appointments/:id", getAppointmentById);

// Router for create appointment
router.post("/api/appointments", createAppointment);

// Router for update appointment
router.put("/api/appointments/:id", updateAppointment);

// Router for delete appointment
router.delete("/api/appointments/:id", deleteAppointment);

export default router;
