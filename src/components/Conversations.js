import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/AuthContext';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const { authUser, setAuthUser } = AuthState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/chat', { withCredentials: true });
        console.log(data);
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setConversations([]); // To remove warning "Cant perform a react state update"
    };
  }, []);

  const getChatName = (chatName, userOne, userTwo) => {
    if (chatName !== '') return chatName;
    if (userOne._id === authUser._id) {
      return userOne.username;
    } else return userTwo.username;
  };

  const handleClick = async (chatId) => {
    console.log('clicked');
    const { data } = await axios.get(`http://localhost:5000/api/chat/${chatId}`, { withCredentials: true });
    console.log(data);
  };

  return (
    <div>
      <h3>Conversations</h3>
      {conversations &&
        conversations.map((conv) => (
          <div key={conv._id} onClick={() => handleClick(conv._id)}>
            <h5>{getChatName(conv.chatName, conv.users[0], conv.users[1])}</h5>
          </div>
        ))}
    </div>
  );
};

export default Conversations;
