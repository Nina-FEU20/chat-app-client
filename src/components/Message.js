import { AuthState } from '../context/AuthContext';
import React, { useEffect, useState, useRef } from 'react';
import avatar from '../assets/avatar.png';
import { format, formatDistanceStrict } from 'date-fns';

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

  const isMoreThanOneDayAgo = () => {
    const hours = Math.abs(new Date() - new Date(message.createdAt)) / 36e5;
    if (hours > 24) return true;
    else return false;
  };

  isMoreThanOneDayAgo();

  return (
    <div className={`${isAuthor ? ' justify-end' : ''} py-2 flex items-end `} ref={messagesEndRef}>
      {!isAuthor && <img src={avatar} alt='' className='w-8 h-8 rounded-full mr-2' />}
      <div
        className={`${
          isAuthor ? 'bg-teal200 rounded-bl-[2rem] rounded-t-xl' : 'bg-pink100 rounded-br-[2rem] rounded-t-xl'
        } p-3 max-w-[70%] min-w-[10rem] flex flex-col`}
      >
        {!isAuthor && <p className='text-sm font-semibold mb-1'>{message.author.username} </p>}
        <p className='mb-1'>{message.content}</p>

        <p className='text-xs pr-2 text-right'>
          {isMoreThanOneDayAgo()
            ? format(new Date(message.createdAt), 'yyyy-MM-dd hh:mm')
            : formatDistanceStrict(new Date(message.createdAt), new Date()) + ' ago'}
        </p>
      </div>
    </div>
  );
};

export default Message;
