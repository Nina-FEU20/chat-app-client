import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../../context/AuthContext';
import { getChatName } from '../../utils/ChatUtils';
import Button from '../Button';
import CreateChat from './CreateChat';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import avatar from '../../assets/avatar.png';
import socket from '../../config/socketConfig';

const MyChats = () => {
  const { authUser, setActiveChat, activeChat } = AuthState();
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
    socket.on('created chat', (data) => {
      console.log(data);
      setChats((chats) => [data, ...chats]);
    });
  }, []);

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

  useEffect(() => {
    chats.forEach((chat) => socket.emit('join room', chat._id, authUser));
  }, [chats, authUser]);

  return (
    <div
      className={` ${
        activeChat ? 'hidden' : 'flex'
      } sm:flex  w-full sm:w-[45%] md:w-[350px] max-w-full bg-whiteOpacity dark:bg-teal550Transparent border-r-2 border-pinkgrey `}
    >
      <div className='w-full'>
        <div className='flex justify-between w-full items-end mb-4 p-4'>
          <h3 className='text-2xl font-bold text-teal500 dark:text-white'>My Chats</h3>
          <Button classnames='max-w-[45%] flex justify-center px-2' onClick={() => setModalOpen(!isModalOpen)}>
            <span className='text-sm pr-1'>New Chat</span>
            <BiMessageRoundedAdd className='text-xl' />
          </Button>
        </div>

        <div className='overflow-y-scroll scroll-bar max-h-[calc(100vh-11.15rem)] '>
          {authUser &&
            chats &&
            chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleClick(chat._id)}
                className={`dark:text-white dark:hover:bg-teal400 h-14 2xl:h-16 px-4 cursor-pointer hover:bg-teal100 flex items-center transition ease-in duration-200 rounded-md ml-1 mb-1 
               ${activeChat && chat._id === activeChat._id && 'bg-teal100 dark:bg-teal400'}`}
              >
                <img src={avatar} alt='avatar' className='w-7 h-7 2xl:w-8 2xl:h-8 rounded-full mr-4' />
                <div className=' space-y-1'>
                  <h4 className='text-sm 2xl:text-base'>{getChatName(authUser, chat)}</h4>
                  {/* FUTURE: <p className='text-xs 2xl:text-sm'>
                    <span className='font-semibold'>placeholder:</span> latest message
                  </p> */}
                </div>
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && <CreateChat setModalOpen={setModalOpen} setChats={setChats} chats={chats} />}
    </div>
  );
};

export default MyChats;
