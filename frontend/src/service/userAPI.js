import axios from "axios";

const API_URL = "http://localhost:3000/api/users";
const AUTH_URL = "http://localhost:3000/api/auth";

// get all users
export const getAllUsers = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/?page=${page}&limit=${limit}`);
  return response.data;
};

// summarize users
export const getUserSummarize = async () => {
  const response = await axios.get(`${API_URL}/summarize`);
  return response.data;
};

// get user by id
export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// create user
export const createUser = async (newData) => {
  const response = await axios.post(`${API_URL}/`, newData);
  return response.data;
};

// update user
export const updateUser = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// delete user
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// login
export const login = async (loginData) => {
  const response = await axios.post(`${AUTH_URL}/login`, loginData);
  return response.data;
};

// logout
export const logout = async () => {
  const response = await axios.post(`${AUTH_URL}/logout`);
  return response.data;
};
