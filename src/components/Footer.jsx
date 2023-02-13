import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { userSocialContext } from '../context/userSocialContext';

function Footer({ github, linkedIn, email, lName, fName, websiteTitle }) {
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);

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
    <footer>
      <h2>{websiteTitle}</h2>
      <ul>
        <li>
          <Link
            to={`//${linkedIn}`}
            aria-label='Link to linkedIn'
            target='_blank'
          >
            <span className='fa-brands fa-linkedin' aria-hidden='true'></span>
            <span className='sr-only'>LinkedIn</span>
          </Link>
        </li>
        <li>
          <Link
            to={`//${github}`}
            aria-label='Link to linkedIn'
            target='_blank'
          >
            <span className='fa-brands fa-github' aria-hidden='true'></span>
            <span className='sr-only'>Github</span>
          </Link>
        </li>
        <li>
          <Link to={`mailto:${email}`}>
            <span className='fa-solid fa-envelope' aria-hidden='true'></span>
            <span className='sr-only'>Email</span>
          </Link>
        </li>
      </ul>

      <p>
        <small>&copy; 2023 {` ${fName} ${lName}`}. All rights reserved.</small>
      </p>
    </footer>
  );
}

export default Footer;
