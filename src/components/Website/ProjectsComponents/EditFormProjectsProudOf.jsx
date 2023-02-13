import React, { useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../../../context/UserIntroContext';
import { proudOfContext } from '../../../context/ProudOfContext';

function EditFormProjectsProudOf(props) {
  const { userState, dispatchUserState } = useContext(userContext);
  const { proudOfState, dispatchProudOfState } = useContext(proudOfContext);

  const [note, setNote] = useState(proudOfState);

  function handleChange(event) {
    const { value } = event.target;
    setNote((prevNote) => value);
  }

  function submitNote(event) {
    event.preventDefault();
    props.setIsClicked(!props.isClicked);
    const userId = localStorage.getItem('user_id');
    axios
      .patch('https://portfoliocreator.onrender.com/users/addProudOf', {
        data: note,
        userId,
      })
      .then((proudOfData) => {
        console.log(proudOfData, ' w proud of edit form ');
        dispatchProudOfState({
          type: 'UPDATE',
          payload: proudOfData.data.proudOfData,
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='create-area'>
      {props.isClicked ? null : (
        <form className='edit-form'>
          <textarea
            name='proudOf'
            onChange={handleChange}
            placeholder={proudOfState}
        
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

export default EditFormProjectsProudOf;
