import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MessageSent from '../assets/MessageSent.png';
import Button from '../components/Button';
import AccountModal from '../components/AccountModal';

const HomePage = () => {
  const { authUser } = AuthState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (authUser) navigate('/chat');
  }, [authUser, navigate]);

  return (
    <>
      <div className='container mx-auto relative'>
        <div className='flex flex-wrap md:flex-nowrap justify-between'>
          <div className='mt-0 mt-14 lg:mt-20'>
            <h1 className='font-bold text-4xl md:text-6xl lg:text-7xl mb-6'>Hello, let's talk!</h1>
            <p className='md:max-w-[50%] text-sm sm:text-base'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum vel, necessitatibus architecto eveniet nihil tempore aspernatur, eaque
              debitis delectus nobis illo perspiciatis ullam culpa quam exercitationem minima, ipsam ab deserunt.
            </p>
            <div className='hidden lg:flex space-x-2 sm:space-x-6 align-items md:max-w-[30%] mt-20'>
              <Button filled={true} onClick={() => setOpen('create')}>
                Sign up
              </Button>
              <Button onClick={() => setOpen('login')}>Log in</Button>
            </div>
          </div>
          <img className='md:absolute -mt-12 sm:-mt-16 -right-14 -z-10' src={MessageSent} alt='Message' />
        </div>
      </div>
      {open && <AccountModal setOpen={setOpen} open={open} />}
    </>
  );
};

export default HomePage;
