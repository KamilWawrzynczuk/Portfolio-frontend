import { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/auth';

function PasswordResetLandingPage() {
  const auth = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwords, setNewPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  const navigate = useNavigate();

  const { passwordResetCode } = useParams();

  function handleChange(event) {
    const { name, value } = event.target;
    setNewPasswords((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      axios
        .patch(`https://portfoliocreator.onrender.com/users/reset-password/`, {
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
          passwordResetCode,
        })
        .then((res) => {
          setIsSuccess(true);
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
      console.log(error, 'error w reset password page');
      window.localStorage.setItem('isAuth', 'false');
      auth.contextValue.setUser({
        isAuth: false,
        msg: error.response.data.msg,
      });
    }
  }
  return isSuccess ? (
    <div className='login-form'>
      <h2>Success</h2>
      <p>Your password is changed.</p>
      <p>
        Click here to <Link to='/users/login'>login</Link> or wait to be
        redirected.
      </p>
    </div>
  ) : (
    <div className='login-form'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h3>Enter new password </h3>
        {auth.contextValue.user.msg && (
          <div className='error'>{auth.contextValue.user.msg}</div>
        )}
        <label className='login-label' htmlFor='newPassword'>
          New Password
        </label>
        <input
          className='login-input'
          type='password'
          placeholder='newPassword'
          name='newPassword'
          id='newPassword'
          value={passwords.newPassword}
          onChange={handleChange}
        />
        <label className='login-label' htmlFor='confirmPassword'>
          Confirm Password
        </label>
        <input
          className='login-input'
          type='password'
          placeholder='confirmPassword'
          name='confirmPassword'
          id='confirmPassword'
          value={passwords.confirmPassword}
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

export default PasswordResetLandingPage;
