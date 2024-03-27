import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCollaborations } from "../../redux/slices/collaborationsSlice";
import { selectCategories } from "../../redux/slices/categoriesSlice";
import { getCollaborations } from "../../redux/actions/collaborationsActions";
import { getCategories } from "../../redux/actions/categoriesActions";
import toast from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";

function SharedExpenseTab() {
  const dispatch = useDispatch();
  const collaborations = useSelector(selectCollaborations);
  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const getCollaborationsList = () => {
    dispatch(getCollaborations({  category: selectedCategory.id }));
  };
  const getCategoriesList = () => {
    dispatch(getCategories());
  };
  const handleCategoryChange = async (cat) => {
    try {
      setSelectedCategory(cat);
      getCollaborationsList();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCollaborationsList();
    getCategoriesList();
  }, [dispatch]);
  return (
    <div className="px-10 py-5">
      <p className="flex items-center text-3xl font-semibold gap-2">
        <RiUserSharedLine size={32} /> Expenses Shared With Me
      </p>
      <div className="mt-5 ">
        <div className="flex overflow-x-auto bg-gray-900 my-2">
          <button
            className="border-2 border-gray-500 px-4 bg-gray-900 py-2 text-white"
            onClick={() => handleCategoryChange({ id: "", name: "" })}
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
          {collaborations.loading
            ? "Loading"
            : !collaborations.data.length
            ? "No Shared Expense Found."
            : collaborations.data.map((collab) => (
                <div
                  key={collab.id}
                  className="border-2 border-gray-950  p-2 mb-3"
                >
                  {collab.expense.isRecurring && (
                    <div className="flex justify-between">
                      <p className="bg-yellow-600 text-white px-4 text-sm rounded">
                        Monthly Pay
                      </p>
                      <p className="text-sm text-pink-700 font-medium">
                        Last Paid:{" "}
                        {collab.expense.lastPay &&
                          new Date(collab.expense.lastPay).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div className="py-2 flex justify-between px-5">
                    <div className="flex items-center gap-4 truncate">
                      <p className="text-pink-700 font-semibold">
                        {new Date(collab.expense.date).toLocaleDateString()}
                      </p>
                      <p className="">{collab.expense.label}</p>
                    </div>
                    <p className="font-semibold">{collab.category.name}</p>
                    <p>${collab.expense.amount}</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-xs">Shared By: <span className="text-sm font-medium">{collab.sharedUser.email}</span></p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SharedExpenseTab;
