import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userProjectsContext } from '../../../context/UserProjectsContext';

function UploadImage({ userId, projectId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userState, dispatchUserState } = useContext(userProjectsContext);

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    setFile((prev) => file);
  };

  function handleUpload() {
    setLoading(true);
    const data = new FormData();
    data.append('image', file);
    axios
      .patch(
        `https://portfoliocreator.onrender.com/users/uploadImage/${projectId}/${userId}`,
        data
      )
      .then((updateProject) => {
        setLoading(false);
        dispatchUserState({
          type: 'EDIT',
          payload: [
            {
              projectId: updateProject.data.userData.projectId,
              subtitle: updateProject.data.userData.subtitle,
              title: updateProject.data.userData.title,
              description: updateProject.data.userData.description,
              secondSubtitle: updateProject.data.userData.secondSubtitle,
              list: updateProject.data.userData.list,
              image: updateProject.data.userData.image,
            },
          ],
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      <label htmlFor={projectId} className='edit-label'>
        Change image:
      </label>
      <input
        id={projectId}
        type='file'
        onChange={handleSelectFile}
        multiple={false}
        name='image'
        className='edit-input'
      />

      {file && (
        <span className='edit-span'>{`${file.name.substring(0, 25)}...`}</span>
      )}
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

export default UploadImage;
