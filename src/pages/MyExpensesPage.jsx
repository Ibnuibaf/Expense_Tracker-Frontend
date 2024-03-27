import React from "react";
import Header from "../components/common/Header";
import ExpensesTab from "../components/tables/ExpensesTab";
import useTokenValidation from "../hooks/useTokenValidation";

function MyExpensesPage() {
  useTokenValidation();
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <ExpensesTab />
      </div>
    </div>
  );
}

export default MyExpensesPage;
