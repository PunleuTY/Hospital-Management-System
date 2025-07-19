import axios from "axios";

const API_URL = "http://localhost:3000/api/bills";

// get all billings (Billing.jsx)
export const getAllBillings = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/?page=${page}&limit=${limit}`);
  return response.data;
};

// Get bill by ID
export const getBillById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create new bill
export const createBill = async (newBill) => {
  const response = await axios.post(`${API_URL}/`, newBill);
  return response.data;
};

// Update existing bill
export const updateBill = async (id, updatedBill) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedBill);
  return response.data;
};

// Delete bill
export const deleteBill = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Get total amount paid
export const summarizeBilling = async () => {
  const response = await axios.get(`${API_URL}/stat`);
  return response.data;
};
