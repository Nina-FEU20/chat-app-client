import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div>
      <h3>Sign up</h3>
      <input type='text' value={name} required onChange={(e) => setName(e.target.value)} />
      <input type='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
      <input type='password' value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
      <button>Sign up</button>
    </div>
  );
};

export default Signup;
