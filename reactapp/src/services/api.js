// import axios from "axios";

// const BASE_URL = "https://8080-bfdcedafeffddeabbfdebdedafebdbfcbadaad.premiumproject.examly.io/api/loans";

// // ------------------ GET ALL (for tests) ------------------
// export const getAllLoans = async () => {
//   const res = await axios.get(BASE_URL);
//   return res.data;
// };

// // ------------------ GET PAGINATED (frontend) ------------------
// export const getLoans = async ({ page = 0, size = 5, sort = "id,asc", loanName = "" } = {}) => {
//   const params = { page, size, sort };
//   if (loanName) params.loanName = loanName;

//   const res = await axios.get(`${BASE_URL}/paged`, { params });
//   return res.data;
// };

// // ------------------ CREATE ------------------
// export const addLoan = async (loan) => {
//   const res = await axios.post(BASE_URL, loan);
//   return res.data;
// };

// // ------------------ REPAYMENT PLAN ------------------
// export const getRepaymentPlan = async (method = "snowball") => {
//   const res = await axios.get(`${BASE_URL}/repayment?method=${method}`);
//   return res.data;
// };

// // ------------------ DELETE ------------------
// export const deleteLoan = async (id) => {
//   const res = await axios.delete(`${BASE_URL}/${id}`);
//   return res.data;
// };



// // ------------------ Budget Categories ------------------
// export const getBudgetCategories = async (userId) => {
//   const res = await axios.get(`${BASE_URL}/budget/categories/user/${userId}`);
//   return res.data;
// };

// export const addBudgetCategory = async (category) => {
//   const res = await axios.post(`${BASE_URL}/budget/categories`, category);
//   return res.data;
// };

// export const deleteBudgetCategory = async (id) => {
//   await axios.delete(`${BASE_URL}/budget/categories/${id}`);
// };

import axios from "axios";

const LOAN_URL = "https://8080/api/loans";
const BUDGET_URL = "https://8080/api/budget/categories";

// ------------------ Loans ------------------
export const getAllLoans = async () => {
  const res = await axios.get(LOAN_URL);
  return res.data;
};

export const getLoans = async ({ page = 0, size = 5, sort = "id,asc", loanName = "" } = {}) => {
  const params = { page, size, sort };
  if (loanName) params.loanName = loanName;
  const res = await axios.get(`${LOAN_URL}/paged`, { params });
  return res.data;
};

export const addLoan = async (loan) => {
  const res = await axios.post(LOAN_URL, loan);
  return res.data;
};

export const getRepaymentPlan = async (method = "snowball") => {
  const res = await axios.get(`${LOAN_URL}/repayment?method=${method}`);
  return res.data;
};

export const deleteLoan = async (id) => {
  const res = await axios.delete(`${LOAN_URL}/${id}`);
  return res.data;
};

// ------------------ Budget Categories ------------------
export const getBudgetCategories = async (userId) => {
  const res = await axios.get(`${BUDGET_URL}/user/${userId}`);
  return res.data;
};

export const addBudgetCategory = async (category) => {
  const res = await axios.post(BUDGET_URL, category);
  return res.data;
};

export const deleteBudgetCategory = async (id) => {
  await axios.delete(`${BUDGET_URL}/${id}`);
};
// ------------------ Financial Goals ------------------
const GOALS_URL = "https://8080/api/goals";

export const getFinancialGoals = async (userId) => {
  const res = await axios.get(`${GOALS_URL}/user/${userId}`);
  return res.data;
};

export const addFinancialGoal = async (goal) => {
  const res = await axios.post(GOALS_URL, goal);
  return res.data;
};

export const deleteFinancialGoal = async (id) => {
  await axios.delete(`${GOALS_URL}/${id}`);
};

// reactapp/src/services/api.js
// import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

// // axios instance that will be used everywhere
// export const api = axios.create({
//   baseURL: API_BASE,
// });

// // helper to set/unset Authorization header and store token
// export function setAuthToken(token) {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     localStorage.setItem("token", token);
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//     localStorage.removeItem("token");
//   }
// }

// // load token at startup (so page refresh keeps auth)
// const savedToken = localStorage.getItem("token");
// if (savedToken) setAuthToken(savedToken);

// // --- AUTH endpoints (example) ---
// export const loginUser = async (creds) => {
//   const res = await api.post("/auth/login", creds);
//   return res.data;
// };

// export const registerUser = async (payload) => {
//   const res = await api.post("/auth/register", payload);
//   return res.data;
// };

// export const verifyEmail = async (token, id) => {
//   const res = await api.get("/auth/verify-email", { params: { token, id } });
//   return res.data;
// };

// export const resendVerification = async (email) => {
//   const res = await api.post("/auth/resend-verification", { email });
//   return res.data;
// };

// // --- LOANS & other endpoints use the same api instance ---
// export const getAllLoans = async () => {
//   const res = await api.get("/loans");
//   return res.data;
// };

// export const getLoans = async ({ page = 0, size = 5, sort = "id,asc", loanName = "" } = {}) => {
//   const params = { page, size, sort };
//   if (loanName) params.loanName = loanName;
//   const res = await api.get("/loans/paged", { params });
//   return res.data;
// };

// export const addLoan = async (loan) => {
//   // adapt field names to backend model; for example backend expects amount not principal
//   const payload = {
//     loanName: loan.loanName,
//     amount: Number(loan.principal ?? loan.amount ?? 0),
//     interestRate: Number(loan.interestRate ?? 0),
//     termMonths: Number(loan.termMonths ?? 0),
//   };
//   const res = await api.post("/loans", payload);
//   return res.data;
// };

// export const getRepaymentPlan = async (method = "snowball") => {
//   const res = await api.get(`/loans/repayment?method=${method}`);
//   return res.data;
// };

// export const deleteLoan = async (id) => {
//   const res = await api.delete(`/loans/${id}`);
//   return res.data;
// };

// // Budget and goals (examples)
// export const getBudgetCategories = async (userId) => {
//   const res = await api.get(`/budget/categories/user/${userId}`);
//   return res.data;
// };

// export const addBudgetCategory = async (category) => {
//   const res = await api.post("/budget/categories", category);
//   return res.data;
// };

// export const deleteBudgetCategory = async (id) => {
//   await api.delete(`/budget/categories/${id}`);
// };

// export const getFinancialGoals = async (userId) => {
//   const res = await api.get(`/goals/user/${userId}`);
//   return res.data;
// };

// export const addFinancialGoal = async (goal) => {
//   const res = await api.post("/goals", goal);
//   return res.data;
// };

// export const deleteFinancialGoal = async (id) => {
//   await api.delete(`/goals/${id}`);
// };
