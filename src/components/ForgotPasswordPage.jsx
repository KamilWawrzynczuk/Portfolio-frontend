import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import axios from 'axios';

function ForgotPasswordPage() {
  const auth = useAuth();
  const [email, setEmail] = useState('');

  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  const navigate = useNavigate();

  function handleChange(event) {
    const { value } = event.target;
    setEmail((prevValue) => value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      axios
        .post(`https://portfoliocreator.onrender.com/users/forgot-password/`, {
          email,
        })
        .then((res) => {
          setSuccess(true);
          window.localStorage.setItem('isAuth', 'false');
          auth.contextValue.setUser({
            isAuth: false,
            msg: '',
          });
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 3000);
        })
        .catch((error) => {
          window.localStorage.setItem('isAuth', 'false');
          auth.contextValue.setUser({
            isAuth: false,
            msg: error.response.data.msg,
          });
        });
    } catch (error) {
      console.log(error, 'error w forgot password page');
      window.localStorage.setItem('isAuth', 'false');
      auth.contextValue.setUser({
        isAuth: false,
        msg: error.response.data.msg,
      });
    }
  }

  return success ? (
    <div className='login-form'>
      <h2>Success</h2>
      <p>We have sent you an email with a reset link.</p>
      <p>
        Click to go to <Link to='/'>home page</Link> or wait to be redirected.
      </p>
    </div>
  ) : (
    <div className='login-form'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h3>Enter email</h3>
        {/* {auth.contextValue.user.msg && (
          <div className='error'>{auth.contextValue.user.msg}</div>
        )} */}
        <label className='login-label' htmlFor='email'>
          Email
        </label>
        <input
          className='login-input'
          type='text'
          placeholder='Email'
          name='email'
          id='email'
          value={email}
          onChange={handleChange}
        />
        <button type='submit' className='login-button'>
          Confirm
        </button>
        <div className='login-forgot-password-link'>
          <Link to='/'>Go to home page</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
