import axios from "axios";

// Configure base URL
const API_BASE_URL = "http://localhost:3000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const createUser = async (data) => {
  try {
    const response = await api.post("/api/users", data);
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err.response?.data?.message || err.message || "Failed to create user";
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (err) {
    console.error("Get Users API Error:", err);
    throw err.response?.data?.message || err.message || "Failed to fetch users";
  }
};

export const login = async (data) => {
  try {
    console.log("Sending login request:", data);
    const response = await api.post("/api/auth/login", data); // Back to /api/auth/login
    console.log("Full API response:", response);
    console.log("Response data:", response.data);

    // Check if the response indicates failure
    if (response.data && response.data.success === false) {
      throw new Error(response.data.message || "Login failed");
    }

    return response.data;
  } catch (err) {
    console.error("Login API Error:", err);
    console.error("Error response:", err.response);
    console.error("Error data:", err.response?.data);

    // Handle different error formats
    if (err.response?.data?.success === false) {
      throw new Error(err.response.data.message || "Login failed");
    }

    throw err.response?.data?.message || err.message || "Failed to login";
  }
};

export const logoutAPI = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (err) {
    console.error("Logout API Error:", err);
    // Don't throw error for logout - continue with frontend logout
    return null;
  }
};
