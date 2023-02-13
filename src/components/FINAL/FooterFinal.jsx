import React from 'react';
import { Link } from 'react-router-dom';

function FooterFinal({ github, linkedIn, email, lName, fName, websiteTitle }) {
  return (
    <footer>
      <h2>{websiteTitle}</h2>
      <ul>
        <li>
          <Link
            to={`//${linkedIn}`}
            aria-label='Link to linkedIn'
            target='_blank'
          >
            <span className='fa-brands fa-linkedin' aria-hidden='true'></span>
            <span className='sr-only'>LinkedIn</span>
          </Link>
        </li>
        <li>
          <Link
            to={`//${github}`}
            aria-label='Link to linkedIn'
            target='_blank'
          >
            <span className='fa-brands fa-github' aria-hidden='true'></span>
            <span className='sr-only'>Github</span>
          </Link>
        </li>
        <li>
          <Link to={`mailto:${email}`}>
            <span className='fa-solid fa-envelope' aria-hidden='true'></span>
            <span className='sr-only'>Email</span>
          </Link>
        </li>
      </ul>

      <p>
        <small>&copy; 2023 {` ${fName} ${lName}`}. All rights reserved.</small>
      </p>
    </footer>
  );
}

export default FooterFinal;
