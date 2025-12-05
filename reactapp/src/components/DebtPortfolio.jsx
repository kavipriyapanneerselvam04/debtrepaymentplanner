import React from "react";
import { useNavigate } from "react-router-dom";
import "./DebtPortfolio.css";

function DebtPortfolio() {
  const navigate = useNavigate();

  return (
    <div className="debt-portfolio">
      <h2 className="portfolio-title">Debt Portfolio</h2>

      <div className="debt-grid">
        <div className="debt-card">
          <h3>Your Loans</h3>
          <p>Manage and track your active loans here.</p>

          <button
            className="add-loan-btn"
            onClick={() => navigate("/add-loan")}
          >
            ➕ Add Loan
          </button>
        </div>
      </div>
    </div>
  );
}

export default DebtPortfolio;
