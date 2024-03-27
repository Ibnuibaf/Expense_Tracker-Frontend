import React from "react";
import Header from "../components/common/Header";
import CreateExpense from "../components/cards/CreateExpense";
import useTokenValidation from "../hooks/useTokenValidation";

function AddExpensePage() {
  useTokenValidation();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-5 py-3">
        <p className="text-3xl font-semibold">Add New Expense</p>
        <CreateExpense />
      </div>
    </div>
  );
}

export default AddExpensePage;
