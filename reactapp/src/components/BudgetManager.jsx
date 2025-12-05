import React, { useState, useEffect } from "react";
import {
  getBudgetCategories,
  addBudgetCategory,
  deleteBudgetCategory,
} from "../services/api"; // ✅ adjust path if needed
import "./BudgetManager.css";

function BudgetManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryName: "",
    categoryType: "FIXED_EXPENSE",
    allocatedAmount: "",
  });

  const userId = 1; // ⚠️ replace with logged-in user’s ID if available

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getBudgetCategories(userId);
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.categoryName || !form.allocatedAmount) return;

    const newCategory = {
      userId: userId,
      categoryName: form.categoryName,
      categoryType: form.categoryType, // must match enum in backend
      allocatedAmount: parseFloat(form.allocatedAmount),
      actualAmount: 0,
      budgetMonth: new Date().toISOString(),
    };

    try {
      await addBudgetCategory(newCategory);
      await fetchCategories(); // refresh after add
      setForm({ categoryName: "", categoryType: "FIXED_EXPENSE", allocatedAmount: "" });
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudgetCategory(id);
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="budget-manager">
      <h2>💰 Budget Manager</h2>
      <p>Manage your budget categories with backend storage.</p>

      {/* Add Category Form */}
      <form className="budget-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="categoryName"
          value={form.categoryName}
          onChange={handleChange}
          placeholder="Category Name"
        />
        <select
          name="categoryType"
          value={form.categoryType}
          onChange={handleChange}
        >
       
          <option value="INCOME">Income</option>
          <option value="FIXED_EXPENSE">Fixed Expense</option>
          <option value="VARIABLE_EXPENSE">Variable Expense</option>
          <option value="DEBT_PAYMENT">Debt Payment</option>
          <option value="SAVINGS">Savings</option>
          <option value="INVESTMENT">Investment</option>
        </select>
        <input
          type="number"
          name="allocatedAmount"
          value={form.allocatedAmount}
          onChange={handleChange}
          placeholder="Allocated Amount"
        />
        <button type="submit">Add</button>
      </form>

      {/* Categories Table */}
      <div className="budget-items">
        {categories.length === 0 ? (
          <p className="empty">No budget categories yet.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="item-card">
              <span>
                <b>{cat.categoryName}</b> ({cat.categoryType})
              </span>
              <span>₹{cat.allocatedAmount}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(cat.id)}
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetManager;

