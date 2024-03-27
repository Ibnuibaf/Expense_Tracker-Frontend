import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../../redux/actions/expensesActions";
import { selectExpenses } from "../../redux/slices/expensesSlice";
import { getCategories } from "../../redux/actions/categoriesActions";
import { selectCategories } from "../../redux/slices/categoriesSlice";

function ExpensesTab() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [search, setSearch] = useState("");
  const getExpensesList = () => {
    dispatch(getExpenses({ search, category: selectedCategory.id }));
  };
  const getCategoriesList = () => {
    dispatch(getCategories());
  };
  const handleCategoryChange = async (cat) => {
    try {
      setSelectedCategory(cat);
      getExpensesList();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getExpensesList();
    getCategoriesList();
  }, [dispatch]);
  return (
    <div className="px-10 py-5">
      <p className="flex items-center text-3xl font-semibold gap-2">
        <RiHistoryFill size={32} /> My Expenses History
      </p>
      <div className="mt-5 ">
        <div className="flex justify-between">
          <div className="w-1/3">
            <div className="w-full bg-gray-700 flex items-center justify-between px-4 py-1 text-white">
              <input
                type="text"
                className="bg-transparent outline-none w-full "
                placeholder="Search expenses.."
                onChange={(e) => setSearch(e.target.value)}
              />
              <BsSearch
                size={24}
                className="cursor-pointer"
                onClick={() => getExpensesList()}
              />
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto bg-gray-900 my-2">
          <button
            className="border-2 border-gray-500 px-4 bg-gray-900 py-2 text-white"
            onClick={() => handleCategoryChange({id:"",name:""})}
          >
            All
          </button>
          {categories.data.map((cat) => (
            <button
              className="border-2 border-gray-500 px-4 bg-gray-900 py-2 text-white"
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {selectedCategory.id && (
          <div>
            <p>
              Selected Category:{" "}
              <span className="font-semibold text-lg">
                {selectedCategory.name}
              </span>
            </p>
          </div>
        )}
        <div className="h-[65vh] overflow-y-auto mt-5">
          {expenses.loading
            ? "Loading"
            : !expenses.data.length
            ? "No Expenses Found."
            : expenses.data.map((expense) => (
                <div
                  key={expense.id}
                  className="border-2 border-gray-950  p-2 mb-3"
                >
                  {expense.isRecurring && (
                    <div className="flex justify-between">
                      <p className="bg-yellow-600 text-white px-4 text-sm rounded">
                        Monthly Pay
                      </p>
                      <p className="text-sm text-pink-700 font-medium">
                        Last Paid:{" "}
                        {expense.lastPay &&
                          new Date(expense.lastPay).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div className="py-2 flex justify-between px-5">
                    <div className="flex items-center gap-4 truncate">
                      <p className="text-pink-700 font-semibold">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                      <p className="">{expense.label}</p>
                    </div>
                    <p className="font-semibold">{expense.category.name}</p>
                    <p>${expense.amount}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default ExpensesTab;
