// import React, { useState } from "react";
// import "./FinancialGoals.css";

// function FinancialGoals() {
//   const [goals, setGoals] = useState([]);
//   const [form, setForm] = useState({ name: "", target: "", deadline: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.name || !form.target || !form.deadline) return;
//     setGoals([...goals, { ...form, saved: 0 }]);
//     setForm({ name: "", target: "", deadline: "" });
//   };

//   return (
//     <div className="financial-goals">
//       <h2>🎯 Financial Goals</h2>
//       <p>Set and track your short-term and long-term financial goals.</p>

//       {/* Goal Form */}
//       <form className="goal-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Goal name (e.g., Buy a Car)"
//         />
//         <input
//           type="number"
//           name="target"
//           value={form.target}
//           onChange={handleChange}
//           placeholder="Target Amount"
//         />
//         <input
//           type="date"
//           name="deadline"
//           value={form.deadline}
//           onChange={handleChange}
//         />
//         <button type="submit">Add Goal</button>
//       </form>

//       {/* Goals List */}
//       <div className="goal-list">
//         {goals.length === 0 ? (
//           <p className="empty">No goals yet. Add one above!</p>
//         ) : (
//           goals.map((goal, idx) => {
//             const progress = Math.min((goal.saved / goal.target) * 100, 100);
//             return (
//               <div key={idx} className="goal-card">
//                 <div className="goal-header">
//                   <h3>{goal.name}</h3>
//                   <span className="deadline">📅 {goal.deadline}</span>
//                 </div>
//                 <p>Target: ₹{goal.target}</p>
//                 <div className="progress-bar">
//                   <div
//                     className="progress"
//                     style={{ width: `${progress}%` }}
//                   ></div>
//                 </div>
//                 <p className="progress-text">{progress.toFixed(0)}% saved</p>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// export default FinancialGoals;
import React, { useState, useEffect } from "react";
import {
  getFinancialGoals,
  addFinancialGoal,
  deleteFinancialGoal,
} from "../services/api";
import "./FinancialGoals.css";

function FinancialGoals() {
  const userId = 1; // ✅ Replace with logged-in user ID dynamically later
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    goalName: "",
    goalType: "SAVINGS",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    userId: userId,
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await getFinancialGoals(userId);
      setGoals(data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFinancialGoal(form);
      fetchGoals(); // refresh list after adding
      setForm({
        goalName: "",
        goalType: "SAVINGS",
        targetAmount: "",
        currentAmount: "",
        targetDate: "",
        userId: userId,
      });
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFinancialGoal(id);
      fetchGoals();
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  return (
    <div className="goals-container">
      <h2>🎯 Financial Goals</h2>

      {/* Add Goal Form */}
      <form onSubmit={handleSubmit} className="goals-form">
        <input
          type="text"
          name="goalName"
          value={form.goalName}
          onChange={handleChange}
          placeholder="Goal Name"
          required
        />
        <select name="goalType" value={form.goalType} onChange={handleChange}>
          <option value="DEBT_PAYOFF">Debt Payoff</option>
          <option value="EMERGENCY_FUND">Emergency Fund</option>
          <option value="SAVINGS">Savings</option>
          <option value="INVESTMENT">Investment</option>
          <option value="MAJOR_PURCHASE">Major Purchase</option>
          <option value="RETIREMENT">Retirement</option>
        </select>
        <input
          type="number"
          name="targetAmount"
          value={form.targetAmount}
          onChange={handleChange}
          placeholder="Target Amount"
          required
      

        />
        <input
          type="number"
          name="currentAmount"
          value={form.currentAmount}
          onChange={handleChange}
          placeholder="Current Amount"
        />
        <input
          type="date"
          name="targetDate"
          value={form.targetDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      {/* Display Goals */}
      <div className="goals-list">
        {goals.length === 0 ? (
          <p>No goals yet. Add one!</p>
        ) : (
          goals.map((g) => (
            <div key={g.id} className="goal-card">
              <strong>{g.goalName}</strong> ({g.goalType})  
              <br />
              Target: ₹{g.targetAmount}, Current: ₹{g.currentAmount}
              <br />
              <small>Target Date: {new Date(g.targetDate).toLocaleDateString()}</small>
              <button onClick={() => handleDelete(g.id)}>❌ Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FinancialGoals;
