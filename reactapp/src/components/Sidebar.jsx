// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Sidebar.css";

// function Sidebar() {
//   return (
//     <header className="sidebar-container">
//       <h1 className="sidebar-title">Finance Dashboard</h1>
//       <nav className="sidebar-nav">
//         <NavLink to="/dashboard" className="sidebar-item">🏠 Dashboard</NavLink>
//         <NavLink to="/debt-portfolio" className="sidebar-item">💳 Debt Portfolio</NavLink>
//         <NavLink to="/strategy-manager" className="sidebar-item">📊 Strategy Manager</NavLink>
//         <NavLink to="/payment-tracker" className="sidebar-item">💸 Payment Tracker</NavLink>
//         <NavLink to="/budget-manager" className="sidebar-item">📂 Budget Manager</NavLink>
//         <NavLink to="/financial-goals" className="sidebar-item">🎯 Financial Goals</NavLink>
//         <NavLink to="/analytics" className="sidebar-item">📈 Analytics</NavLink>
//       </nav>
//     </header>
//   );
// }

// export default Sidebar;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false"); // clear session
    onLogout();
    navigate("/login"); // redirect to login
  };

  return (
    <header className="sidebar-container">
      <h1 className="sidebar-title">Finance Dashboard</h1>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-item">🏠 Dashboard</NavLink>
        <NavLink to="/debt-portfolio" className="sidebar-item">💳 Debt Portfolio</NavLink>
        <NavLink to="/strategy-manager" className="sidebar-item">📊 Strategy Manager</NavLink>
        <NavLink to="/payment-tracker" className="sidebar-item">💸 Payment Tracker</NavLink>
        <NavLink to="/budget-manager" className="sidebar-item">📂 Budget Manager</NavLink>
        <NavLink to="/financial-goals" className="sidebar-item">🎯 Financial Goals</NavLink>
       
      </nav>

      {/* ✅ Logout button */}
      <button className="sidebar-logout" onClick={handleLogout}>
        🚪 Logout
      </button>
    </header>
  );
}

export default Sidebar;
