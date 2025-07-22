import db from "../../db/models/index.js";
const { Billing, Staff, Patient } = db;

// List bills with pagination, including patient and receptionist details
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

// Find a bill by ID with patient and receptionist info
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

// Create a new billing record
export const createBillSv = (billData) => Billing.create(billData);

// Update existing billing record by ID
export const updateBillSv = (id, billData) =>
  Billing.update(billData, { where: { billId: id } });

// Delete billing record by ID
export const deleteBillSv = (id) => Billing.destroy({ where: { billId: id } });

// Sum of totalAmount where paymentStatus is 'Paid'
export const getTotalAmountPaid = () =>
  Billing.sum("totalAmount", { where: { paymentStatus: "Paid" } });

// Sum of totalAmount where paymentStatus is 'Unpaid'
export const getTotalAmountUnpaid = () =>
  Billing.sum("totalAmount", { where: { paymentStatus: "Unpaid" } });

// Total count of billing records
export const getTotalBillsCount = () => Billing.count();

// Count of unpaid billing records
export const getTotalUnpaidCount = () =>
  Billing.count({ where: { paymentStatus: "Unpaid" } });
