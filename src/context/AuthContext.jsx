import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import {checkTokenValidity} from "../helper/checkTokenValidity.js";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthContextProvider({ children }) {

  const [refresh, setRefresh] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if(storedToken && checkTokenValidity(storedToken)){
      void login(storedToken);
    }else {
      void logout();
    }
  }, []);

  // Auto login/refresh user data
  useEffect(() => {
    if (refresh) {
      const storedToken = localStorage.getItem('token');
      if (storedToken && checkTokenValidity(storedToken)) {
        void login(storedToken).then(() => {
          setRefresh(false);
        });
      }
    }
  }, [refresh]);

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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        }
      });
      setAuth({
        ...auth,
        isAuth: true,
        user: {
          name: response.data.username,
          email: response.data.email,
          info: response.data.info,
          userid: userid,
        },
        status: "done",
      });
    }catch(e){
       console.error(e);
    }
  }

  function logout(redirectPath = '/') {
    console.log('Gebruiker is uitgelogd!');
    setAuth({
      ...auth,
      isAuth: false,
      user: null,
      status: "done",
    });
    localStorage.clear();
    navigate(redirectPath);
  }

  const contextData = {
    values,
    setValues,
    isAuth: auth.isAuth,
    user: auth.user,
    login,
    logout,
    setRefresh
  };

  return (
    <AuthContext.Provider value={contextData}>
      {auth.status === "done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;