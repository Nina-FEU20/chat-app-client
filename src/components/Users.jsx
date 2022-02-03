import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';

const Users = ({ updateUsers }) => {
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
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

  return (
    <div>
      <h3>Search users</h3>
      <form>
        <DebounceInput minLength={2} debounceTimeout={1000} type='text' onChange={(e) => handleSearch(e)} />
      </form>
      {searchResult &&
        searchResult.map((user) => (
          <div key={user._id} onClick={() => updateUsers(user)}>
            <h4>{user.username}</h4>
          </div>
        ))}
    </div>
  );
};

export default Users;
