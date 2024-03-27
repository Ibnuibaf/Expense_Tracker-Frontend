import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/slices/categoriesSlice";
import { getCategories } from "../../redux/actions/categoriesActions";
import { MdOutlineCategory } from "react-icons/md";
import api from "../../axios/api";
import toast from "react-hot-toast";
import { getBudgets } from "../../redux/actions/budgetsActions";
import { selectBudgets } from "../../redux/slices/budgetsSlice";

function CategoriesTab() {
  const categories = useSelector(selectCategories);
  const budgets = useSelector(selectBudgets);
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [budgetAmount, setBudgetAmount] = useState(null);
  const getCategoriesList = () => {
    dispatch(getCategories());
  };
  const getBudgetsList = () => {
    dispatch(getBudgets());
  };
  const onHandleBudgetChange = async () => {
    try {
      const res = await api.post("/budget/provide", { amount: budgetAmount, categoryId:selectedBudget });
      toast.success(res.data.message);
      setSelectedBudget(null)
      setBudgetAmount(null)
      getBudgetsList()
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };
  const onHandleSubmit = async () => {
    try {
      if (isUpdate) {
        const res = await api.patch("/category/update", {
          name: categoryName,
          id: isUpdate,
        });
        toast.success(res.data.message);
      } else {
        const res = await api.post("/category/add", { name: categoryName });
        toast.success(res.data.message);
      }
      getCategoriesList();
      setIsUpdate(null);
      setCategoryName("");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getCategoriesList();
    getBudgetsList();
  }, []);
  return (
    <div className="px-10 py-5">
      <div>
        <p className="text-3xl flex items-center gap-1 font-semibold">
          <MdOutlineCategory size={32} /> Expense Categories & Budget
        </p>
      </div>
      <div className="my-3 flex text-white w-1/3">
        <div className="bg-gray-700 px-4 py-2 rounded w-full">
          <p className="text-xl mb-2">Create/Edit Category</p>
          <div className="flex gap-3 justify-between">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="bg-transparent outline-none border-2 border-white px-4 py-1 w-full"
              placeholder="Enter a name for a category"
            />
            <button
              onClick={() => onHandleSubmit()}
              className="bg-pink-700 px-2 rounded-md hover:bg-pink-600"
            >
              {isUpdate ? "Update" : "Add"}
            </button>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-sm text-gray-300">Provide a category Name.</p>
            {categoryName && (
              <button
                className="bg-gray-900 rounded-md text-white px-4 hover:bg-gray-800 transition-all duration-300"
                onClick={() => {
                  setIsUpdate(null);
                  setCategoryName("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div className="h-[60vh] overflow-y-auto grid grid-cols-2 lg:grid-cols-3 gap-2">
          {categories.loading
            ? "Loading.."
            : categories.data.map((cat) => (
                <div className="border-2 border-gray-800 h-max flex justify-between px-4 py-2">
                  <p className="text-lg font-medium truncate">{cat.name}</p>
                  <button
                    className="bg-gray-900 text-white px-4 hover:bg-white hover:text-black font-medium transition-all duration-300"
                    onClick={() => {
                      setIsUpdate(cat.id);
                      setCategoryName(cat.name);
                    }}
                  >
                    edit
                  </button>
                </div>
              ))}
        </div>
        <div className="h-[60vh] px-5">
          <p className="text-2xl font-semibold">My Budgets</p>
          <div className="overflow-y-auto ">
            {categories.loading
              ? "Loading.."
              : categories.data.map((cat) => (
                  <div className="border-2 border-gray-800 h-max flex justify-between px-4 py-2 mb-1">
                    <p className="text-lg  truncate">{cat.name}</p>
                    <div className="flex items-center gap-2">
                      {selectedBudget == cat.id ? (
                        <input
                          type="number"
                          value={budgetAmount}
                          onChange={(e)=>setBudgetAmount(e.target.value)}
                          className="bg-gray-800 px-2 py-0.5 text-white w-52 text-right"
                        />
                      ) : (
                        <p className="text-xl font-semibold bg-gray-700 px-2 py-0.5 text-white w-52 text-right">
                          {budgets.data.find(
                            (budget) => budget.categoryId === cat.id
                          )?.amount || "Nill"}
                        </p>
                      )}
                      {selectedBudget == cat.id ? (
                        <button
                          className="bg-gray-900 text-white px-4 hover:bg-white hover:text-black font-medium transition-all duration-300"
                          onClick={() => {
                            onHandleBudgetChange();
                          }}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="bg-gray-900 text-white px-4 hover:bg-white hover:text-black font-medium transition-all duration-300"
                          onClick={() => {
                            setSelectedBudget(cat.id);
                            setBudgetAmount( budgets.data.find(
                                (budget) => budget.categoryId === cat.id
                              )?.amount || 0)
                          }}
                        >
                          Change
                        </button>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesTab;
