import React, { useEffect } from 'react';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatRoom from '../components/chat/ChatRoom';
import MyChats from '../components/chat/MyChats';
import Nav from '../components/Nav';

const ChatPage = () => {
  const { authUser } = AuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser, navigate]);

  return (
    <>
      <div className='container mx-auto max-w-[1980px] h-full min-h-72 max-h-screen shadow-md shadow-teal200 flex flex-col'>
        <Nav classnames={`px-6 border-b-2 border-teal200`} />
        <div className='flex space-between flex-1'>
          <MyChats />
          <ChatRoom />
        </div>
      </div>
      <footer className='max-h-screen min-h-[500px] 2xl:min-h-[1000px] top-0 absolute bg-[url("/src/assets/waves-transparent.svg")] bg-bottom h-full bg-no-repeat bg-cover -z-40 w-full'></footer>
    </>
  );
};

export default ChatPage;
