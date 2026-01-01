import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import logo from "../assets/logo.jpeg";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecial: false
    });
    const emailInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
        if (message) {
            const timer = setTimeout(() => {
                navigate("/signin");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate]);

    useEffect(() => {
        // Check password strength
        setPasswordStrength({
            length: newPassword.length >= 8,
            hasUppercase: /[A-Z]/.test(newPassword),
            hasLowercase: /[a-z]/.test(newPassword),
            hasNumber: /[0-9]/.test(newPassword),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
        });
    }, [newPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Password validation
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/user/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            if (response.ok) {
                setMessage("Password updated successfully! Redirecting to login...");
                setError("");
                setEmail("");
                setNewPassword("");
            } else {
                const data = await response.json();
                setError(data.message || "Failed to update password.");
                setMessage("");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
            setMessage("");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Company Logo" className="w-36 h-36 object-contain mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
                    <p className="text-gray-600 text-center mt-2">
                        Enter your email and create a new password
                    </p>
                </div>

                {message && (
                    <div className="mt-4 p-4 rounded-lg flex items-center gap-2 bg-green-50 text-green-800 border border-green-200">
                        <CheckCircle size={20} className="text-green-600" />
                        <span>{message}</span>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email Address
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                            <Mail size={18} className="text-gray-500 mr-2" />
                            <input
                                ref={emailInputRef}
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full focus:outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            New Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                            <Lock size={18} className="text-gray-500 mr-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="Create secure password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full focus:outline-none text-gray-800"
                            />
                            <button
                                type="button"
                                className="ml-2 focus:outline-none text-gray-400 hover:text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {newPassword && (
                            <div className="mt-2">
                                <p className="text-xs font-medium text-gray-700 mb-1">Password requirements:</p>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className={`text-xs flex items-center ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-1 ${passwordStrength.length ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                        At least 8 characters
                                    </div>
                                    <div className={`text-xs flex items-center ${passwordStrength.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-1 ${passwordStrength.hasUppercase ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                        Uppercase letter
                                    </div>
                                    <div className={`text-xs flex items-center ${passwordStrength.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-1 ${passwordStrength.hasLowercase ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                        Lowercase letter
                                    </div>
                                    <div className={`text-xs flex items-center ${passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-1 ${passwordStrength.hasNumber ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                        Number
                                    </div>
                                    <div className={`text-xs flex items-center ${passwordStrength.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-1 ${passwordStrength.hasSpecial ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                        Special character
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 rounded-lg font-medium transition duration-200 ${
                            loading
                                ? "bg-blue-400 text-white cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>
                </form>

                <div className="mt-6 flex justify-center">
                    <Link
                        to="/signin"
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-1" />
                        Back to Sign In
                    </Link>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;