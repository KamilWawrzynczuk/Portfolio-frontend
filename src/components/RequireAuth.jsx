import React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const isAuth = JSON.parse(window.localStorage.getItem('isAuth'));

  const location = useLocation();

  if (!isAuth)
    return (
      <section id='intro'>
        <div>
          <h2>You are logged out.</h2>
          <p>
            Click <Link to='/'>here</Link> to go to home page.
          </p>
        </div>
      </section>
    );
  if (!isAuth) {
    return <Navigate to='/' state={{ path: location.pathname }} />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
