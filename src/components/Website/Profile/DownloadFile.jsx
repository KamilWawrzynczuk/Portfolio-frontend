import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import FileDownload from 'js-file-download';
import { userSocialContext } from '../../../context/userSocialContext';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

function DownloadFile({ isAuth }) {
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);
  const [message, setMessage] = useState('');

  const [isActive, setIsActive] = useState(false);

  function handleDownload(e) {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    axios({
      url: `https://portfoliocreator.onrender.com/users/downloadFile/${userId}`,
      method: 'POST',
      responseType: 'blob',
      data: userId,
    })
      .then((res) => {
        FileDownload(
          res.data,
          `${userSocialState.fName}_${userSocialState.lName}_resume.pdf`
        );
        setIsActive(false);
      })
      .catch((err) => {
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 500);
      });
  }

  return (
    <>
      <div className='resume-div'>
        <Link
          to='#'
          onClick={handleDownload}
          className={isActive ? 'button button-wiggle' : 'button'}
        >
          Resume
        </Link>
      </div>
      {/* {message && (
        <span
          className={
            isActive
              ? 'error error-resume error-animation'
              : 'error error-resume'
          }
        >
          {message}
        </span>
      )} */}
    </>
  );
}

export default DownloadFile;
