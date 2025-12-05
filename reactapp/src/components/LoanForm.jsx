import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLoan } from "../services/api";   // ✅ import your API
import "./LoanForm.css";

function LoanForm() {
  const [loan, setLoan] = useState({
    loanName: "",
    principal: "",
    interestRate: "",
    termMonths: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLoan(loan); // ✅ save loan to backend
      navigate("/repayment-plan"); // ✅ redirect after success
    } catch (err) {
      console.error("Error adding loan:", err);
    }
  };

  return (
    <div className="loan-form-container">
     
      <form onSubmit={handleSubmit}>
        <input
          id="loanName"
          type="text"
          name="loanName"
          value={loan.loanName}
          onChange={handleChange}
          placeholder="Loan Name"
          required
        />
        <input
          id="principal"
          type="number"
          name="principal"
          value={loan.principal}
          onChange={handleChange}
          placeholder="Principal"
          required
        />
        <input
          id="interestRate"
          type="number"
          name="interestRate"
          value={loan.interestRate}
          onChange={handleChange}
          placeholder="Interest Rate"
          required
        />
        <input
          id="termMonths"
          type="number"
          name="termMonths"
          value={loan.termMonths}
          onChange={handleChange}
          placeholder="Term (Months)"
          required
        />
        <button id="submitLoan" type="submit">
          Add Loan
        </button>
      </form>
    </div>
  );
}

export default LoanForm;
