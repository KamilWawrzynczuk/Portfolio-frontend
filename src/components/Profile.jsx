import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import axios from 'axios';
import Line from './Line';
import { useContext } from 'react';
import { userSocialContext } from '../context/userSocialContext';
import UploadFile from './Website/Profile/UploadFile';
import DownloadFile from './Website/Profile/DownloadFile';
function Profile() {
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);

  const navigate = useNavigate();

  const auth = useAuth();

  const [user, setUser] = useState({
    newPassword: '',
    confirmPassword: '',
    github: '',
    linkedIn: '',
    websiteTitle: '',
  });

  const location = useLocation();
  const [passwordMessage, setPasswordMessage] = useState('');
  const [socialMessage, setSocialMessage] = useState('');
  const [titleMessage, setTitleMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [confirmationState, setConfirmationState] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmitChangePassword(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    axios
      // This address will change depends on PORT
      // you are using or after uploading
      .patch('https://portfoliocreator.onrender.com/users/changePassword', {
        newPassword: user.newPassword,
        confirmPassword: user.confirmPassword,
        userId,
      })
      .then((user) => {
        console.log(user, 'profile');
        setPasswordMessage(user.data.msg);
        setUser({
          newPassword: '',
          confirmPassword: '',
          github: '',
          linkedIn: '',
          websiteTitle: '',
        });

        setTimeout(() => {
          setPasswordMessage(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error, 'profile');
        setPasswordMessage(error.response.data.errors);
        setTimeout(() => {
          setPasswordMessage(false);
        }, 2000);
      });
  }

  async function handleSubmitChangeLinks(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    axios
      // This address will change depends on PORT
      // you are using or after uploading
      .patch('https://portfoliocreator.onrender.com/users/updateUser', {
        websiteTitle:
          user.websiteTitle.length > 0
            ? user.websiteTitle
            : userSocialState.websiteTitle,
        linkedIn:
          user.linkedIn.length > 0 ? user.linkedIn : userSocialState.linkedIn,
        github: user.github.length > 0 ? user.github : userSocialState.github,
        userId,
      })
      .then((user) => {
        setSocialMessage(user.data.msg);
        setUser({
          newPassword: '',
          confirmPassword: '',
          github: '',
          linkedIn: '',
        });
        setTimeout(() => {
          setSocialMessage(false);
        }, 2000);
        dispatchUserSocialState({ type: 'UPDATE', payload: user.data.social });
      })
      .catch((error) => {
        console.log(error);
        setSocialMessage(error.data.msg);
        setTimeout(() => {
          setSocialMessage(false);
        }, 2000);
      });
  }

  function handleDeleteAccount(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');

    axios
      .delete(`https://portfoliocreator.onrender.com/users/deleteOneUser/${userId}`)
      .then((response) => {
        auth.contextValue.logout();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleWebsiteTitle(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    axios

      .patch('https://portfoliocreator.onrender.com/users/updateUser', {
        websiteTitle:
          user.websiteTitle.length > 0
            ? user.websiteTitle
            : userSocialState.websiteTitle,
        linkedIn:
          user.linkedIn.length > 0 ? user.linkedIn : userSocialState.linkedIn,
        github: user.github.length > 0 ? user.github : userSocialState.github,
        userId,
      })
      .then((user) => {
        setTitleMessage(user.data.msg);
        setUser({
          newPassword: '',
          confirmPassword: '',
          github: '',
          linkedIn: '',
          websiteTitle: '',
        });
        setTimeout(() => {
          setTitleMessage(false);
        }, 2000);
        dispatchUserSocialState({ type: 'UPDATE', payload: user.data.social });
      })
      .catch((error) => {
        console.log(error);
        setTitleMessage(error.data.msg);
        setTimeout(() => {
          setTitleMessage(false);
        }, 2000);
      });
  }

  return (
    <div className='login-form'>
      <h3>Here you can change your data:</h3>
      <form onSubmit={handleWebsiteTitle} className='login-form'>
        <h4>Change website title:</h4>
        {titleMessage && (
          <div className='error error-animation'>{titleMessage}</div>
        )}
        <label className='login-label' htmlFor='websiteTitle'>
          Title:
        </label>
        <input
          className='login-input'
          type='text'
          placeholder='Your github account'
          name='websiteTitle'
          id='websiteTitle'
          value={user.websiteTitle}
          onChange={handleChange}
        />
        <button type='submit' className='login-button'>
          Update
        </button>
      </form>
      <Line />
      <form onSubmit={handleSubmitChangeLinks} className='login-form'>
        <h4>Set your social media links:</h4>
        {socialMessage && (
          <div className='error error-animation'>{socialMessage}</div>
        )}
        <label className='login-label' htmlFor='github'>
          GitHub
        </label>
        <input
          className='login-input'
          type='text'
          placeholder='Your github account'
          name='github'
          id='github'
          value={user.github}
          onChange={handleChange}
        />
        <label className='login-label' htmlFor='linkedIn'>
          LinkedIn
        </label>
        <input
          className='login-input'
          type='text'
          placeholder='Your LinkedIn account'
          name='linkedIn'
          id='linkedIn'
          value={user.linkedIn}
          onChange={handleChange}
        />
        <button type='submit' className='login-button'>
          Update
        </button>
      </form>
      <Line />
      <form className='login-form'>
        <h4>Upload your Resume:</h4>
        {/* {resumeMessage && <div className='error'>{resumeMessage}</div>} */}
        <UploadFile />
      </form>
      <Line />
      <form onSubmit={handleSubmitChangePassword} className='login-form'>
        <h4>Change Password:</h4>
        {passwordMessage && (
          <div className='error error-animation'>{passwordMessage}</div>
        )}
        <label className='login-label' htmlFor='newPassword'>
          New Password
        </label>
        <input
          className='login-input'
          type='password'
          placeholder='New Password'
          name='newPassword'
          id='newPassword'
          value={user.newPassword}
          onChange={handleChange}
        />
        <label className='login-label' htmlFor='confirmPassword'>
          Confirm Password
        </label>
        <input
          className='login-input'
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          id='confirmPassword'
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <button type='submit' className='login-button'>
          Change
        </button>
      </form>
      <Line />
      <form onSubmit={handleDeleteAccount} className='login-form'>
        <h4>Delete Account:</h4>
        {deleteMessage ? (
          <>
            <div className='error error-delete'>{deleteMessage}</div>
            <button type='submit' className='login-button'>
              Confirm
            </button>
            <button
              type='button'
              onClick={() => {
                setConfirmationState(false);
                setDeleteMessage(null);
              }}
              className='login-button'
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type='button'
            onClick={() => {
              setConfirmationState(true);
              setDeleteMessage(
                `Arr you sure that you want to delete account?
              All data will be lost!`
              );
            }}
            className='login-button'
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
}

export default Profile;
