import React, { useState } from 'react';
import { AuthState } from '../context/AuthContext';
import axios from 'axios';
import { BsChatDotsFill } from 'react-icons/bs';
import avatar from '../assets/avatar.png';
import Button from './Button';
import AccountModal from './AccountModal';

const Nav = ({ classnames }) => {
  const [open, setOpen] = useState(false);
  const { authUser, setAuthUser } = AuthState();

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
    <div className={`container mx-auto max-w-[1980px] ${classnames}`}>
      <div className='flex justify-between items-center py-2 2xl:py-4'>
        <div className='flex items-center'>
          <BsChatDotsFill className='text-teal200 text-5xl' />
          <h2 className='pl-2 text-xl sm:text-2xl'>Talk Daily</h2>
        </div>

        {authUser ? (
          <div className='flex space-x-2 sm:space-x-6 items-center'>
            <p className='font-semibold'>{authUser.username}</p>
            <img src={avatar} alt='avatar' className='h-10 border border-teal200 rounded-full p-[1px]' />
            <Button onClick={(e) => handleSignOut(e)}>Logout</Button>
          </div>
        ) : (
          <div className='flex space-x-2 sm:space-x-6 items-center'>
            <Button onClick={() => setOpen('create')}>Sign up</Button>
            <Button filled={true} onClick={() => setOpen('login')}>
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
