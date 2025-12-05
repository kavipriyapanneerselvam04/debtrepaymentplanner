import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Overview of debts and progress charts.</p>

      <div className="dashboard-grid">
        {/* Debts Card */}
        <div
          className="card clickable"
          onClick={() => navigate("/debt-portfolio")}
        >
          <h3>Debts</h3>
          <p>Track your loans and repayments easily.</p>
        </div>

        {/* Progress Card */}
        <div
          className="card clickable"
          onClick={() => navigate("/financial-goals")}
        >
          <h3>Progress</h3>
          <p>Visualize your financial goals and progress.</p>
        </div>
      </div>

      {/* 📌 Debt Repayment Planner Overview */}
      
      <div className="planner-overview-box clickable" onClick={() => navigate("/repayment-planner")}>
        <h3>💡 About Debt Repayment Planner</h3>
        <p>
          The <strong>Debt Repayment Planner</strong> helps you take control of your
          finances by comparing repayment strategies like{" "}
          <span className="highlight">Snowball</span> (clear smaller debts first) and{" "}
          <span className="highlight">Avalanche</span> (tackle high-interest debts first).
          <br /><br />
         
          ✅ Track your progress <br />
          ✅ Become debt-free faster
        </p>
      </div>


      {/* Footer Section */}
      <footer className="dashboard-footer">
        <p>💰 SmartDebt Manager – Helping you stay on top of your finances.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
