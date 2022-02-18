import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { getChatName } from '../../utils/ChatUtils';
import { AuthState } from '../../context/AuthContext';
import MessageForm from './MessageForm';
import Message from './Message';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Button from '../Button';

import socket from '../../config/socketConfig';

const ChatRoom = ({ chats }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  const { authUser, setActiveChat, activeChat } = AuthState();
  const activeChatRef = React.useRef(activeChat);

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

    activeChatRef.current = activeChat;
  }, [activeChat]);

  useEffect(() => {
    socket.on('new message', (msg) => {
      if (activeChatRef.current && activeChatRef.current._id === msg.chat._id) {
        setMessages((messages) => [...messages, msg]);
      } else {
        if (msg.chat.isGroupChat) {
          const notification = `You recieved a message in ${msg.chat.chatName}`;
          setNotifications((notifications) => [...notifications, notification]);
        } else {
          const notification = `You recieved a message from ${msg.author.username}`;
          setNotifications((notifications) => [...notifications, notification]);
        }
      }
    });

    return () => setNotifications([]);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.length > 0) {
      const newMessage = {
        author: authUser.id,
        content: message,
        chat: activeChat._id,
      };
      try {
        socket.emit('send message', newMessage);
        setMessage('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={` ${activeChat ? 'block' : 'hidden'} sm:block  flex-1 bg-whiteTeal dark:bg-teal500 `}>
      <div className=' h-full relative'>
        {activeChat && authUser ? (
          <>
            <div className='h-12 2xl:h-16 flex items-center justify-between px-4 border-b-2 border-pinkgrey'>
              <div className=''>
                <Button classnames='sm:hidden flex items-center' onClick={() => setActiveChat('')}>
                  <BiArrowBack className='mr-1' />
                </Button>
              </div>
              <h4 className='text-lg sm:text-xl 2xl:text-2xl font-semibold text-center dark:text-teal100'>{getChatName(authUser, activeChat)}</h4>
              <div className='  sm:mr-1'>
                <AiOutlineInfoCircle className='float-right text-2xl xl:text-3xl text-teal400 dark:text-teal100' />
              </div>
            </div>

            <div className='scroll-bar h-full overflow-y-scroll p-4 2xl:pb-10 max-h-[calc(100vh-12rem)] '>
              {messages.length > 0 ? (
                <div className='flex flex-col justify-end min-h-full'>
                  {messages.map((message) => (
                    <Message message={message} key={message._id} />
                  ))}
                </div>
              ) : (
                <div className='flex justify-center min-h-full items-center'>
                  <p className='text-3xl font-semibold text-center dark:text-teal100'>No Messages yet</p>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            <MessageForm message={message} setMessage={setMessage} onChange={(e) => setMessage(e.target.value)} onClick={(e) => sendMessage(e)} />
          </>
        ) : (
          <div className='h-full flex justify-center items-center'>
            <h4 className='text-3xl font-semibold flex-1 text-center dark:text-teal100'>Click on a chat to start!</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
