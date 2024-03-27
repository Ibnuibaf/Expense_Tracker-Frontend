import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../redux/actions/userActions";
import { selectUser } from "../../redux/slices/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const getUserDetails = () => {
    dispatch(getUser());
  };
  useEffect(() => {
    getUserDetails();
  }, [dispatch]);
  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div>
        <Link to={'/dashboard'} className="text-2xl font-bold">Expense Tracker</Link>
      </div>
      <div className="flex items-center gap-5">
        <p className=" bg-slate-700 px-4 py-1 rounded-md hover:text-lg transition-all duration-300 flex items-center gap-1">
          <img
            className="h-6 w-6 invert"
            src="https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png-300x300.png"
            alt=""
          />
          {user.laoding ? "Loading" : user.data.name}
        </p>
        <button
          onClick={() => logoutUser()}
          className="text-sm px-4 py-2 rounded bg-red-500 hover:bg-red-600 focus:outline-none ml-4"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
