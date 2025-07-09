import e from "express";

const router = e.Router();
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staff_controller.js";

// Router for get all staff members
router.get("/api/staff", getAllStaff);

// Router for get staff member by id
router.get("/api/staff/:id", getStaffById);

// Router for create staff member
router.post("/api/staff", createStaff);

// Router for update staff member
router.put("/api/staff/:id", updateStaff);

// Router for delete staff member
router.delete("api/staff/:id", deleteStaff);

export default router;
