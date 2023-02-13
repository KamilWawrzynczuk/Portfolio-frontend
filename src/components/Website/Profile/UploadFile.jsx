import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userProjectsContext } from '../../../context/UserProjectsContext';
import FileDownload from 'js-file-download';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userState, dispatchUserState } = useContext(userProjectsContext);
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    setFile((prev) => file);
  };

  function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem('user_id');
    const data = new FormData();
    data.append('file', file);
    axios
      .post(`https://portfoliocreator.onrender.com/files/upload/${userId}`, data)
      .then((response) => {
        setLoading(false);
        setMessage(response.data.msg);
        setIsActive(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
        setFile(null)
      })
      .catch((error) => {
        setMessage(response.data.msg);
        setIsActive(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
        setFile(null)
      });
  }

  return (
    <>
      {message && (
        <>
          <div className={setIsActive ? 'error error-animation' : 'error'}>
            {message}
          </div>
          <br />
        </>
      )}
      <label htmlFor='file' className='edit-label'>
        Choose file:
      </label>
      <input
        id='file'
        type='file'
        onChange={handleSelectFile}
        multiple={false}
        name='file'
        className='edit-input'
      />
      { file && <span className='edit-span'>
        {file.name.substring(0, 25).length < 25
          ?
          (`${file.name.substring(0, 20)} ...`) : (file.name)}<br /> </span> }
      {file && (
        <>
          <button
            type='submit'
            onClick={handleUpload}
            className='edit-button button-upload'
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </>
      )}
    </>
  );
}

export default UploadFile;
