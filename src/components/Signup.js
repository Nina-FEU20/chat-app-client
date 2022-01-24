import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword || !username) {
      setError('All fields are required');
      return;
    }

    try {
      const data = await axios.post('http://localhost:5000/api/user', { username, password, confirmPassword }, config);
      console.log(data);

      // TODO: Create a context and set user
      setUsername('');
      setPassword('');
      navigate('/chat');
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
