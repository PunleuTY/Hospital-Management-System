import db from "../../db/models/index.js";
const { Billing } = db;

export const listBills = async () => {
  Billing.findAndCountAll({
    order: [["billing_id", "ASC"]],
  });
};

export const findBillById = async (id) => {
  Billing.findByOk(id);
};

export const createBillSv = async (billData) => {
  Billing.create(billData);
};

export const updateBillSv = async (id, billData) => {
  Billing.update(billData, { where: { billing_id: id } });
};

export const deleteBillSv = async (id) => {
  Billing.destroy({ where: { billing_id: id } });
};
