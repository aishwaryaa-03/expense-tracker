import { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import PieChartComponent from "./components/PieChartComponent";
import LineChartComponent from "./components/LineChartComponent";
import jsPDF from "jspdf";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [budget, setBudget] = useState(5000);

  // LOAD DATA
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses"));

    if (saved) {
      setExpenses(saved);
    }
  }, []);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ADD EXPENSE
  const addExpense = (expense) => {
    const today = new Date().toISOString().split("T")[0];

    setExpenses([
      ...expenses,
      {
        ...expense,
        date: today
      }
    ]);
  };

  // DELETE EXPENSE
  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // FILTER LOGIC
  const todayDate = new Date();

  const filteredExpenses = expenses.filter((item) => {
    const itemDate = new Date(item.date);

    // ALL
    if (filter === "ALL") {
      return true;
    }

    // TODAY
    if (filter === "TODAY") {
      return (
        itemDate.toDateString() === todayDate.toDateString()
      );
    }

    // WEEK
    if (filter === "WEEK") {
      const diffTime = todayDate - itemDate;
      const diffDays =
        diffTime / (1000 * 60 * 60 * 24);

      return diffDays >= 0 && diffDays <= 7;
    }

    // MONTH
    if (filter === "MONTH") {
      return (
        itemDate.getMonth() === todayDate.getMonth() &&
        itemDate.getFullYear() === todayDate.getFullYear()
      );
    }

    return true;
  });

  // CATEGORY TOTALS
  const categoryTotals = filteredExpenses.reduce(
    (acc, item) => {
      const cat = item.category || "Other";

      acc[cat] =
        (acc[cat] || 0) + Number(item.amount);

      return acc;
    },
    {}
  );

  // MONTHLY SPENDING
  const monthlySpent = expenses.reduce(
    (sum, item) => {
      const d = new Date(item.date);

      if (
        d.getMonth() === todayDate.getMonth() &&
        d.getFullYear() === todayDate.getFullYear()
      ) {
        return sum + Number(item.amount);
      }

      return sum;
    },
    0
  );

  const remaining = budget - monthlySpent;

  const isOverBudget = remaining < 0;

  // PDF EXPORT
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Expense Report", 10, 10);

    let y = 20;

    expenses.forEach((item) => {
      doc.text(
        `${item.date} | ${item.title} | ₹${item.amount} | ${item.category}`,
        10,
        y
      );

      y += 10;
    });

    doc.save("expense-report.pdf");
  };

  return (
    <div className="container">

      <h1>💰 Expense Tracker</h1>

      {/* FORM */}
      <ExpenseForm addExpense={addExpense} />

      {/* BUDGET */}
      <div className="budget-box">

        <h3>💰 Monthly Budget</h3>

        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(Number(e.target.value))
          }
        />

        <div
          className={`budget-status ${
            isOverBudget ? "danger" : ""
          }`}
        >
          <p>Spent: ₹{monthlySpent}</p>

          <p>Remaining: ₹{remaining}</p>

          {isOverBudget && (
            <p
              style={{
                color: "red",
                fontWeight: "bold"
              }}
            >
              ⚠ Budget Exceeded!
            </p>
          )}
        </div>

      </div>

      {/* FILTERS */}
      <div className="filters">

        <button onClick={() => setFilter("ALL")}>
          All
        </button>

        <button onClick={() => setFilter("TODAY")}>
          Today
        </button>

        <button onClick={() => setFilter("WEEK")}>
          Week
        </button>

        <button onClick={() => setFilter("MONTH")}>
          Month
        </button>

      </div>

      {/* PDF BUTTON */}
      <button onClick={exportPDF}>
        📄 Download PDF
      </button>

      {/* PIE CHART */}
      <h2>📊 Category Breakdown</h2>

      {Object.keys(categoryTotals).length === 0 ? (
        <p>No data available</p>
      ) : (
        <PieChartComponent data={categoryTotals} />
      )}

      {/* LINE CHART */}
      <h2>📈 Spending Trend</h2>

      <LineChartComponent expenses={filteredExpenses} />

      {/* EXPENSE LIST */}
      <h2>Expenses</h2>

      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        filteredExpenses.map((item, index) => (
          <div
            key={index}
            className="expense-item"
          >
            <p>
              {item.title} - ₹{item.amount} - 📅{" "}
              {item.date} - {item.category}
            </p>

            <button
              onClick={() =>
                deleteExpense(index)
              }
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