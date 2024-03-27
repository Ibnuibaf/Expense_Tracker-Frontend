import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogoutValidation() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.error("User already loggedIn");
      return navigate("/dashboard");
    }
  }, [navigate]);

  return null;
}

export default useLogoutValidation;
