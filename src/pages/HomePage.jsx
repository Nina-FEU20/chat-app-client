import React, { useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = AuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) navigate('/chat');
  }, [authUser, navigate]);

  return (
    <div>
      <Login />
      <Signup />
    </div>
  );
};

export default HomePage;
