import db from "../../db/models/index.js";
const { Billing, Staff, Patient } = db;

export const listBills = ({ limit, offset }) =>
  Billing.findAndCountAll({
    limit,
    offset,
    order: [["billing_id", "ASC"]],
    attributes: [
      "billId",
      "treatmentFee",
      "medicationFee",
      "labTestFee",
      "consultationFee",
      "totalAmount",
      "paymentStatus",
      "patientId",
      "receptionistId",
    ],
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "receptionist",
        attributes: ["staffId", "firstName", "lastName"],
      },
    ],
  });

export const findBillById = (id) =>
  Billing.findByPk(id, {
    attributes: [
      "billId",
      "treatmentFee",
      "medicationFee",
      "labTestFee",
      "consultationFee",
      "totalAmount",
      "paymentStatus",
      "patientId",
      "receptionistId",
    ],
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "receptionist",
        attributes: ["staffId", "firstName", "lastName"],
      },
    ],
  });

export const createBillSv = (billData) => Billing.create(billData);

export const updateBillSv = (id, billData) =>
  Billing.update(billData, { where: { billId: id } });

export const deleteBillSv = (id) => Billing.destroy({ where: { billId: id } });

export const getTotalAmountPaid = () => {
  return Billing.sum("totalAmount", {
    where: { paymentStatus: "Paid" },
  });
};

export const getTotalAmountUnpaid = () => {
  return Billing.sum("totalAmount", {
    where: { paymentStatus: "Unpaid" },
  });
};

export const getTotalBillsCount = () => {
  return Billing.count();
};

export const getTotalUnpaidCount = () => {
  return Billing.count({
    where: { paymentStatus: "Unpaid" },
  });
};
