import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { AuthState } from '../context/AuthContext';

const Users = ({ setChats, chats }) => {
  const [searchResult, setSearchResult] = useState('');
  const { setActiveChat } = AuthState();

  const handleSearch = async (e) => {
    if (e.target.value) {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/user/search/${e.target.value}`, { withCredentials: true });
        setSearchResult(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResult('');
    }
  };

  const createChat = async (userId) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/chat', { userId: userId }, { withCredentials: true });
      console.log(data);
      setChats([...chats, data]);
      setActiveChat(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h3>Search users</h3>
      <form>
        <DebounceInput minLength={2} debounceTimeout={1000} type='text' onChange={(e) => handleSearch(e)} />
      </form>
      {searchResult &&
        searchResult.map((user) => (
          <div key={user._id} onClick={() => createChat(user._id)}>
            <h4>{user.username}</h4>
          </div>
        ))}
    </div>
  );
};

export default Users;
