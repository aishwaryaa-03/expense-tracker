import { useState, useEffect } from "react";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import PieChartComponent from "./components/PieChartComponent";
import LineChartComponent from "./components/LineChartComponent";

function App() {
  const [expenses, setExpenses] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses"));
    if (saved) {
      setExpenses(saved);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add expense
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Delete expense
  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  // Total
  const total = expenses.reduce((sum, item) => {
    return sum + Number(item.amount);
  }, 0);

  // 📊 PIE CHART DATA (category-wise)
  const categoryMap = {};

  expenses.forEach((item) => {
    const category = item.title;

    if (categoryMap[category]) {
      categoryMap[category] += Number(item.amount);
    } else {
      categoryMap[category] = Number(item.amount);
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // 📈 LINE CHART DATA (trend)
  const lineData = expenses.map((item, index) => ({
    month: `T${index + 1}`,
    expense: Number(item.amount),
  }));

  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <ExpenseForm addExpense={addExpense} />

      <h2>Total: ₹{total}</h2>

      {/* CHARTS */}
      {expenses.length > 0 && (
        <div className="charts">
          <PieChartComponent data={pieData} />
          <LineChartComponent data={lineData} />
        </div>
      )}

      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        expenses.map((item, index) => (
          <div className="expense-item" key={index}>
            <p>
              {item.title} - ₹{item.amount}
            </p>

            <button
              className="delete-btn"
              onClick={() => deleteExpense(index)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;