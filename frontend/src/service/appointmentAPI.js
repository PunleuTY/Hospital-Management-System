import axios from "axios";

const API_URL = "http://localhost:3000/api/appointments";

// get all appointments (Appointment.jsx)
export const getAllAppointments = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/?page=${page}&limit=${limit}`);
  return response.data;
};

// get appointment by id
export const getAppointmentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// create appointment
export const createAppointment = async (newData) => {
  const response = await axios.post(`${API_URL}/`, newData);
  return response.data;
};

// update appointment
export const updateAppointment = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// delete appointment
export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// get upcoming scheduled appointments (Dashboard.jsx)
export const getUpcomingAppointments = async () => {
  const response = await axios.get(`${API_URL}/upcoming`);
  return response.data;
};

// count appointment
export const countAppointment = async () => {
  const resposne = await axios.get(`${API_URL}/count`);
  return resposne.data;
};
