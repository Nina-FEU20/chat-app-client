import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/AuthContext';
import { getChatName } from '../utils/ChatUtils';

const Conversations = ({ setActiveChat }) => {
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
      <h3>Conversations</h3>
      {authUser &&
        chats &&
        chats.map((chat) => (
          <div key={chat._id} onClick={() => handleClick(chat._id)}>
            <h5>{getChatName(authUser, chat)}</h5>
            <h5>Chatnamn</h5>
          </div>
        ))}
    </div>
  );
};

export default Conversations;
