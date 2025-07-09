import {
  findBillById,
  listBills,
  createBillSv,
  deleteBillSv,
} from "../services/billing_service.js";
import { success, fail } from "../utils/response.js";

export const getAllbills = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;
  try {
    const { rows, count } = await listBills({ limit, offset });
    const totalPages = Math.ceil(count / limit);
    return success(res, {
      data: rows,
      meta: { tatal: count, page, limit, totalPages },
    });
  } catch (err) {
    return fail(res, err);
  }
};
export const getBillById = async (req, res) => {
  try {
    const billing = await findBillById(req.params.id);
    if (!billing) {
      return res
        .status(404)
        .json({ status: " error", message: "Bill not found" });
    }
  } catch (err) {
    return fail(res, err);
  }
};
export const createBill = async (req, res) => {
  try {
    const billing = await createBillSv(req.body);
    return success(res, billing, 201);
  } catch (err) {
    return fail(res, err);
  }
};
export const updateBill = async (req, res) => {
  try {
    const billing = await findBillById(req.params.id);
    if (!billing) {
      return res
        .status(404)
        .json({ status: "error", message: "Bill not found" });
    }
    await billing.update(req.body);
    return success(res, billing);
  } catch (err) {
    return fail(res, err);
  }
};
export const deleteBill = async (req, res) => {
  try {
    const rows = await deleteBillSv(req.params.id);
    if (rows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Bill not found" });
    }
    return success(res, { message: "Bill deleted successfully" });
  } catch (err) {
    return fail(res, err);
  }
};
