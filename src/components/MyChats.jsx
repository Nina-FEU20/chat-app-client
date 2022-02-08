import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/AuthContext';
import { getChatName } from '../utils/ChatUtils';
import Button from './Button';
import CreateChat from './CreateChat';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import avatar from '../assets/avatar.png';

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

  return (
    <div
      className={` ${activeChat ? 'hidden' : 'flex'} sm:flex  w-full sm:w-[45%] md:w-[320px] max-w-full bg-whiteOpacity border-r-2 border-teal200`}
    >
      <div className='w-full'>
        <div className='flex justify-between w-full items-end mb-4 p-4'>
          <h3 className='text-2xl font-bold '>My Chats</h3>
          <Button classnames='max-w-[45%] flex justify-center px-2' onClick={() => setModalOpen(!isModalOpen)}>
            <span className='text-sm pr-1'>New Chat</span>
            <BiMessageRoundedAdd className='text-xl' />
          </Button>
        </div>

        {authUser &&
          chats &&
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleClick(chat._id)}
              className='py-2 px-4 cursor-pointer hover:bg-teal200 rounded-md flex items-center transition ease-in duration-200 '
            >
              <img src={avatar} alt='avatar' className='w-7 h-7 rounded-full mr-3 ' />
              <div>
                <h4>{getChatName(authUser, chat)}</h4>
                <p className='text-sm'>
                  <span className='font-bold'>placeholder:</span> latest message
                </p>
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && <CreateChat setModalOpen={setModalOpen} setChats={setChats} chats={chats} />}
    </div>
  );
};

export default MyChats;
