// =======================
// Imports
// =======================
import Hospital from "@/assets/hospital.png";
import Input from "./common/Input";
import { useState } from "react";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../service/userAPI";
import { setToken, setUser } from "../utils/auth";

export default function Login() {
  // =======================
  // State
  // =======================
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  // =======================
  // Utils
  // =======================
  const validateForm = () => {
    let isValid = true;
    if (userName.trim() === "") {
      setUsernameErr(true);
      isValid = false;
    } else {
      setUsernameErr(false);
    }
    if (password.trim() === "") {
      setPassErr(true);
      isValid = false;
    } else {
      setPassErr(false);
    }
    return isValid;
  };

  // =======================
  // Event Handlers
  // =======================
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passErr) {
      setPassErr(false);
    }
    if (loginError) {
      setLoginError(false);
      setLoginMessage("");
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    if (usernameErr) {
      setUsernameErr(false);
    }
    if (loginError) {
      setLoginError(false);
      setLoginMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const loginData = { username: userName, password };
      setIsLoading(true);
      try {
        const response = await login(loginData);
        if (response.success) {
          setToken(response.data.token);
          const userData = {
            username: userName.trim(),
            role: {
              roleId: response.data.userRole.role_id,
              roleName: response.data.userRole.role_name,
            },
          };
          setUser(userData);
          setIsLoading(false);
          navigate("/dashboard");
          return;
        } else {
          setLoginMessage(response.message);
          setLoginError(true);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        setLoginMessage("Invalid Credentials");
        setLoginError(true);
        setIsLoading(false);
        return;
      }
    }
  };

  // =======================
  // Render
  // =======================
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
            Sign In to access the system
          </p>
        </div>
        <div className="w-full">
          {loginError && (
            <div className="border border-red-500 rounded-sm p-2 bg-red-300 text-red-500 flex justify-center items-center">
              {loginMessage}
            </div>
          )}
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
          content={isLoading ? "Signing In..." : "Sign In"}
          isAddIcon={false}
          className={"w-full"}
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
