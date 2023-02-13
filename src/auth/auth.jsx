import React, { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import { setLocalStorage } from '../util/setLocalStorage';
import { useCallback } from 'react';
import { isTokenExpire } from '../util/isTokenExpire';

const AuthContext = createContext(null);

const initialValue = {
  isAuth: false,
  msg: '',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialValue);

  // Checking if token is valid and if is already expired and then
  // logout user by delate localStorage and
  // changing isAuth to false

  useEffect(() => {
    const isLog = isTokenExpire();
    if (isLog) {
      (() => {
        const token = localStorage.getItem('token');
        axios
          // This address will change depends on PORT
          // you are using or after uploading
          .get('https://portfoliocreator.onrender.com/protected', {
            headers: {
              Authorization: token,
            },
          })
          .then((user) => {
            window.localStorage.setItem('isAuth', 'true');
            setUser({
              isAuth: user.data.success,
              msg: '',
            });
          })
          .catch((err) => {
            window.localStorage.setItem('isAuth', 'false');
            setUser({
              isAuth: err.data.success,
              msg: '',
            });
          });
      })();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
      localStorage.setItem('isAuth', 'false');
      localStorage.removeItem('user_id');
      localStorage.removeItem('userState');
      localStorage.removeItem('userProjectsState');
      setUser({
        isAuth: false,
        msg: '',
      });
    }
  }, []);

  const login = useCallback((user) => {
    axios
      // This address will change depends on PORT
      // you are using or after uploading
      .post('https://portfoliocreator.onrender.com/users/login', {
        email: user.email,
        password: user.password,
      })
      .then((user) => {
        setLocalStorage(user);
        window.localStorage.setItem('isAuth', 'true');
        setUser({
          isAuth: true,
          msg: '',
        });
      })
      .catch((error) => {
        window.localStorage.setItem('isAuth', 'false');
        setUser({
          isAuth: false,
          msg: error.response.data.msg,
        });
      });
  }, []);

  const logout = useCallback(() => {
    axios
      // This address will change depends on PORT
      // you are using or after uploading
      .get('https://portfoliocreator.onrender.com/users/logout')
      .then((respond) => {
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('user_id');
        localStorage.removeItem('userState');
        localStorage.removeItem('userProjectsState');
        setUser({
          isAuth: false,
          msg: '',
        });
      })
      .catch((err) => {
        throw new Error('Log out was not successfully.');
      });
  }, []);

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    [user, setUser, login, logout]
  );

  return (
    <AuthContext.Provider value={{ contextValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('AuthContext was used outside of its Provider');
  }
  return context;
};
