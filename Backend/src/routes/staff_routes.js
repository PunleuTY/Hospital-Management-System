import e from "express";

const router = e.Router();
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  allDoctorId,
} from "../controllers/staff_controller.js";

router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.get("/doctors/id", allDoctorId);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
