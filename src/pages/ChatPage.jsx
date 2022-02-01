import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chats from '../components/Chats';
import ChatRoom from '../components/ChatRoom';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);

  const { authUser } = AuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser, navigate]);

  // const getAllUsers = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const { data } = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getSingleUser = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const { data } = await axios.get('http://localhost:5000/api/user/61ee06142ce9392a507e467b', { withCredentials: true });
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>CHATPAGE</h1>

      {/* <button onClick={(e) => getAllUsers(e)}>Get all users</button>
      <button onClick={(e) => getSingleUser(e)}>Get single user</button> */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Chats setActiveChat={setActiveChat} />
        <ChatRoom activeChat={activeChat} />
      </div>
    </div>
  );
};

export default ChatPage;
