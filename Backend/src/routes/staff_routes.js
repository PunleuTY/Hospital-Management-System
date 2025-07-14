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
router.get("/", getAllStaff);

// Router for get staff member by id
router.get("/:id", getStaffById);

// Router for create staff member
router.post("/", createStaff);

// Router for update staff member
router.put("/:id", updateStaff);

// Router for delete staff member
router.delete("/:id", deleteStaff);

export default router;
