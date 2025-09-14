import React, { useState } from "react";
import "../css/Register.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const RegisterForm = () => {
  useDocumentTitle("Register - CampusConnect")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const regexRules = {
    name: /^[A-Za-z]+(?: [A-Za-z]+)*$/, // full name letters only
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /^[0-9]{10,15}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, // strong password
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !regexRules.name.test(value)) {
      error = "Enter a valid full name.";
    } else if (name === "email" && !regexRules.email.test(value)) {
      error = "Enter a valid email address.";
    } else if (name === "phone" && !regexRules.phone.test(value)) {
      error = "Phone must be 10–15 digits.";
    } else if (name === "password" && !regexRules.password.test(value)) {
      error = "Password must be 8+ chars, 1 uppercase, 1 number.";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match.";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // live validation
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    // password strength meter
    if (name === "password") {
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;
      setStrength(score);
    }
  };

  const validateAll = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      setShowModal(true);
      setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      setStrength(0);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Left Side */}
        <div className="register-hero">
          <div className="logo">
            <span>CampusConnect</span>
          </div>
          <h2>Registered your account</h2>
          <p>
            Register quickly and securely. Enter your details below weak inputs will trigger helpful hints.
          </p>
        </div>

        {/* Form Side */}
        <div className="form-wrap">
          <h3>Register</h3>
          <p className="lead">Fill in your details below</p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input className="reg-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input className="reg-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input className="reg-input"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03012345678"
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input className="reg-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
              <div className="strength">
                <i
                  style={{
                    width:
                      strength === 1
                        ? "25%"
                        : strength === 2
                        ? "50%"
                        : strength === 3
                        ? "75%"
                        : strength === 4
                        ? "100%"
                        : "0%",
                    backgroundColor:
                      strength === 1
                        ? "#f87171"
                        : strength === 2
                        ? "#fbbf24"
                        : strength === 3
                        ? "#3b82f6"
                        : strength === 4
                        ? "#22c55e"
                        : "transparent",
                  }}
                ></i>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <input className="reg-input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="reg-btn">Register</button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="reg-modal-overlay">
          <div className="reg-modal">
            <h3>You are registered successfully 🎉</h3>
            <button class="reg-btn"onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
