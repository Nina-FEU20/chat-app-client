import React, { useState } from 'react';
import axios from 'axios';
import { AuthState } from '../context/AuthContext';
import Input from './Input';
import Button from './Button';

const Signup = ({ setOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { setAuthUser } = AuthState();

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword || !username) return setError('All fields are required');

    if (password !== confirmPassword) return setError('Passwords do not match');

    if (password.length < 6) return setError('Password must be atleast 6 characters');

    if (username.length < 4) return setError('Username must be atleast 4 characters');

    try {
      const { data } = await axios.post('http://localhost:5000/api/user', { username, password }, config);
      console.log(data);

      setUsername('');
      setPassword('');
      localStorage.setItem('user', JSON.stringify(data));
      setAuthUser(data);
      setOpen(null);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <h3 className='text-center mb-4 text-2xl  text-teal500'>Create a new account</h3>
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
        <Input
          type='password'
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete='on'
          label='Confirm Password'
          placeholder='Confirm Password'
        />
        <p className='text-red font-medium text-sm -mt-2'>{error && '* ' + error}</p>
        <Button filled='true' type='submit' onClick={handleSubmit} classnames='mt-4'>
          Sign up
        </Button>
      </form>
      <p className='text-right font-medium text-teal400'>
        Already have an account?{' '}
        <button className='font-medium text-teal400 hover:text-pink100 underline' onClick={() => setOpen('login')}>
          Login
        </button>
      </p>
    </>
  );
};

export default Signup;
