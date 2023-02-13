import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../auth/auth';
import { isLogin } from '../util/isLogin';
import UserWebsite from './Website';
import { useContext } from 'react';
import { userProjectsContext } from '../context/UserProjectsContext';
import { proudOfContext } from '../context/ProudOfContext';
import { userSocialContext } from '../context/userSocialContext';
import Line from './Line';

function User() {
  const auth = useAuth();
  const [user, setUser] = useState();
  const { userState, dispatchUserState } = useContext(userProjectsContext);
  const { proudOfState, dispatchProudOfState } = useContext(proudOfContext);
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const user_id = localStorage.getItem('user_id');

    if (isLogin()) {
      axios
        .get(`https://portfoliocreator.onrender.com/users/getOne/${user_id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((user) => {
          setUser(user.data.user.fName);
          window.localStorage.setItem('isAuth', 'true');
          auth.contextValue.setUser({
            isAuth: user.data.success,
            msg: '',
          });
        })
        .catch((err) => {
          window.localStorage.setItem('isAuth', 'false');
          auth.contextValue.setUser({
            isAuth: err.response.data.success,
            msg: '',
          });
        });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const user_id = localStorage.getItem('user_id');
      axios
        .post('https://portfoliocreator.onrender.com/users/getUserProjects', { user_id })
        .then((userData) => {
          dispatchUserState({
            type: 'UPDATE',
            payload: userData.data.projects,
          });

          localStorage.setItem(
            'userProjectsState',
            JSON.stringify(userData.data.projects)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const userId = localStorage.getItem('user_id');
      axios
        .post('https://portfoliocreator.onrender.com/users/getUserData', { userId })
        .then((userData) => {
          dispatchUserState({
            type: 'INTRO',
            payload: {
              intro: userData.data.userDataFromDb,
            },
          });

          localStorage.setItem(
            'userState',
            JSON.stringify(userData.data.userDataFromDb)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const userId = window.localStorage.getItem('user_id');
      axios
        .post('https://portfoliocreator.onrender.com/users/getOne', { userId })
        .then((userData) => {
          dispatchUserSocialState({
            type: 'UPDATE',
            payload: userData.data.social,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <section id='user-intro'>
        <p className='user-name'>
          Hi, <span>{user}</span>{' '}
        </p>
        <p>
          This is your Portfolio Creator account. <br />
          You can edit your website below,
          <br />
          go to{' '}
          <a href={`portfolio/${userId}`} target='_blank'>
            live version{' '}
          </a>{' '}
          of your Portfolio
          <br />
          or change your <Link to='/users/profile'>profile data. </Link>
        </p>
        <Line />
      </section>
      <UserWebsite />
    </>
  );
}

export default User;
