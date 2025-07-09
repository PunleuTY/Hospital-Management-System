import Hospital from "@/assets/hospital.png";
import Input from "./Common/Input";
import { useState } from "react";
import Button from "./Common/Button";
import { useNavigate } from "react-router-dom";

//TODO: Implement account username and password validation

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (userName.trim() === "") {
    //   setUsernameErr(true);
    // } else {
    //   setUsernameErr(false);
    // }
    // if (password.trim() === "") {
    //   setPassErr(true);
    // } else {
    //   setPassErr(false);
    // }
    // if (usernameErr || passErr) {
    //   return;
    // }

    console.log("Username:", userName);
    console.log("Password:", password);
    navigate("/dashboard"); // Navigate to the Dashboard
  };

  return (
    <div className="bg-(--color-light-cyan) w-full min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full bg-white py-6 px-4 sm:py-10 sm:px-6 rounded-md border border-(--color-light-gray) flex flex-col items-center gap-4">
        <img
          src={Hospital}
          className="rounded-full w-[55px] h-[55px]"
          alt="Hospital Logo"
        />
        <div>
          <p className="text-lg sm:text-[20px] font-bold text-center">
            Hospital Management System
          </p>
          <p className="text-sm sm:text-(--color-dark-gray) text-center">
            Sign In
          </p>
        </div>
        <div className="w-full">
          <div className="w-full">
            <div className="flex gap-3">
              <p className="text-sm">Username</p>
              {usernameErr && (
                <p className="text-sm text-red-500">
                  Please enter your username
                </p>
              )}
            </div>
            <Input
              className="mb-3"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleUserNameChange}
              value={userName}
            />
          </div>
          <div className="w-full">
            <div className="flex gap-3">
              <p className="text-sm">Password</p>
              {passErr && (
                <p className="text-sm text-red-500">
                  Please enter your password
                </p>
              )}
            </div>
            <Input
              className="mb-3"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
        </div>
        <Button
          content={"Sign In"}
          isAddIcon={false}
          className={"w-full"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
