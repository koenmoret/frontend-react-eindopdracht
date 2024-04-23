// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null
  });
  const navigate = useNavigate();

  const login = async (jwt) => {
    console.log(jwtDecode(jwt));
    const decodedToken = jwtDecode(jwt);
    const userid = decodedToken.userId;
    localStorage.setItem("token", jwt);
    try{
      const response = await axios.get(`https://api.datavortex.nl/kamonlinenovi/users/${decodedToken.sub}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }
      });
      console.log(response);
      setAuth({
        ...auth,
        isAuth: true,
        user: {
          username: response.data.username,
          email: response.data.email,
          id: userid,
        },
      });
      navigate('/');
    }catch(e){
       console.error(e);
    }


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