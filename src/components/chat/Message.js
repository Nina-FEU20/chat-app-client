import { AuthState } from '../../context/AuthContext';
import React, { useEffect, useState, useRef } from 'react';
import avatar from '../../assets/avatar.png';
import { format, formatDistanceStrict } from 'date-fns';

const Message = ({ message, messages }) => {
  const { authUser } = AuthState();
  const [isAuthor, setIsAuthor] = useState(false);

  // const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [message]);

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
    <div className={`${isAuthor ? ' justify-end' : ''} py-2 flex items-end `} key={message._id}>
      {!isAuthor && <img src={avatar} alt='' className='w-8 h-8 rounded-full mr-2' />}
      <div
        className={`${
          isAuthor ? 'bg-teal150 dark:bg-teal300 rounded-bl-xl rounded-t-xl' : 'bg-pinkLight dark:bg-pink300 rounded-br-xl rounded-t-xl'
        } py-2 px-4 md:max-w-[70%] max-w-[90%] min-w-[12rem] flex flex-col shadow-md`}
      >
        <div className='flex items-center mb-1 '>
          <p className='text-sm font-semibold pr-2 text-teal600 dark:text-white'>{!isAuthor ? message.author.username : 'You'}</p>
          <p className='text-xs pr-2 text-right text-teal500 dark:text-white'>
            {isMoreThanOneDayAgo()
              ? format(new Date(message.createdAt), 'yyyy-MM-dd HH:mm')
              : formatDistanceStrict(new Date(message.createdAt), new Date()) + ' ago'}
          </p>
        </div>

        <p className='text-teal600 text-sm dark:text-white'>{message.content}</p>
      </div>
    </div>
  );
};

export default Message;
