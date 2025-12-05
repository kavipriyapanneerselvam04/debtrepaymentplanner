import React from "react";
import { useNavigate } from "react-router-dom";
import "./StrategyManager.css";

function StrategyManager() {
  const navigate = useNavigate();

  return (
    <div className="strategy-container">
      <div className="strategy-card">
        <h2 className="strategy-title">⚡ Strategy Manager</h2>
        <p className="strategy-subtext">
          Choose repayment strategies and manage your loans.
        </p>

        <button
          className="choose-strategy-btn"
          onClick={() => navigate("/repayment-plan")}
        >
          Go to Repayment Plan ➡️
        </button>
      </div>
    </div>
  );
}

export default StrategyManager;
