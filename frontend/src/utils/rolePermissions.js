// Role-based navigation utility

export const ROLES = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  NURSE: "nurse",
  RECEPTIONIST: "receptionist",
};

// Define navigation permissions for each role
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "dashboard",
    "patients",
    "appointments",
    "billing",
    "staff",
    "medical_record",
    "add_user",
  ],
  [ROLES.DOCTOR]: ["dashboard", "patients", "appointments", "medical_record"],
  [ROLES.NURSE]: ["dashboard", "patients", "appointments", "medical_record"],
  [ROLES.RECEPTIONIST]: ["dashboard", "patients", "appointments", "billing"],
};

// Map navigation items to permission keys
export const NAVIGATION_PERMISSIONS = {
  Dashboard: "dashboard",
  Patients: "patients",
  Appointments: "appointments",
  Billing: "billing",
  Staff: "staff",
  "Medical Record": "medical_record",
  "Add User": "add_user",
};

export const filterNavigationByRole = (navigationItems, userRole) => {
  if (!userRole) {
    return []; // No role, no navigation
  }

  // Normalize role to lowercase
  const normalizedRole = userRole.toLowerCase();

  // Get permissions for this role
  const allowedPermissions = ROLE_PERMISSIONS[normalizedRole] || [];

  if (allowedPermissions.length === 0) {
    // Unknown role, only allow dashboard
    return navigationItems.filter((item) => item.label === "Dashboard");
  }

  // Filter navigation items based on permissions
  return navigationItems.filter((item) => {
    const permissionKey = NAVIGATION_PERMISSIONS[item.label];
    return allowedPermissions.includes(permissionKey);
  });
};

export const hasNavigationPermission = (navigationLabel, userRole) => {
  if (!userRole) {
    return false;
  }

  const normalizedRole = userRole.toLowerCase();
  const allowedPermissions = ROLE_PERMISSIONS[normalizedRole] || [];
  const permissionKey = NAVIGATION_PERMISSIONS[navigationLabel];

  return allowedPermissions.includes(permissionKey);
};
