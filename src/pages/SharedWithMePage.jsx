import React from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import Header from "../components/common/Header";
import SharedExpenseTab from "../components/tables/SharedExpenseTab";

function SharedWithMePage() {
  useTokenValidation();
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <SharedExpenseTab />
      </div>
    </div>
  );
}

export default SharedWithMePage;
