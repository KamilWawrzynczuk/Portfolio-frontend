import React, { useState, useContext } from 'react';
import axios from 'axios';
import { contactContext } from '../../../context/ContactContext';

function EditContact(props) {
  const { contactState, dispatchContactState } = useContext(contactContext);

  const [contact, setContact] = useState({
    contact: contactState.contact,
    contactInfo: contactState.contactInfo,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setContact((prevNote) => ({ ...prevNote, [name]: value }));
  }

  function submitNote(event) {
    event.preventDefault();
    props.setIsClicked(!props.isClicked);
    const userId = localStorage.getItem('user_id');
    axios
      .patch('https://portfoliocreator.onrender.com/users/addContactData', {
        data: contact,
        userId,
      })
      .then((contactData) => {
        dispatchContactState({
          type: 'UPDATE',
          payload: contactData.data.contactData,
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='create-area'>
      {props.isClicked ? null : (
        <form className='edit-form'>
          <textarea
            name='contact'
            onChange={handleChange}
            placeholder={contactState.contact}
            rows='1'
          />
          <textarea
            name='contactInfo'
            onChange={handleChange}
            placeholder={contactState.contactInfo}
            rows='4'
          />
          <button className='edit-button' onClick={submitNote}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}

export default EditContact;
