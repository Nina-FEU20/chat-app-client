import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const foundAuthUser = localStorage.getItem('user')
    if (foundAuthUser) {
      const parsedAuthUser = JSON.parse(foundAuthUser);
      setAuthUser(parsedAuthUser);
    }
  }, [])

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};

export const AuthState = () => {
    return useContext(AuthContext);
  };

export default AuthProvider;