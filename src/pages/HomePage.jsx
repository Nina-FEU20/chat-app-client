import React, { useEffect } from 'react';
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
      <h1 style={{ display: 'grid', placeContent: 'center', marginTop: '4rem' }}>Welcome to Topics Daily</h1>
    </div>
  );
};

export default HomePage;
