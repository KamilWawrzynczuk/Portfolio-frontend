import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import DownloadFileFinal from './DownloadFileFinal';

function HeaderFinal({ github, linkedIn, fName, lName, userId, websiteTitle }) {
  const myRef = useRef();

  const handleClickScroll = (ele) => {
    const element = document.getElementById(ele);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <h1>
                <span
                  className='fa-solid fa-laptop-code'
                  aria-hidden='true'
                ></span>
                <Link to='#'>
                  <span>{websiteTitle}</span>
                </Link>
              </h1>
            </li>
            <li>
              <Link to='#' onClick={() => handleClickScroll('projects')}>
                Projects
              </Link>
            </li>
            <li>
              <Link to='#' onClick={() => handleClickScroll('intro')}>
                About
              </Link>
            </li>
            <li>
              <Link onClick={() => handleClickScroll('contact')} to='#'>
                Contact Me
              </Link>
            </li>
            <li>
              <Link
                to={`//${github}`}
                aria-label='Link to linkedIn'
                target='_blank'
              >
                <span
                  className='fa-brands fa-linkedin'
                  aria-hidden='true'
                ></span>
                <span className='sr-only'>LinkedIn</span>
              </Link>
            </li>
            <li>
              <Link
                to={`//${linkedIn}`}
                aria-label='Link to GitHub'
                target='_blank'
              >
                <i className='fa-brands fa-github' aria-hidden='true'></i>
                <span className='sr-only'>Github</span>
              </Link>
            </li>
            <li>
              <DownloadFileFinal userId={userId} fName={fName} lName={lName} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default HeaderFinal;
