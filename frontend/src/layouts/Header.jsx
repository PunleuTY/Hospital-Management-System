import { FaRegUser } from "react-icons/fa6";
import { FiSidebar } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

//TODO: Get username and role

const Header = ({ setSideBar }) => {
  const [dropOpen, setDropOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Get user data on component mount
  useEffect(() => {
    const userData = getUser();
    setUser(userData);
    console.log("Header - User data:", userData); // Debug log
  }, []);

  // Helper function to format role name
  const formatRoleName = (roleName) => {
    if (!roleName) {
      return "No Role";
    }
    return roleName.charAt(0).toUpperCase() + roleName.slice(1).toLowerCase();
  };

  // Get role color for badge
  const getRoleColor = (roleName) => {
    const role = roleName?.toLowerCase();
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "doctor":
        return "bg-blue-100 text-blue-800";
      case "nurse":
        return "bg-green-100 text-green-800";
      case "receptionist":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout(navigate, true); // Pass navigate function and enable API call
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback to basic logout
      await logout(navigate, false);
    }
  };

  return (
    <div className="w-full border border-(--color-light-gray) h-[60px] px-7 justify-between flex items-center border-l-0">
      <FiSidebar
        className="text-(--color-gray) cursor-pointer"
        onClick={() => setSideBar((prev) => !prev)}
      />
      <div className=" flex gap-5 items-center">
        <div className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 hover:rounded-md px-2 py-1">
          <FaRegUser className="text-(--color-gray)" />
          <div>
            <p className="text-1xl">{user?.username || "Unknown User"}</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                  user?.role?.roleName
                )}`}
              >
                {formatRoleName(user?.role?.roleName)}
              </span>
            </div>
          </div>
        </div>
        <FiLogOut
          onClick={handleLogout}
          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
          title="Logout"
        />
      </div>
    </div>
  );
};

export default Header;
