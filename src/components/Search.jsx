import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';

const Search = () => {
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = async (e) => {
    if (e.target.value) {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/user/search/${e.target.value}`, { withCredentials: true });
        console.log(data);
        setSearchResult(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h3>Search users</h3>
      <form>
        <DebounceInput minLength={2} debounceTimeout={1000} type='text' onChange={(e) => handleSearch(e)} />
      </form>
      {searchResult && searchResult.map((user) => <div key={user._id}>{user.username}</div>)}
    </div>
  );
};

export default Search;
