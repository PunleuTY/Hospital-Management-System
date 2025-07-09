import express from "express";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department_controller.js";

const router = express.Router();

router.get("/api/departments", getAllDepartments);
router.get("/api/departments/:id", getDepartmentById);
router.post("/api/departments", createDepartment);
router.put("/api/departments/:id", updateDepartment);
router.delete("/api/departments/:id", deleteDepartment);

export default router;
