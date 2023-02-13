import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { setLocalStorage } from '../util/setLocalStorage';
import { useAuth } from '../auth/auth';

function Login() {
  const auth = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const redirectPath = location.state?.path || '/users';

  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // auth.contextValue.login(user);
    axios
      // This address will change depends on PORT
      // you are using or after uploading
      .post('https://portfoliocreator.onrender.com/users/login', {
        email: user.email,
        password: user.password,
      })
      .then((user) => {
        setLocalStorage(user);
        window.localStorage.setItem('isAuth', 'true');
        auth.contextValue.setUser({
          isAuth: true,
          msg: '',
        });
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        window.localStorage.setItem('isAuth', 'false');
        auth.contextValue.setUser({
          isAuth: false,
          msg: error.response.data.msg,
        });
        setLoginMessage(error.response.data.msg);
        setTimeout(() => {
          setLoginMessage(false);
        }, 2000);
      });
  }

  // function handleFacebook() {
  //   axios
  //     // This address will change depends on PORT
  //     // you are using or after uploading
  //     .get('http://localhost:8080/auth/facebook')
  //     .then((user) => {
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h3>Please Login</h3>
        {loginMessage && <div className='error'>{loginMessage}</div>}
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
          Password
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
        <button type='submit' className='login-button'>
          Log In
        </button>
        <a
          href='https://portfoliocreator.onrender.com/auth/facebook'
          role='button'
          className='login-button login-button-facebook'
        >
          Log in With Facebook
        </a>
        <div className='login-forgot-password-link'>
          <Link to='/users/forgot-password'>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
