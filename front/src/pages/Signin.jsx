import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { useAuth } from "../context/AuthContext";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email: emailRegex.test(e.target.value)
          ? ""
          : "Please enter a valid email address.",
      });
    }

    if (e.target.name === "password") {
      setErrors({
        ...errors,
        password:
          e.target.value.length >= 8
            ? ""
            : "Password must be at least 8 characters",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        setAlertMessage("Login successful! Redirecting...");
        setAlertType("success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setAlertMessage(
          data.message || `Login failed. Status: ${response.status}`
        );
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("Something went wrong. Please try again later.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          {/* Logo container with original size (w-28) and full logo visibility */}
          <div className="w-36 mb-4 flex items-center justify-center">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="max-w-full object-contain" 
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>
        
        {alertMessage && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 animate-fadeIn ${
              alertType === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {alertType === "success" ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <AlertCircle className="text-red-500 w-5 h-5" />
            )}
            <span>{alertMessage}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className={`flex items-center border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 transition-all duration-200`}>
              <Mail className="text-gray-400 mr-3" size={20} />
              <input
                ref={emailInputRef}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="mr-1 w-4 h-4" /> {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-gray-700 font-medium">Password</label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className={`flex items-center border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 transition-all duration-200`}>
              <Lock className="text-gray-400 mr-3" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full focus:outline-none text-gray-700"
              />
              <button
                type="button"
                className="ml-2 focus:outline-none p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-500 w-5 h-5" />
                ) : (
                  <Eye className="text-gray-500 w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="mr-1 w-4 h-4" /> {errors.password}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transform transition-all duration-200 ${
              loading 
                ? "opacity-70 cursor-not-allowed" 
                : "hover:bg-blue-700 hover:shadow-md active:scale-98"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;