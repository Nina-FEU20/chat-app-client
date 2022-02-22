import React, { useState, useEffect } from 'react';
import { AuthState } from '../context/AuthContext';
import axios from 'axios';
import { BsChatDotsFill } from 'react-icons/bs';
import avatar from '../assets/avatar.png';
import Button from './Button';
import AccountModal from './AccountModal';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const Nav = ({ classnames }) => {
  const [open, setOpen] = useState(false);
  const { authUser, setAuthUser } = AuthState();
  const [darkMode, setDarkMode] = useState(false);
  const toggleClass = ' transform translate-x-6';

  useEffect(() => {
    console.log('hey');
    const root = document.getElementById('root');

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5000/api/user/logout', { user: authUser }, { withCredentials: true });
      console.log(data);
      localStorage.clear();
      setAuthUser(null);
    } catch (err) {
      console.log(err);
    }

    setAuthUser(null);
  };

  return (
    <div className={`container mx-auto max-w-[1980px] dark:bg-teal550 ${classnames}`}>
      <div className='flex justify-between items-center py-2 2xl:py-4'>
        <div className='flex items-center'>
          <BsChatDotsFill className='text-teal200 text-5xl' />
          <h2 className='text-base pl-2 sm:text-xl sm:text-2xl dark:text-white'>ChatDaily</h2>
        </div>
        {authUser ? (
          <div className='flex space-x-2 sm:space-x-4 items-center'>
            <div
              className='w-14 h-7 flex items-center bg-teal200 dark:bg-teal400 rounded-full p-1 cursor-pointer relative -mr-2 sm:mr-0'
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            >
              <BsFillMoonStarsFill className='absolute left-2 text-teal500  ' />
              <BsFillSunFill className='absolute right-2 dark:text-yellow' />
              {/* Switch */}
              <div
                className={
                  'bg-teal400 dark:bg-teal600 w-6 h-6  rounded-full shadow-md transform duration-300 ease-in-out' + (darkMode ? null : toggleClass)
                }
              ></div>
            </div>
            <div className='flex items-center space-x-2'>
              <p className='hidden sm:block font-semibold dark:text-white'>{authUser.username}</p>
              <img src={avatar} alt='avatar' className='h-10 border border-teal200 rounded-full p-[1px]' />
            </div>

            <Button classnames='text-xs px-2 sm:text-sm ' onClick={(e) => handleSignOut(e)}>
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex space-x-2 sm:space-x-6 items-center'>
            <Button classnames='text-xs px-2 sm:text-base sm:px-4' onClick={() => setOpen('create')}>
              Sign up
            </Button>
            <Button classnames='text-xs px-2 sm:text-base sm:px-4' filled={true} onClick={() => setOpen('login')}>
              Log in
            </Button>
          </div>
        )}
      </div>
      {open && <AccountModal setOpen={setOpen} open={open} />}
    </div>
  );
};

export default Nav;
