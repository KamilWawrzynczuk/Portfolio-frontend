import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { contactContext } from '../../../context/ContactContext';
import EditContact from './EditContact';
import axios from 'axios';
import { userSocialContext } from '../../../context/userSocialContext';

function Contact() {
  const { contactState, dispatchContactState } = useContext(contactContext);
  const [isClicked, setIsClicked] = useState(true);
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const userId = localStorage.getItem('user_id');
      axios
        .post('https://portfoliocreator.onrender.com/users/getContactData', { userId })
        .then((contactData) => {
          dispatchContactState({
            type: 'UPDATE',
            payload: contactData.data.userDataFromDb,
          });
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
    <div className='section-plum'>
      <section id='contact'>
        <div>
          <h2>{contactState.contact}</h2>
          <p>{contactState.contactInfo}</p>
          <div className='contact-edit-div'>
            <button
              onClick={handleClick}
              type='button'
              aria-label='Click here to edit paragraph'
              className='edit-button'
            >
              Edit
            </button>
            <EditContact setIsClicked={setIsClicked} isClicked={isClicked} />
          </div>
        </div>

        <p>
          <a className='button' href={`mailto:${userSocialState.email}`}>
            Email me
          </a>
        </p>
      </section>
    </div>
  );
}

export default Contact;
