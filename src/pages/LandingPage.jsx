import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogoutValidation from "../hooks/useLogoutValidation";

function LandingPage() {
  useLogoutValidation()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <section className="bg-gray-900 text-white py-16 h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-8">
            Track Your Expenses with Ease
          </h1>
          <p className="text-lg text-center mb-8">
            Manage your finances efficiently with our intuitive expense tracker
            application.
          </p>
          <div className="flex justify-center">
            <Link to={'/login'} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
              Get Started
            </Link>
            <button className="bg-transparent hover:bg-gray-800 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
