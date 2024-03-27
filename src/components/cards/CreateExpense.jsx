import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/slices/categoriesSlice";
import { getCategories } from "../../redux/actions/categoriesActions";
import { BsSearch } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import toast from "react-hot-toast";
import api from "../../axios/api";
import { selectUser } from "../../redux/slices/userSlice";

function CreateExpense() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const userDetails = useSelector(selectUser);
  const [expenseDetails, setExpenseDetails] = useState({});
  const [sharedUsers, setSharedUsers] = useState([]);
  const [isShared, setIsShared] = useState(false);
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpenseDetails({
      ...expenseDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!expenseDetails.label) {
        return toast.error("Provide a label for the expense");
      }
      if (expenseDetails.amount < 1) {
        return toast.error("Enter the amount of expense");
      }
      if (!expenseDetails.categoryId) {
        return toast.error("Select a category for expense");
      }
      const res = await api.post("/expense/add", expenseDetails);
      if (isShared && sharedUsers.length) {
        await api.post("/collaborator/add", {
          expenseId: res.data.expense.id,
          users: sharedUsers,
          categoryId:res.data.expense.categoryId
        });
      }
      setExpenseDetails({
        label: "",
        amount: 0,
        categoryId: "",
        isRecurring: false,
      });
      setIsShared(false);
      setSharedUsers([]);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };
  const getCategoriesList = () => {
    dispatch(getCategories());
  };
  const getUsersList = async () => {
    try {
      const res = await api.get("/user/all");
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };
  const handleShareUser = (id) => {
    const isExist = sharedUsers.find((shr) => shr == id);
    let newUsers = [];
    if (isExist) {
      sharedUsers.forEach((user) => {
        if (user != id) {
          newUsers.push(user);
        }
      });
      setSharedUsers(newUsers);
    } else {
      setSharedUsers([...sharedUsers, id]);
    }
  };
  useEffect(() => {
    getCategoriesList();
    getUsersList();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto mt-5 rounded border-2 border-black px-4 py-2 bg-gray-800 text-white "
      >
        <div className="mb-4">
          <label htmlFor="label" className="block ">
            Label
          </label>
          <input
            type="text"
            id="label"
            name="label"
            value={expenseDetails.label}
            onChange={handleChange}
            className="form-input mt-1 block w-full outline-none  text-black px-3 py-1 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block ">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expenseDetails.amount}
            onChange={handleChange}
            className="form-input mt-1 block w-full outline-none  text-black px-3 py-1 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId" className="block ">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={expenseDetails.category}
            onChange={handleChange}
            className="form-select mt-1 block w-full outline-none text-black px-3 py-1 rounded"
            required
          >
            <option value="">Select a category</option>

            {!categories.loading &&
              categories.data.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="isRecurring" className="flex items-center">
            <input
              type="checkbox"
              id="isRecurring"
              name="isRecurring"
              checked={expenseDetails.isRecurring}
              onChange={handleChange}
              className="form-checkbox h-5 w-5  outline-none cursor-pointer  text-black"
            />
            <span className="ml-2 ">Monthly Subscription</span>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="isShared" className="flex items-center">
            <input
              type="checkbox"
              id="isShared"
              name="isShared"
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)}
              className="form-checkbox h-5 w-5  outline-none cursor-pointer  text-black"
            />
            <span className="ml-2 ">Share Expense</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-pink-500 w-full hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Expense
        </button>
      </form>
      {isShared ? (
        <div className={` px-4 py-2 mt-1 transition-all duration-700 `}>
          <div className="bg-gray-800 text-white px-4 py-2">
            <p className="text-xl font-semibold flex items-center gap-1">
              <RiUserSharedLine size={24} /> Share With:
            </p>
            <div className="flex items-center bg-slate-500 justify-between px-3 py-1">
              <input
                type="text"
                className="bg-transparent w-full outline-none"
              />
              <button>
                <BsSearch />
              </button>
            </div>
            <div className="h-[50vh] p-2 overflow-y-auto">
              {users.length ? (
                users.map(
                  (user) =>
                    user.id != userDetails.data.id && (
                      <div
                        onClick={() => handleShareUser(user.id)}
                        className="flex items-center rounded border-2 mb-2 px-4 justify-between cursor-pointer hover:bg-slate-400/20 transition-all duration-300"
                      >
                        <p className="text-lg">{user.email}</p>
                        {sharedUsers.find((shr) => shr == user.id) && (
                          <TiTick size={24} />
                        )}
                      </div>
                    )
                )
              ) : (
                <p className="text-gray-400 text-center">No Users Found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-center text-xl transition-all duration-700 ">
          <p className="text-gray-700 mb-4">
            Please fill out the form below to add a new expense. Enter the label
            for the expense, the amount spent, select the appropriate category,
            and indicate whether it is a monthly auto-pay expense by checking
            the box. Once you've completed the form, click the Submit button to
            save your expense.
          </p>
        </div>
      )}
    </div>
  );
}

export default CreateExpense;
