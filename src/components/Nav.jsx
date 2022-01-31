import React, { useState } from 'react';
import { AuthState } from '../context/AuthContext';
import axios from 'axios';
import Signup from './Signup';
import Login from './Login';

const Nav = () => {
  const [open, setOpen] = useState(null);
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Topics Daily</h2>
        {authUser ? (
          <div>
            <i>UserIcon </i>
            <button onClick={(e) => handleSignOut(e)}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setOpen('Signup')}>Sign up</button>
            <button onClick={() => setOpen('Login')}>Log in</button>
          </div>
        )}
      </div>
      {open && <div>{open === 'Signup' ? <Signup setOpen={setOpen} /> : <Login setOpen={setOpen} />}</div>}
    </div>
  );
};

export default Nav;
