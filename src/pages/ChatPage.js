import React, { useEffect } from 'react';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { authUser, setAuthUser } = AuthState();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setAuthUser(null);
  };

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser, navigate]);

  return (
    <div>
      <h1>CHAT</h1>
      <button onClick={handleSignOut}>Log out</button>
    </div>
  );
};

export default ChatPage;
