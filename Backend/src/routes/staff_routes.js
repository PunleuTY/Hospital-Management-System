import e from "express";
import { allReceptionistId } from "../controllers/staff_controller.js";

const router = e.Router();
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  allDoctorId,
} from "../controllers/staff_controller.js";

// Router for get all staff members
router.get("/", getAllStaff);

// Router for get staff member by id
router.get("/:id", getStaffById);

router.get("/doctors/id", allDoctorId);

// Router for create staff member
router.post("/", createStaff);

// Router for update staff member
router.put("/:id", updateStaff);

// Router for delete staff member
router.delete("/:id", deleteStaff);

// Router for get all receptionist IDs
router.get("/receptionists/id", allReceptionistId);

export default router;
