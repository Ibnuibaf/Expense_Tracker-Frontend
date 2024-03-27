import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';

const useTokenValidation = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Login in to your account")
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default useTokenValidation