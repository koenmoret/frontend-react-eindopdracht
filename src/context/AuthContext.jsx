// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null
  });
  const navigate = useNavigate();

  function login(jwt) {
    console.log('Gebruiker is ingelogd!: '+ jwt);
    setAuth({
      ...auth,
      isAuth: true,
      user: {
        username: "",
        email: "",
        id: "",
      },
    });
    //navigate('/dashboard');
  }

  function logout() {
    console.log('Gebruiker is uitgelogd!');
    setAuth({
      ...auth,
      isAuth: false,
      user: null
    });
    navigate('/');
  }

  const contextData = {
    isAuth: auth.isAuth,
    user: auth.user,
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