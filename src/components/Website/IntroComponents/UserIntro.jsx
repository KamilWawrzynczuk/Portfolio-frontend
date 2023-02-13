import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import CreateArea from './CreateArea';
import { userContext } from '../../../context/UserIntroContext';
import { useState } from 'react';

function UserIntro() {
  const { userState, dispatchUserState } = useContext(userContext);
  const [isClicked, setIsClicked] = useState(true);

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

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <div onClick={handleClick} className=''>
        <p className='name'>{userState.intro.greeting}</p>
        <span
          type='button'
          aria-label='Click here to header'
          className='name-span'
        >
          {userState.intro.name}
        </span>
        <h2 className=''>{userState.intro.header}</h2>
        <p>{userState.intro.specialty}</p>
        <p>{userState.intro.current}</p>
      </div>
      <button
        onClick={handleClick}
        type='button'
        aria-label='Click here to edit paragraph'
        className='edit-button'
      >
        Edit
      </button>
      <CreateArea setIsClicked={setIsClicked} isClicked={isClicked} />
    </>
  );
}

export default UserIntro;
