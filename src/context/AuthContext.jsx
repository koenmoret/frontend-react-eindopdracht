// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthContextProvider({ children }) {
  const [isAuth, toggleIsAuth] = useState(false);
  const navigate = useNavigate();

  function login() {
    console.log('Gebruiker is ingelogd!');
    toggleIsAuth(true);
    navigate('/dashboard');
  }

  function logout() {
    console.log('Gebruiker is uitgelogd!');
    toggleIsAuth(false);
    navigate('/');
  }

  const contextData = {
    isAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;