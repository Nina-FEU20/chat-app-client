import React, { useState } from 'react';
import Modal from '../Modal';
import Users from './Users';
import axios from 'axios';
import { AuthState } from '../../context/AuthContext';
import Button from '../Button';
import { MdClose } from 'react-icons/md';
import Input from '../Input';

const CreateChat = ({ setModalOpen, setChats, chats }) => {
  const [users, setUsers] = useState([]);
  const [chatName, setChatName] = useState([]);

  const { setActiveChat } = AuthState();

  const createChat = async () => {
    try {
      console.log(users.length);
      if (users.length === 0) return;

      if (users.length === 1) {
        const { data } = await axios.post('http://localhost:5000/api/chat', { user: users[0] }, { withCredentials: true });

        const chatExists = checkExists(chats, data);
        if (!chatExists) setChats([data, ...chats]);

        setActiveChat(data);
      }

      if (users.length > 1) {
        const { data } = await axios.post('http://localhost:5000/api/chat/group', { users: users, name: chatName }, { withCredentials: true });

        setChats([data, ...chats]);
        setActiveChat(data);
      }

      setUsers([]);
      setModalOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateUsers = (user) => {
    const isUserAlreadyChosen = checkExists(users, user);
    if (!isUserAlreadyChosen) setUsers([...users, user]);
  };

  const checkExists = (state, newData) => {
    return state.some(function (s) {
      return s._id === newData._id;
    });
  };

  const handleRemoveFromUsers = (removedUser) => {
    const updatedArray = users.filter((user) => user._id !== removedUser._id);
    setUsers(updatedArray);
  };

  return (
    <Modal setModalOpen={setModalOpen}>
      <div className='w-[24rem] min-h-[10rem] flex flex-col'>
        <div>
          <h3 className='text-center text-2xl text-teal500 mb-2'>Create Chat</h3>
        </div>
        <Users setUsers={setUsers} updateUsers={updateUsers} />
        <ul className='flex flex-wrap pl-1 mb-4'>
          {users.map((user) => (
            <li key={user._id} className='flex items-center bg-teal200 w-fit py-1 px-2 rounded-md mt-2 mr-2'>
              <span className='pr-2'>{user.username}</span>
              <button className='' onClick={() => handleRemoveFromUsers(user)}>
                <MdClose />
              </button>
            </li>
          ))}
        </ul>
        {users.length > 1 && (
          <Input
            name='chatname'
            type='text'
            value={chatName}
            placeholder='Add a name for your chat!'
            label='Group Name'
            onChange={(e) => setChatName(e.target.value)}
          />
        )}
        <Button onClick={createChat} classnames='mt-10' filled='true'>
          Create Chat
        </Button>
      </div>
    </Modal>
  );
};

export default CreateChat;
