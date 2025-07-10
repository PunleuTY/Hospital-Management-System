import Input from "./Common/Input";
import Button from "./Common/Button";
import Dropdown from "./Common/Dropdown";
import { useState } from "react";
import { createUser } from "../service/userAPI.js";
import { success, error } from "./utils/toast.js";

export default function AddUser() {
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

  // Role Option
  const roleMap = {
    doctor: 2,
    nurse: 3,
    receptionist: 4,
  };
  const roleOptions = ["Doctor", "Nurse", "Receptionist"];

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
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
      }
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-1">Add User</h1>
      <div className="flex gap-5">
        <div className="flex-1 border border-(--color-gray) rounded-md p-3">
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
          <div>
            <div className="flex gap-2">
              <p>Role</p>
              {errors.role && (
                <p className="text-red-500">Please select a role</p>
              )}
            </div>
            <div className="flex gap-3 ">
              <Dropdown
                options={roleOptions}
                defaultLabel="Choose a Role"
                onSelect={setSelectedRole}
                reset={resetValue}
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
        {/* <div className="flex-1 border border-(--color-gray) rounded-md p-3">
          <h2 className="font-bold text-2xl mb-2">User Summarization</h2>
          <div>
            <p>Total User: 13</p>
            <p className="mt-2">Total Doctor: 5</p>
            <p className="mt-2">Total Nurse: 4</p>
            <p className="mt-2">Total Receptionist: 4</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
