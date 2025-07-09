import express from "express";
import {
  createBill,
  getAllbills,
  getBillById,
  updateBill,
  deleteBill,
} from "../controllers/billing_controllers.js";

const router = express.Router();

// Router for get all billings
router.get("/api/bills", getAllbills);
// Router for get bill by id
router.get("/api/bills/:id", getBillById);
// Router for create bill
router.post("/api/bills", createBill);
// Router for update bill
router.put("/api/bills/:id", updateBill);
// Router for delete bill
router.delete("/api/bills/:id", deleteBill);

export default router;
