import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/AuthContext';
import { getChatName } from '../utils/ChatUtils';
import CreateGroupChat from './CreateGroupChat';

const MyChats = () => {
  const { authUser, setActiveChat } = AuthState();
  const [chats, setChats] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = async (chatId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/chat/${chatId}`, { withCredentials: true });
      setActiveChat(data);
    } catch {
      console.log('Could not fetch chat');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/chat', { withCredentials: true });
        console.log(data);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setChats([]); // To remove warning "Cant perform a react state update"
    };
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex' }}>
          <h3>My Chats</h3>
          <button onClick={() => setModalOpen(!isModalOpen)}>Create new Chat</button>
        </div>

        {authUser &&
          chats &&
          chats.map((chat) => (
            <div key={chat._id} onClick={() => handleClick(chat._id)}>
              <h4>{getChatName(authUser, chat)}</h4>
            </div>
          ))}
      </div>
      {isModalOpen && <CreateGroupChat setModalOpen={setModalOpen} setChats={setChats} chats={chats} />}
    </div>
  );
};

export default MyChats;
