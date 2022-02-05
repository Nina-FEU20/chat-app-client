import React, { useEffect } from 'react';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom';

import MyChats from '../components/MyChats';

const ChatPage = () => {
  const { authUser } = AuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser, navigate]);

  return (
    <div className='container mx-auto'>
      <div className=''></div>
      <h1 className=''>CHATPAGE</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <MyChats />
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatPage;
