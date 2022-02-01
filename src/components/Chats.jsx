import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/AuthContext';
import { getChatName } from '../utils/ChatUtils';
import Users from './Users';

const Chats = ({ setActiveChat }) => {
  const [chats, setChats] = useState([]);
  const { authUser, setAuthUser } = AuthState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/chat', { withCredentials: true });

        setChats(data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setChats([]); // To remove warning "Cant perform a react state update"
    };
  }, []);

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

      <Users setChats={setChats} chats={chats} />
    </div>
  );
};

export default Chats;
