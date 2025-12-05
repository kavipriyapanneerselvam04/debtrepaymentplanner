import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css"; // new CSS for register

function RegisterForm({ onRegister }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (onRegister) onRegister({ firstName, lastName, email, password });
  };

  return (
    <div className="register-container">
      {/* Left Image */}
      <div className="register-image">
        <img
        src="
https://play-lh.googleusercontent.com/ROZd7Co2AnO4u4r4-nRfIfVXK0wM8GooZ-OWRXB36dS4BXUILUNBVWqgHwIdc0YDkEvN"
          alt="Register Illustration"
        />
      </div>

      {/* Right Form */}
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Create Account</h2>

          <div className="name-fields">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
       
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
