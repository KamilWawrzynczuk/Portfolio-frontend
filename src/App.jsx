import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';
import Profile from './components/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import PasswordResetLandingPage from './components/PasswordResetLandingPage';
import { EmailVerificationLandingPage } from './components/EmailVerificationLandingPage';
import Line from './components/Line';
import { useContext } from 'react';
import { userSocialContext } from './context/userSocialContext';
import axios from 'axios';
import FinalWebsite from './components/Website/FinalWebsite';
import AllDataContext from './context/getAllDataContext';
function App() {
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);
  const isAuth = JSON.parse(window.localStorage.getItem('isAuth'));
  let github;
  let linkedIn;
  let email = '';
  let fName = 'John';
  let lName = 'Doe';
  let websiteTitle = 'Portfolio Creator';

  if (isAuth === false) {
    github = 'www.github.com';
    linkedIn = 'www.linkedin.com';
  } else {
    github = userSocialState.github;
    linkedIn = userSocialState.linkedIn;
    email = userSocialState.email;
    lName = userSocialState.lName;
    fName = userSocialState.fName;
    websiteTitle = userSocialState.websiteTitle;
  }

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const userId = window.localStorage.getItem('user_id');
      axios
        .post('https://portfoliocreator.onrender.com/users/getOne', { userId })
        .then((userData) => {
          dispatchUserSocialState({
            type: 'UPDATE',
            payload: userData.data.social,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const path = useLocation();

  return (
    <>
      {path.pathname.includes('portfolio/') ? (
        <AllDataContext>
          <FinalWebsite />
        </AllDataContext>
      ) : (
        <>
          <Header
            github={github}
            linkedIn={linkedIn}
            websiteTitle={websiteTitle}
          />
          <Routes>
            <Route path='/portfolio/:userId' element={<FinalWebsite />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' exact element={<Login />}></Route>
            <Route path='/register' exact element={<Register />}></Route>
            <Route
              path='/users/forgot-password'
              element={<ForgotPasswordPage />}
            />
            <Route
              path='/users/reset-password/:passwordResetCode'
              element={<PasswordResetLandingPage />}
            />
            <Route
              path='/users/verify-email/:verificationString'
              element={<EmailVerificationLandingPage />}
            />

            <Route path='/users' element={<RequireAuth />}>
              <Route path='/users' element={<User></User>}></Route>
              <Route path='/users/profile' element={<Profile />}></Route>
            </Route>
          </Routes>
          <Line />
          <Footer
            github={github}
            linkedIn={linkedIn}
            email={email}
            lName={lName}
            fName={fName}
            websiteTitle={websiteTitle}
          />
        </>
      )}
    </>
  );
}

export default App;
