import React, { useState } from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import { Link } from 'react-router-dom';

function DownloadFileFinal({ fName, lName, userId }) {
  const [isActive, setIsActive] = useState(false);

  function handleDownload(e) {
    e.preventDefault();

    axios({
      url: `https://portfoliocreator.onrender.com/users/downloadFile/${userId}`,
      method: 'POST',
      responseType: 'blob',
      data: userId,
    })
      .then((res) => {
        FileDownload(res.data, `${fName}_${lName}_resume.pdf`);
        setIsActive(false);
      })
      .catch((err) => {
        console.log(err);
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 2000);
      });
  }

  return (
    <>
      <div className='resume-div'>
        <Link
          to='#'
          onClick={handleDownload}
          className={isActive ? 'button button-wiggle' : 'button'}
        >
          Resume
        </Link>
      </div>
    </>
  );
}

export default DownloadFileFinal;
