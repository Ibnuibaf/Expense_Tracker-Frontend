import React from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import Header from "../components/common/Header";
import CategoriesTab from "../components/tables/CategoriesTab";

function CategoriesPage() {
  useTokenValidation();
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <CategoriesTab />
      </div>
    </div>
  );
}

export default CategoriesPage;
