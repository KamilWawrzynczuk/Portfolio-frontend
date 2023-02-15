import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [user, setUser] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setErrorMessage(null);
    const { name, value } = event.target;
    setUser((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsRegister(true);
    const response = await axios
      .post('https://portfoliocreator.onrender.com/users/register', {
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      })
      .then((response) => {
        setIsSuccess(true);
        setIsRegister(false);
      })
      .catch((error) => {
        setIsRegister(false);
        if (
          error.response.data.error &&
          error.response.data.error.message === 'Email is already in use.'
        ) {
          setErrorMessage('Email is already in use');
          // setTimeout(() => {
          //   setErrorMessage(false);
          // }, 2000);
        } else {
          setErrorMessage(error.response.data.errors[0].msg);
          // setTimeout(() => {
          //   setErrorMessage(false);
          // }, 2000);
        }
      });
  }

  return isSuccess ? (
    <div className='user-intro login-form-success'>
      <h2>Success</h2>
      <p>We have sent you email with verification link.</p>
      <p>
        Click <Link to='/'>here</Link> to go back to home page <br />
        or <Link to='/login'>login</Link> page.
      </p>
    </div>
  ) : (
    <>
      <div className=''>
        <form onSubmit={handleSubmit} className='login-form'>
          <h3>Please Register</h3>
          {errorMessage && <div className='error'>{errorMessage}</div>}
          <label className='login-label' htmlFor='fName'>
            First Name
          </label>
          <input
            onChange={handleChange}
            value={user.fName}
            className='login-input'
            type='text'
            placeholder='First Name'
            name='fName'
            id='fName'
          />
          <label className='login-label' htmlFor='lName'>
            Last Name
          </label>
          <input
            className='login-input'
            type='text'
            placeholder='Last Name'
            name='lName'
            id='lName'
            value={user.lName}
            onChange={handleChange}
          />
          <label className='login-label' htmlFor='email'>
            Email
          </label>
          <input
            className='login-input'
            type='text'
            placeholder='Email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleChange}
          />
          <label className='login-label' htmlFor='password'>
            Password{' '}
            <span className='login-span'>
              (At least 6 characters and includes a number and a special
              character)
            </span>
          </label>

          <input
            className='login-input'
            type='password'
            placeholder='Password'
            name='password'
            id='password'
            value={user.password}
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
          {isRegister ? (
            <button type='submit' className='login-button login-clicked'>
              <FontAwesomeIcon
                icon={faSpinner}
                size='lg'
                spin
                className='login-spinner'
              />{' '}
              Register
            </button>
          ) : (
            <button type='submit' className='login-button'>
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
