// eslint-disable-next-line no-unused-vars
import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import {checkTokenValidity} from "../helper/checkTokenValidity.js";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthContextProvider({ children }) {

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if(storedToken && checkTokenValidity(storedToken)){
      void login(storedToken);
    }else {
      void logout();
    }
  }, []);

  const [auth, setAuth] = useState({
    isAuth: false,
    user: null,
    status: "pending"
  });
  const navigate = useNavigate();

  const login = async (jwt) => {
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
      setAuth({
        ...auth,
        isAuth: true,
        user: {
          username: response.data.username,
          email: response.data.email,
          id: userid,
        },
        status: "done",
      });
    }catch(e){
       console.error(e);
    }
  }

  function logout() {
    console.log('Gebruiker is uitgelogd!');
    setAuth({
      ...auth,
      isAuth: false,
      user: null,
      status: "done",
    });
    localStorage.clear();
    navigate('/login');
  }

  const contextData = {
    isAuth: auth.isAuth,
    user: auth.user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {auth.status === "done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;