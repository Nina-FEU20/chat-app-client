import React, { useState } from 'react';
import axios from 'axios';
import { AuthState } from '../context/AuthContext';
import Input from './Input';
import Button from './Button';
import { useKeyDownListener } from '../hooks/useListener';
import socket from '../config/socketConfig';

const Login = ({ setOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !username) return setError('All fields are required');

    try {
      const { data } = await axios.post('http://localhost:5000/api/user/login', { username, password }, { withCredentials: true });
      console.log(data);

      setUsername('');
      setPassword('');
      localStorage.setItem('user', JSON.stringify(data));
      setAuthUser(data);
      socket.emit('login', data);
      setOpen(null);
    } catch (err) {
      setError(err.response.data);
    }
  };

  useKeyDownListener(handleSubmit);

  const { setAuthUser } = AuthState();

  return (
    <div>
      <h3 className='text-center mb-4 text-2xl  text-teal500'>Login</h3>
      <form className='mb-6'>
        <Input
          name='username'
          type='text'
          value={username}
          placeholder='Your Username'
          label='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='on'
          name='password'
          label='Password'
          placeholder='Password'
        />
        <p className='text-red font-medium text-sm -mt-2'>{error && '* ' + error}</p>
        <Button filled='true' type='submit' onClick={(e) => handleSubmit(e)} classnames='mt-4'>
          Login
        </Button>
      </form>

      <p className='text-right font-medium text-teal400'>
        Don't have an account yet?{' '}
        <button className='font-medium text-teal400 hover:text-pink100 underline' onClick={() => setOpen('create')}>
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
