import React, { useState, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import avatar from '../assets/avatar.png';

const Users = ({ updateUsers, users }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState();

  useEffect(() => {
    (async () => {
      if (query) {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/user/search/${query}`, { withCredentials: true });
          setSearchResult(data);
        } catch (err) {
          console.log(err);
        }
      } else {
        setSearchResult('');
      }
    })();
  }, [query]);

  console.log();

  const handleClick = (user) => {
    setSearchResult('');
    updateUsers(user);
    setQuery('');
  };

  return (
    <div className='relative'>
      <h3 className='pb-2 text-teal400'>Add users</h3>
      <form>
        <DebounceInput
          minLength={2}
          debounceTimeout={1000}
          type='text'
          placeholder='Search Users'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='rounded-lg flex-1 border border-teal300 w-full py-2 px-4 bg-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal200 focus:border-teal200'
        />
      </form>
      <ul className={`${searchResult.length > 0 ? 'flex flex-col' : 'hidden'} absolute bg-white w-full rounded-md p-2 mt-2 shadow-xl`}>
        {searchResult &&
          searchResult.map((user) => (
            <li
              key={user._id}
              onClick={() => handleClick(user)}
              className='py-2 px-4 cursor-pointer hover:bg-teal200 rounded-md flex items-center transition ease-in duration-200 '
            >
              <img src={avatar} alt='avatar' className='w-7 h-7 rounded-full mr-3 ' />
              <h4>{user.username}</h4>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
