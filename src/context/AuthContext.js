import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};

export const AuthState = () => {
    return useContext(AuthContext);
  };

export default AuthProvider;