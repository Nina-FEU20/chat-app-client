import axios from 'axios';
import React from 'react';
import { AuthState } from '../context/AuthContext';
import { getChatName } from '../utils/ChatUtils';

const MyChats = ({ setChats, chats }) => {
  const { authUser, setActiveChat } = AuthState();

  const handleClick = async (chatId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/chat/${chatId}`, { withCredentials: true });
      setActiveChat(data);
    } catch {
      console.log('Could not fetch chat');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>My Chats</h3>
        {authUser &&
          chats &&
          chats.map((chat) => (
            <div key={chat._id} onClick={() => handleClick(chat._id)}>
              <h4>{getChatName(authUser, chat)}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyChats;
