import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put(
          'https://portfoliocreator.onrender.com/users/verify-email',
          { verificationString }
        );
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    };

    loadVerification();
  }, [verificationString]);

  if (isLoading) return <p>Loading...</p>;
  return isSuccess ? (
    <div className='user-intro login-form-success'>
      <h2>Success</h2>
      <p>Your email is verified.</p>
      <p>
        Click <Link to='/login'>here</Link> to log in.
      </p>
    </div>
  ) : (
    <div className='login-form login-form-success'>
      <h2>Ups...</h2>
      <p>Look like your verification code is not valid.</p>
      <p>
        Click <Link to='/'>here</Link> to go back to home page.
      </p>
    </div>
  );
};
