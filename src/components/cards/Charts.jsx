import React, { useEffect, useState } from "react";
import api from "../../axios/api";
import toast from "react-hot-toast";
import { getBudgets } from "../../redux/actions/budgetsActions";
import { selectBudgets } from "../../redux/slices/budgetsSlice";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function Charts() {
  const dispatch = useDispatch();
  const budgets = useSelector(selectBudgets);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const getBudgetsList = () => {
    dispatch(getBudgets());
  };
  const getChartData = async () => {
    try {
      const response = await api.get("/category/all");
      const categories = response.data.categories;
      let categoriesNames = [];
      let expenses = [];
      const res = await api.get("/expense/category-analyse");
      categories.forEach((cat) => {
        categoriesNames.push(cat.name);
        const categoryExist = res.data.totalExpenses.find(
          (exp) => exp.categoryId == cat.id
        );
        categoryExist
          ? expenses.push(categoryExist.totalAmount)
          : expenses.push(0);
      });
      setCategoriesList(categoriesNames);
      setCategoryExpenses(expenses);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getBudgetsList();
    getChartData();
  }, []);
  const expenseData = {
    labels: categoriesList,
    datasets: [
      {
        label: "Categories Total Expense Amount",
        data: categoryExpenses,
        backgroundColor: "rgb(125 211 252)",
        borderColor: "rgb(190 24 93)",
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Expenses by Category",
        color: "white",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  return (
    <div className=" border-2 border-gray-800 rounded-lg shadow-lg shadow-gray-700 bg-white">
      <p className="text-center text-3xl font-semibold">Expense Analytics</p>
      <div className=" grid grid-cols-1 lg:grid-cols-2 p-4 text-white gap-4">
        <div className="h-96 bg-gray-700 rounded-lg">
          <div className="p-2">
            <div className="border p-2 h-full w-full">
              <Line data={expenseData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="h-96  bg-gray-700 rounded-lg p-4">
          <p className="mb-2 text-lg font-medium">My-Budgets</p>
          <div className="h-[45vh] overflow-y-auto grid grid-cols-2 gap-2">
            {budgets.loading
              ? "Loading.."
              : budgets.data.map((budget) => (
                  <div className="border-2 border-gray-800 h-max flex justify-between px-4 py-2 items-center">
                    <p className="text-lg font-medium truncate">
                      {budget.category.name}
                    </p>
                    <p className="text-lg font-medium text-pink-600">
                      $ {budget.amount}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
