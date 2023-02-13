import React, { useState, useContext } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { userContext } from '../../../context/UserIntroContext';

function CreateArea(props) {
  const { userState, dispatchUserState } = useContext(userContext);

  const [note, setNote] = useState({
    intro: {
      greeting: userState.intro.greeting,
      name: userState.intro.name,
      header: userState.intro.header,
      specialty: userState.intro.specialty,
      current: userState.intro.current,
    },
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        intro: { ...prevNote.intro, [name]: value },
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.setIsClicked(!props.isClicked);

    const userId = localStorage.getItem('user_id');
    axios
      .patch('https://portfoliocreator.onrender.com/users/addIntroData', {
        data: note,
        userId,
      })
      .then((introData) => {
        console.log(introData, ' w create area');
        dispatchUserState({
          type: 'INTRO',
          payload: {
            intro: {
              greeting: introData.data.introData.greeting,

              name: introData.data.introData.name,

              header: introData.data.introData.header,

              specialty: introData.data.introData.specialty,

              current: introData.data.introData.current,
            },
          },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='create-area'>
      {props.isClicked ? null : (
        <form className='edit-form'>
          <textarea
            name='greeting'
            onChange={handleChange}
            placeholder={userState.intro.greeting}
            rows='1'
          />
          <textarea
            name='name'
            onChange={handleChange}
            placeholder={userState.intro.name}
            rows='1'
          />
          <textarea
            name='header'
            onChange={handleChange}
            placeholder={userState.intro.header}
            rows='1'
          />
          <textarea
            name='specialty'
            onChange={handleChange}
            placeholder={userState.intro.specialty}
            rows='1'
          />
          <textarea
            name='current'
            onChange={handleChange}
            placeholder={userState.intro.current}
            rows='1'
          />
          <button className='edit-button' onClick={submitNote}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateArea;
