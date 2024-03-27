import React from "react";

function Charts() {
  return (
    <div className=" border-2 border-gray-800 rounded-lg shadow-lg shadow-gray-700 bg-white">
      <p className="text-center text-3xl font-semibold">Expense Analytics</p>
      <div className=" grid grid-cols-1 lg:grid-cols-2 p-4 text-white gap-4">
        <div className="h-96 bg-gray-700 rounded-lg">Chart</div>
        <div className="h-96  bg-gray-700 rounded-lg">expense</div>
      </div>
    </div>
  );
}

export default Charts;
