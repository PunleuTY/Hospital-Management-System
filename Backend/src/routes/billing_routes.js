import express from "express";
import {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
  summaryBilling,
} from "../controllers/billing_controllers.js";

const router = express.Router();

router.get("/", getAllBills);
router.get("/:id", getBillById);
router.get("/stat", summaryBilling);
router.post("/", createBill);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

export default router;
