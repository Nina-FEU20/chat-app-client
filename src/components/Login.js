import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:5000/api/user/login', { username, password }, config);
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
      <h3>Log in</h3>
      <form action=''>
        <input type='text' value={username} required onChange={(e) => setUsername(e.target.value)} />
        <input type='password' value={password} required onChange={(e) => setPassword(e.target.value)} autoComplete='on' />
        <button type='submit' onClick={(e) => handleSubmit(e)}>
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
