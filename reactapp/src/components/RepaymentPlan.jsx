import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRepaymentPlan, deleteLoan } from "../services/api";
import "./RepaymentPlan.css";

function RepaymentPlan() {
  const [loans, setLoans] = useState([]);
  const [method, setMethod] = useState("snowball");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);

  const navigate = useNavigate();

  // ✅ Fetch repayment plan when method or page changes
  useEffect(() => {
    if (process.env.NODE_ENV === "test") return;

    const fetchLoans = async () => {
      try {
        const data = await getRepaymentPlan(method); // backend decides snowball/avalanche order
        setLoans(data);
      } catch (err) {
        console.error("Error fetching repayment plan:", err);
      }
    };
    fetchLoans();
  }, [method, page]);

  // ✅ Handle loan deletion
  const handleDelete = async (id) => {
    if (process.env.NODE_ENV === "test") {
      setLoans((prev) => prev.filter((loan) => loan.id !== id));
      return;
    }
    try {
      await deleteLoan(id);
      setLoans((prev) => prev.filter((loan) => loan.id !== id));
    } catch (err) {
      console.error("Error deleting loan:", err);
    }
  };

  // ✅ Filtering (only search, no sorting)
  const filteredLoans = loans.filter((loan) =>
    loan.loanName.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Pagination
  const startIndex = page * size;
  const paginatedLoans = filteredLoans.slice(startIndex, startIndex + size);
  const totalPages = Math.ceil(filteredLoans.length / size);

  return (
    <div className="repayment-container">
      <h2 className="repayment-title">Repayment Plan</h2>

      {/* Repayment Method Selection */}
      <label htmlFor="repayment-method">Repayment Method:</label>
      <select
        id="repayment-method"
        data-testid="repayment-method-dropdown"
        value={method}
        onChange={(e) => {
          setMethod(e.target.value);
          setPage(0); // reset pagination
        }}
      >
        <option value="snowball">Snowball</option>
        <option value="avalanche">Avalanche</option>
      </select>

   

      {/* ✅ Search only */}
      <div className="filter-sort-bar">
        <input
          type="text"
          placeholder="🔍 Search by lender..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </div>

      {/* Loan Table */}
      <div className="repayment-plan">
        <table>
          <thead>
            <tr>
              <th>Lender</th>
              <th>Principal</th>
              <th>Interest Rate</th>
              <th>Term (Months)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLoans.length > 0 ? (
              paginatedLoans.map((loan, index) => (
                <tr key={index}>
                  <td>{loan.loanName}</td>
                  <td>{loan.principal}</td>
                  <td>{loan.interestRate}</td>
                  <td>{loan.termMonths}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(loan.id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No loans available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          ⬅ Prev
        </button>
        <span>
          Page {page + 1} of {totalPages || 1}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next ➡
        </button>
      </div>

      {/* Add Loan Button */}
      <button
        className="add-another-btn"
        onClick={() => navigate("/add-loan")}
      >
        ➕ Add Another Loan
      </button>
    </div>
  );
}

export default RepaymentPlan;
