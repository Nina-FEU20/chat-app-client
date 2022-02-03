import React, { useState } from 'react';
import Modal from './Modal';
import Users from './Users';
import axios from 'axios';
import { AuthState } from '../context/AuthContext';

const CreateGroupChat = ({ setModalOpen, setChats, chats }) => {
  const [users, setUsers] = useState([]);

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
        const { data } = await axios.post('http://localhost:5000/api/chat/group', { users: users }, { withCredentials: true });

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
      <div>Create Chat</div>
      <Users setUsers={setUsers} updateUsers={updateUsers} />
      {users.map((user) => (
        <div>
          <span>{user.username}</span>
          <i onClick={() => handleRemoveFromUsers(user)}>X</i>
        </div>
      ))}
      <button onClick={createChat}>Create Chat</button>
    </Modal>
  );
};

export default CreateGroupChat;
