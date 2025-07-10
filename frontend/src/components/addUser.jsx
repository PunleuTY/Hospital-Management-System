import Input from "./Common/Input";
import Button from "./Common/Button";
import Dropdown from "./Common/Dropdown";
import { use, useEffect, useState } from "react";

export default function AddUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    role: false,
  });

  // Role Option
  const roleOptions = ["Nurse", "Receptionist", "Doctor"];

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

  const handleSubmit = () => {
    const validateStatus = validate();
    if (validateStatus) {
      const newUser = {
        username: userName,
        password: password,
        role: selectedRole,
      };
      // Here you can add the logic to submit the form data
      console.log("Form submitted successfully");
      console.log(newUser);
      reset();
    }
    //TODO: call api to add user
  };

  return (
    <div className="w-full p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Add User</h1>
      <div className="border border-gray-300 rounded-md p-4 md:p-6 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto md:mx-0">
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <p className="text-sm font-medium">Username</p>
            {errors.userName && (
              <p className="text-red-500 text-xs">Please enter username</p>
            )}
          </div>
          <Input
            className="w-full"
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={handleUserNameChange}
            value={userName}
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <p className="text-sm font-medium">Password</p>
            {errors.password && (
              <p className="text-red-500 text-xs">Please enter password</p>
            )}
          </div>
          <Input
            className="w-full"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <p className="text-sm font-medium">Role</p>
            {errors.role && (
              <p className="text-red-500 text-xs">Please select a role</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Dropdown
                options={roleOptions}
                defaultLabel="Choose a Role"
                onSelect={setSelectedRole}
              />
            </div>
            <Button
              content={"Add User"}
              onClick={handleSubmit}
              isAddIcon={true}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
