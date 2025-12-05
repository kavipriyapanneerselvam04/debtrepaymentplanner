import React, { useState } from "react";
// import { addLoan } from "../services/api";

import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (onLogin) onLogin({ email, password });
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left side with image */}
        <div className="auth-image">
          <img
          src="https://play-lh.googleusercontent.com/ROZd7Co2AnO4u4r4-nRfIfVXK0wM8GooZ-OWRXB36dS4BXUILUNBVWqgHwIdc0YDkEvN"          
            alt="Login Illustration"
          />
        </div>

        {/* Right side with form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1  className="auth-title">Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
          <p className="auth-forgot">Forgot Password?</p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
