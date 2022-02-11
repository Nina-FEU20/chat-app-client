import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../../context/AuthContext';
import { getChatName } from '../../utils/ChatUtils';
import Button from '../Button';
import CreateChat from './CreateChat';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import avatar from '../../assets/avatar.png';
import socket from '../../config/socketConfig';

const MyChats = ({}) => {
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
    console.log('Im listening!!');
    socket.on('created chat', (data) => {
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
  }, [chats]);

  return (
    <div
      className={` ${activeChat ? 'hidden' : 'flex'} sm:flex  w-full sm:w-[45%] md:w-[350px] max-w-full bg-whiteOpacity border-r-2 border-pinkgrey `}
    >
      <div className='w-full'>
        <div className='flex justify-between w-full items-end mb-4 p-4'>
          <h3 className='text-2xl font-bold text-teal500'>My Chats</h3>
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
                className={`h-14 2xl:h-16 px-4 cursor-pointer hover:bg-teal100 flex items-center transition ease-in duration-200 border-b border-teal50 ${
                  chat === chats[0] && 'border-t'
                }`}
              >
                <img src={avatar} alt='avatar' className='w-6 h-6 2xl:w-8 2xl:h-8 rounded-full mr-4' />
                <div className=' space-y-1'>
                  <h4 className='text-sm 2xl:text-base'>{getChatName(authUser, chat)}</h4>
                  <p className='text-xs 2xl:text-sm'>
                    <span className='font-semibold'>placeholder:</span> latest message
                  </p>
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
