import Hospital from "@/assets/hospital.png";
import Input from "./common/Input";
import { useState } from "react";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../service/userAPI";
import { setToken, setUser } from "../utils/auth";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passErr) setPassErr(false); // Clear error when user starts typing
    if (loginError) setLoginError(""); // Clear login error
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    if (usernameErr) setUsernameErr(false); // Clear error when user starts typing
    if (loginError) setLoginError(""); // Clear login error
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const loginData = {
        username: userName.trim(),
        password: password,
      };

      console.log("Attempting login for:", loginData.username);
      const response = await login(loginData);

      console.log("Login successful:", response);
      console.log("Response structure:", JSON.stringify(response, null, 2));

      // Check if login was successful
      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      // Extract data from your backend response structure
      const { token, userRole } = response.data;

      if (!token) {
        throw new Error("No token received from server");
      }

      console.log("Token:", token);
      console.log("User role data:", userRole);

      // Store token
      setToken(token);

      // Transform userRole to match expected user structure
      if (userRole) {
        const userData = {
          username: loginData.username, // Store the username we used to login
          role: {
            roleId: userRole.role_id,
            roleName: userRole.role_name,
          },
        };

        setUser(userData);
        console.log("Stored user data:", userData);
        console.log("User role:", userData.role.roleName);
      }

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      // Handle different error types
      let errorMessage = "Invalid username or password";

      if (error.response) {
        // Handle HTTP status codes
        switch (error.response.status) {
          case 401:
            errorMessage = "Invalid credentials";
            break;
          case 400:
            errorMessage = "Invalid credentials";
            break;
          case 404:
            errorMessage = "User not found";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = error.response.data?.message || "Login failed";
        }
      } else if (error.message) {
        // Handle custom error messages from backend
        if (
          error.message.toLowerCase().includes("user not found") ||
          error.message.toLowerCase().includes("not found")
        ) {
          errorMessage = "User not found";
        } else if (
          error.message.toLowerCase().includes("invalid") ||
          error.message.toLowerCase().includes("unauthorized")
        ) {
          errorMessage = "Invalid credentials";
        } else {
          errorMessage = error.message;
        }
      }

      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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

        {/* Login Error Message */}
        {loginError && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="text-sm text-center">{loginError}</p>
          </div>
        )}

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
