import { useState, useEffect } from "react";
import { getUser } from "./auth";

/**
 * Custom hook to manage user role and permissions
 * @returns {Object} User role information and helper functions
 */
export const useUserRole = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
    setRole(userData?.role?.roleName?.toLowerCase() || null);
    setIsLoading(false);
  }, []);

  const isAdmin = () => role === "admin";
  const isDoctor = () => role === "doctor";
  const isNurse = () => role === "nurse";
  const isReceptionist = () => role === "receptionist";

  const hasRole = (requiredRole) => {
    if (!role || !requiredRole) return false;
    return role === requiredRole.toLowerCase();
  };

  const hasAnyRole = (requiredRoles) => {
    if (!role || !Array.isArray(requiredRoles)) return false;
    return requiredRoles.some((r) => role === r.toLowerCase());
  };

  return {
    user,
    role,
    isLoading,
    isAdmin,
    isDoctor,
    isNurse,
    isReceptionist,
    hasRole,
    hasAnyRole,
    roleName: user?.role?.roleName || "Unknown",
  };
};
