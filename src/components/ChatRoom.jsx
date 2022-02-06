import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getChatName } from '../utils/ChatUtils';
import { AuthState } from '../context/AuthContext';
import Input from './Input';
import Button from './Button';
import MessageForm from './MessageForm';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const { authUser, activeChat } = AuthState('');

  useEffect(() => {
    (async () => {
      if (activeChat) {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/message/${activeChat._id}`, { withCredentials: true });
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [activeChat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(message);

    if (message.length > 0) {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          { content: message, chatId: activeChat._id },
          { withCredentials: true }
        );
        console.log(data);
        setMessages([...messages, data]);
        setMessage('');
      } catch {
        console.log('Could not send message...');
      }
    }
  };

  return (
    <div className={` ${activeChat ? 'block' : 'hidden'} sm:block flex-1  bg-teal60 p-2`}>
      <div className=' h-full relative'>
        {authUser && activeChat ? <h4>{getChatName(authUser, activeChat)}</h4> : <h4>Choose a chat to start!</h4>}
        {messages.length ? (
          messages.map((message) => (
            <div key={message._id}>
              <span>{message.author.username}: </span>
              <span>{message.content}</span>
            </div>
          ))
        ) : (
          <p>No Messages yet</p>
        )}
        <MessageForm message={message} setMessage={setMessage} onClick={(e) => sendMessage(e)} />
      </div>
    </div>
  );
};

export default ChatRoom;
