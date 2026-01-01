import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpeg";
import { User, UserCog, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      const emailValue = e.target.value;
      let errorMessage = "";
      if (emailValue.includes("@") && !emailValue.includes(".")) {
        errorMessage = "Email must contain '.'";
      } else if (!emailValue.includes("@") && emailValue.includes(".")) {
        errorMessage = "Email must contain '@'";
      } else if (!emailValue.includes("@") && !emailValue.includes(".")) {
        errorMessage = "Email must contain '@' and '.'";
      }
      setErrors({ ...errors, email: errorMessage });
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
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      validationErrors.email =
        !formData.email.includes("@") && !formData.email.includes(".")
          ? "Email must contain '@' and '.'"
          : !formData.email.includes("@")
          ? "Email must contain '@'"
          : "Email must contain '.'";
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
      const response = await axios.post("http://localhost:4000/user/signup", formData);
      setAlertMessage("Signup successful! Please log in.");
      setAlertType("success");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.message === "User already exists") {
        setAlertMessage("User already exists. Please try with a different email.");
        setAlertType("error");
      } else {
        setAlertMessage("Signup failed! Please try again.");
        setAlertType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-36 mb-4 flex items-center justify-center">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="max-w-full object-contain" 
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
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
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <div className={`flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 transition-all duration-200`}>
              <User className="text-gray-400 mr-3" size={20} />
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <div className={`flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 transition-all duration-200`}>
              <UserCog className="text-gray-400 mr-3" size={20} />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full focus:outline-none text-gray-700 bg-transparent"
              >
                <option value="" disabled>Select the role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className={`flex items-center border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 transition-all duration-200`}>
              <Mail className="text-gray-400 mr-3" size={20} />
              <input
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
            <label className="block text-gray-700 font-medium mb-2">Password</label>
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
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;