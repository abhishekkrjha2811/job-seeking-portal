import React, { useContext, useState } from "react";
import { FaRegUser, FaBriefcase, FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import '../../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    role: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.role) {
      newErrors.role = "Please select your role";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData(prev => ({
      ...prev,
      role: selectedRole
    }));
    
    if (errors.role) {
      setErrors(prev => ({
        ...prev,
        role: ""
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      toast.success(data.message || "Registration successful!");
      
      setFormData({
        email: "",
        name: "",
        phone: "",
        password: "",
        role: ""
      });
      
      setIsAuthorized(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <div className="register-logo">
            <FaRegUser />
          </div>
          <h1 className="register-title">Join Our Platform</h1>
          <p className="register-subtitle">Create your professional account today</p>
        </div>

        {/* Form */}
        <form className="register-form" onSubmit={handleRegister}>
          {/* Role Selection */}
          <div className="register-input-group">
            <label className="register-input-label">I want to register as</label>
            <div className="register-role-selector">
              <div 
                className={`register-role-option ${formData.role === "Job Seeker" ? "active" : ""}`}
                onClick={() => handleRoleSelect("Job Seeker")}
              >
                <div className="register-role-icon">
                  <FaUser />
                </div>
                <div className="register-role-label">Job Seeker</div>
              </div>
              <div 
                className={`register-role-option ${formData.role === "Employer" ? "active" : ""}`}
                onClick={() => handleRoleSelect("Employer")}
              >
                <div className="register-role-icon">
                  <FaBriefcase />
                </div>
                <div className="register-role-label">Employer</div>
              </div>
            </div>
            {errors.role && (
              <div className="register-error-message">
                <span>⚠️</span>
                {errors.role}
              </div>
            )}
          </div>

          {/* Full Name */}
          <div className="register-input-group">
            <label className="register-input-label">Full Name</label>
            <div className="register-input-wrapper">
              <input
                type="text"
                name="name"
                className={`register-input ${errors.name ? "error" : ""}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <FaUser className="register-input-icon" />
            </div>
            {errors.name && (
              <div className="register-error-message">
                <span>⚠️</span>
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="register-input-group">
            <label className="register-input-label">Email Address</label>
            <div className="register-input-wrapper">
              <input
                type="email"
                name="email"
                className={`register-input ${errors.email ? "error" : ""}`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <FaEnvelope className="register-input-icon" />
            </div>
            {errors.email && (
              <div className="register-error-message">
                <span>⚠️</span>
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="register-input-group">
            <label className="register-input-label">Phone Number</label>
            <div className="register-input-wrapper">
              <input
                type="tel"
                name="phone"
                className={`register-input ${errors.phone ? "error" : ""}`}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <FaPhone className="register-input-icon" />
            </div>
            {errors.phone && (
              <div className="register-error-message">
                <span>⚠️</span>
                {errors.phone}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="register-input-group">
            <label className="register-input-label">Password</label>
            <div className="register-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`register-input ${errors.password ? "error" : ""}`}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <FaLock className="register-input-icon" />
              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--gray-400)",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <div className="register-error-message">
                <span>⚠️</span>
                {errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="register-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="register-loading">
                <div className="register-spinner"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <p className="register-login-link">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
