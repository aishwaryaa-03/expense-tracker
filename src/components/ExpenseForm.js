import { useState } from "react";

function ExpenseForm({ addExpense }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense({
      title,
      amount
    });

    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter expense"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">
        Add Expense
      </button>

    </form>
  );
}

export default ExpenseForm;
