import React, { useState } from 'react';
import axios from 'axios';
import { AuthState } from '../context/AuthContext';

const Signup = () => {
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
      localStorage.setItem('user', JSON.stringify(data))
      setAuthUser(data);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <h3>Sign up</h3>
      <form>
        <input type='text' value={username} required onChange={(e) => setUsername(e.target.value)} />
        <input type='password' value={password} required onChange={(e) => setPassword(e.target.value)} autoComplete='on' />
        <input type='password' value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} autoComplete='on' />
        <button type='submit' onClick={handleSubmit}>
          Sign up
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
