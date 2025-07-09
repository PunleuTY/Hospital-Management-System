import Input from "./Common/Input";
import Button from "./Common/Button";
import Dropdown from "./Common/Dropdown";
import { use, useEffect, useState } from "react";

export default function AddUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    console.log(selectedRole);
  });

  // Role Option
  const roleOptions = ["Nurse", "Receptionist", "Doctor"];

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-1">Add User</h1>
      <div className="flex gap-5">
        <div className="flex-1 border border-(--color-gray) rounded-md p-3">
          <div>
            <p>Username</p>
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
            <p>Password</p>
            <Input
              className="mb-3"
              type="text"
              placeholder="Enter Password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div>
            <p>User Role</p>
            <div className="flex gap-3">
              <Dropdown
                options={roleOptions}
                defaultLabel="Choose a Role"
                onSelect={setSelectedRole}
              />
              <Button content={"Add User"} isAddIcon={true} />
            </div>
          </div>
        </div>
        <div className="flex-1 border border-(--color-gray) rounded-md p-3">
          <h2 className="font-bold text-2xl mb-2">User Summarization</h2>
          <div>
            <p>Total User: 13</p>
            <p className="mt-2">Total Doctor: 5</p>
            <p className="mt-2">Total Nurse: 4</p>
            <p className="mt-2">Total Receptionist: 4</p>
          </div>
        </div>
      </div>
    </div>
  );
}
