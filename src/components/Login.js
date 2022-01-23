import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h3>Log in</h3>
      <input type='text' value={name} required onChange={(e) => setName(e.target.value)} />
      <input type='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </div>
  );
};

export default Login;
