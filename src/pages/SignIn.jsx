// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logo from "/src/assets/logo_latest.png";

export default function SignIn({ setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api-uat.healthwealthsafe.link/api/web/staffLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username : "hrn", password : "March@2025"}),
        }
      );
      const data = await response.json();

      if (response.ok && data.status === "success") {
        const { token, ...userInfo } = data.data;

        // localStorage.setItem("authToken", token);
        // localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // localStorage.setItem("isLoggedIn", true);
        // localStorage.setItem("userRole", userInfo.role || "user");
        // localStorage.setItem("userName", userInfo.name || "User");
        // localStorage.setItem("userId", userInfo.id || "0");
        // localStorage.setItem("userEmail", userInfo.email || "User Email");

        // localStorage.setItem("userPhone", userInfo.phone || "User Phone");

        // localStorage.setItem("userOrganization", userInfo.organization || "User Organization");
        // localStorage.setItem("userOrganizationId", userInfo.organizationId || "0");
        // localStorage.setItem("userOrganizationName", userInfo.organizationName || "User Organization Name");  

        // clearTimeout(localStorage.getItem("isLoggedInTimeout"));
        // const timeout = setTimeout(() => {
        //   localStorage.removeItem("isLoggedIn");
        //   localStorage.removeItem("authToken");
        //   localStorage.removeItem("userInfo");
        // }, 3600000); 


        if (setIsLoggedIn) setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full font-sans">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-white flex flex-col px-8 md:px-20 py-12 md:py-20 space-y-6">
        <img src={logo} alt="Logo" className="w-40 md:w-56 h-auto" />

        <div className="text-4xl md:text-6xl font-medium text-blue-700 leading-tight">
          <strong>H</strong>ealth <strong>W</strong>ealth <strong>S</strong>afe
        </div>

        <p className="text-blue-600 font-medium text-base md:text-lg">
          Remote Patient Monitoring & Chronic Care Management Solutions
        </p>

        <div className="mt-auto text-gray-700 text-sm md:text-base space-y-2">
          <p>2005 Prince Ave, Athens, GA, United States, 30606</p>

          <p className="flex items-center gap-4 flex-wrap">
            <span>
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              info@healthwealthsafe.com
            </span>
            <span>
              <FontAwesomeIcon icon={faPhone} className="mr-1" />
              +1 (877) 581-8810
            </span>
          </p>

          <p className="text-gray-600 italic">(Available 24/7)</p>

          <div className="pt-3 text-xs md:text-sm text-gray-500 space-x-4">
            <a href="#" className="hover:underline hover:text-blue-600">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:underline hover:text-blue-600">
              Terms of Use
            </a>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-blue-600 flex justify-center items-center relative px-4 py-12">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-sm mb-6">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <p className="text-sm text-blue-600 hover:underline">
              <a href="#">Forgot Username or Password?</a>
            </p>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 shadow-md font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-sm text-blue-600 text-center">
            <a href="#" className="font-semibold hover:underline">
              Administrator?
            </a>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-md shadow-sm text-xs text-gray-800">
          <p className="font-semibold">
            Home Health <span className="font-normal">www.pvctu</span>
          </p>
          <p className="text-right text-[10px] text-gray-500">V.7.1</p>
        </div>
      </div>
    </div>
  );
}


