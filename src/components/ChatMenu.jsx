import React, { useState, useEffect } from 'react';
import MyChats from './MyChats';
import Users from './Users';
import axios from 'axios';

const ChatMenu = () => {
  const [toggle, setToggle] = useState('MyChats');
  const [chats, setChats] = useState([]);

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
      <div>
        <button onClick={() => setToggle('MyChats')}>My Chats</button>
        <button onClick={() => setToggle('Users')}>Users</button>
      </div>
      {toggle === 'MyChats' ? <MyChats setChats={setChats} chats={chats} /> : <Users setChats={setChats} chats={chats} />}
    </div>
  );
};

export default ChatMenu;
