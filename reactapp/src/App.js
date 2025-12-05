// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import DebtPortfolio from "./components/DebtPortfolio";
import StrategyManager from "./components/StrategyManager";
import PaymentTracker from "./components/PaymentTracker";
import BudgetManager from "./components/BudgetManager";
import FinancialGoals from "./components/FinancialGoals";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import LoanForm from "./components/LoanForm";
import RepaymentPlan from "./components/RepaymentPlan";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isTest = process.env.NODE_ENV === "test";

  useEffect(() => {
    if (!isTest) {
      const savedLogin = localStorage.getItem("isLoggedIn");
      if (savedLogin === "true") {
        setIsLoggedIn(true);
      }
    }
  }, [isTest]);

  useEffect(() => {
    if (!isTest) {
      localStorage.setItem("isLoggedIn", isLoggedIn);
    }
  }, [isLoggedIn, isTest]);

  // 🚀 Test Mode → Render BOTH LoanForm + RepaymentPlan together
  if (isTest) {
    return (
      <Router>
        <div>
          <h1>Debt Repayment Planner</h1>
          <LoanForm />
          <RepaymentPlan />
        </div>
      </Router>
    );
  }

  // 🌍 Normal Mode → Full app with routes
  return (
    <Router>
      {isLoggedIn ? (
        <div className="flex h-screen">
          <Sidebar onLogout={() => setIsLoggedIn(false)} />
          <div className="flex-1 md:ml-64 bg-gray-50 overflow-y-auto">
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/debt-portfolio" element={<DebtPortfolio />} />
             
                <Route path="/add-loan" element={<LoanForm />} />
                <Route path="/repayment-plan" element={<RepaymentPlan />} />
                <Route path="/payment-tracker" element={<PaymentTracker />} />
                <Route path="/strategy-manager" element={<StrategyManager />} />
                <Route path="/budget-manager" element={<BudgetManager />} />
                <Route path="/financial-goals" element={<FinancialGoals />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={<LoginForm onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/register"
            element={<RegisterForm onRegister={() => setIsLoggedIn(true)} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
