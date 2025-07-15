// authentication utility functions

// get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// write token to local storage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// remove token
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// get user from local storage
export const getUser = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// write user to local storag
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  return !!(token && user);
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role?.roleName || null;
};

export const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  return userRole === requiredRole;
};

export const logout = async (navigate = null, callAPI = false) => {
  try {
    // Optionally call backend logout API
    if (callAPI) {
      const { logoutAPI } = await import("../service/userAPI");
      await logoutAPI();
    }
  } catch (error) {
    console.error("Backend logout error:", error);
    // Continue with frontend logout even if backend fails
  }

  // Clear all authentication data
  removeToken();

  // Clear any other stored data if needed
  sessionStorage.clear(); // Clear session storage as well

  console.log("User logged out successfully");

  // Use navigate function if provided, otherwise use window.location
  if (navigate && typeof navigate === "function") {
    navigate("/", { replace: true });
  } else {
    window.location.href = "/";
  }
};
