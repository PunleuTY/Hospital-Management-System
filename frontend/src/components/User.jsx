//TODO: Replace total user and each total role with actual data

// React hooks
import { useEffect, useState } from "react";

// Import Icons
import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";

// Common components
import Input from "./common/Input.jsx";
import Button from "./common/Button.jsx";
import Dropdown from "./common/Dropdown.jsx";

// API services
import { createUser, getUserSummarize } from "../service/userAPI.js";

// Utils
import { success, error } from "./utils/toast.js";

export default function User() {
  // ===== STATE MANAGEMENT =====
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    role: false,
  });
  const [resetValue, setResetValue] = useState(0);
  const [userSummarize, setUserSummarize] = useState({});

  // ===== CONSTANTS =====
  const roleMap = {
    doctor: 2,
    nurse: 3,
    receptionist: 4,
  };

  const roleOptions = ["Doctor", "Nurse", "Receptionist"];

  // ===== EVENT HANDLERS =====
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  // ===== UTILITY FUNCTIONS =====
  const findRoleStatistics = (role) => {
    const user = userSummarize.roleStatistics?.find((u) => u.roleName === role);
    return user ? user.userCount : 0;
  };

  const reset = () => {
    setUserName("");
    setPassword("");
    setSelectedRole("");
    setResetValue((prev) => prev + 1); // Increment instead of toggle
    setErrors({ userName: false, password: false, role: false });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { userName: false, password: false, role: false };

    if (!userName) {
      newErrors.userName = true;
      isValid = false;
    } else {
      newErrors.userName = false;
    }
    if (!password) {
      newErrors.password = true;
      isValid = false;
    } else {
      newErrors.password = false;
    }
    if (!selectedRole) {
      newErrors.role = true;
      isValid = false;
    } else {
      newErrors.role = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ===== API FUNCTIONS =====
  const handleUserSummarize = async () => {
    try {
      const response = await getUserSummarize();
      setUserSummarize(response.data);
    } catch (err) {
      console.error("Failed to fetch user statistics:", err.message);
      error("Failed to fetch user statistics!");
    }
  };

  const handleSubmit = async () => {
    const validateStatus = validate();
    if (validateStatus) {
      setIsLoading(true);
      try {
        const newUser = {
          username: userName,
          password: password,
          role: roleMap[selectedRole.toLowerCase()],
        };

        console.log("Submitting user:", newUser);
        const response = await createUser(newUser);
        console.log("User created successfully:", response);

        reset();
        success("User Created Successfully!");
      } catch (err) {
        console.error("Failed to create user:", err);
        // Show specific error message if available
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to create user!";
        error(errorMessage);
      } finally {
        setIsLoading(false);
        handleUserSummarize();
      }
    }
  };

  // ===== Effect =====
  useEffect(() => {
    handleUserSummarize();
  }, []);

  // ===== RENDER =====
  return (
    <div className="w-full p-6">
      {/* Header section */}
      <h1 className="text-3xl font-bold mb-3">Users</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-1 gap-3 rounded-md flex-col border border-(--color-gray) p-3">
          <h1 className="font-bold text-2xl">Add New User</h1>
          {/* User form section */}
          <div>
            {/* Username field */}
            <div>
              <div className="flex gap-2">
                <p>Username</p>
                {errors.userName && (
                  <p className="text-red-500">Please enter username</p>
                )}
              </div>
              <Input
                className="mb-3"
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleUserNameChange}
                value={userName}
              />
            </div>

            {/* Password field */}
            <div className="flex-1">
              <div className="flex gap-2">
                <p>Password</p>
                {errors.password && (
                  <p className="text-red-500">Please enter password</p>
                )}
              </div>
              <Input
                className="mb-3"
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>

            {/* Role selection and submit button */}
            <div>
              <div className="flex gap-2">
                <p>Role</p>
                {errors.role && (
                  <p className="text-red-500">Please select a role</p>
                )}
              </div>
              <div className="flex gap-3 flex-col lg:flex-row">
                <Dropdown
                  options={roleOptions}
                  defaultLabel="Choose a Role"
                  onSelect={setSelectedRole}
                  reset={resetValue}
                  className={"flex-3/4"}
                />
                <Button
                  content={isLoading ? "Adding..." : "Add User"}
                  onClick={handleSubmit}
                  className={"w-full"}
                  isAddIcon={true}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* User summarization section (commented out) */}
        <div className="flex-1 gap-3 flex flex-col border border-(--color-gray) rounded-md p-3">
          <h2 className="font-bold text-2xl">User Summarization</h2>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <FaUsers className="text-[24px]" />
              <p>Total User: {userSummarize.totalUsers || 0}</p>
            </div>
            <div className="flex gap-3 items-center">
              <FaUserDoctor className="text-[24px]" />
              <p>Total Doctor: {findRoleStatistics("doctor")}</p>
            </div>
            <div className="flex gap-3 items-center">
              <FaUserNurse className="text-[24px]" />
              <p>Total Nurse: {findRoleStatistics("nurse")}</p>
            </div>
            <div className="flex gap-3 items-center">
              <FaUserGear className="text-[24px]" />
              <p>Total Receptionist: {findRoleStatistics("receptionist")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
