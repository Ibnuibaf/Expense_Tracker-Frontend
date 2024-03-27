import React from "react";
import { Link } from "react-router-dom";
import { TbTableShare } from "react-icons/tb";
import { RiUserSharedLine } from "react-icons/ri";
import { BsPlusSquare } from "react-icons/bs";

function DashboardBtns() {
  return (
    <div className="flex justify-between text-white my-2 ">
      <Link to={'/add-expense'} className="bg-pink-700 hover:bg-pink-600 px-4 py-1   flex items-center gap-1 rounded-r-md">
        <BsPlusSquare size={24}/> <span className="hover:pl-6 transition-all duration-300">Add Expense</span>
      </Link>
      <div className="flex gap-2">
        <Link
          className="bg-slate-800 hover:bg-slate-950 transition-all duration-300 rounded-md px-2 flex items-center gap-1"
          to={"/my-expenses"}
        >
          <TbTableShare size={24} /> Expenses
        </Link>
        <Link
          className="bg-slate-800 hover:bg-slate-950 transition-all duration-300 rounded-md px-2  flex items-center gap-1"
          to={"/categories"}
        >
          <TbTableShare size={24} /> Categories
        </Link>
        <Link
          className="bg-slate-800 hover:bg-slate-950 transition-all duration-300 rounded-md px-2  flex items-center gap-1"
          to={"/shared-with-me"}
        >
          <RiUserSharedLine size={24} /> Shared with Me
        </Link>
      </div>
    </div>
  );
}

export default DashboardBtns;
