import { AuthState } from '../context/AuthContext';
import React, { useEffect, useState, useRef } from 'react';
import avatar from '../assets/avatar.png';

const Message = ({ message, messages }) => {
  const { authUser } = AuthState();
  const [isAuthor, setIsAuthor] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    if (authUser.id === message.author._id) setIsAuthor(true);
    else setIsAuthor(false);
  }, [message, authUser]);

  return (
    <div className={`${isAuthor ? ' text-right justify-end' : ''} py-2 flex items-end `} ref={messagesEndRef}>
      {!isAuthor && <img src={avatar} alt='' className='w-6 h-6 rounded-full mr-2' />}
      <div className={`${isAuthor ? 'bg-teal200 rounded-bl-xl rounded-t-xl' : 'bg-pink100 rounded-br-xl rounded-t-xl'} p-3 max-w-[70%]`}>
        {!isAuthor && <p className='text-sm font-semibold mb-1'>{message.author.username} </p>}
        <p className=''>{message.content}</p>
      </div>
    </div>
  );
};

export default Message;
