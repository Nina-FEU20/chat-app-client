import React, { useEffect } from 'react';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ChatPage = () => {
  const { authUser, setAuthUser } = AuthState();
  const navigate = useNavigate();

  const handleSignOut = async(e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5000/api/user/logout', { username: 'test' }, { withCredentials: true });
      console.log(data)
    } catch(err) {
      console.log(err)
    }

    setAuthUser(null);
  };

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser, navigate]);

  const getAllUsers = async(e) => {
    e.preventDefault(); 

    try{
      const { data } = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
      console.log(data)
    }catch(err) {
      console.log(err)
    }
  
  }

  
  const getSingleUser = async(e) => {
    e.preventDefault(); 

    try{
      const { data } = await axios.get('http://localhost:5000/api/user/61ee06142ce9392a507e467b', { withCredentials: true });
      console.log(data)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h1>CHAT</h1>
      <button onClick={(e) => handleSignOut(e)}>Log out</button>
      <button onClick={(e) => getAllUsers(e)}>Get all users</button>
      <button onClick={(e) => getSingleUser(e)}>Get single user</button>
    </div>
  );
};

export default ChatPage;
