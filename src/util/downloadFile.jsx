import axios from 'axios';
import FileDownload from 'js-file-download';
import { useContext } from 'react';
import { userSocialContext } from '../context/userSocialContext';

export function downloadFile() {
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);

  const userId = localStorage.getItem('user_id');
  axios({
    url: `https://portfoliocreator.onrender.com/users/downloadFile/${userId}`,
    method: 'POST',
    responseType: 'blob',
    data: userId,
  })
    .then((res) => {
      console.log(res, ' w download');
      FileDownload(
        res.data,
        `${userSocialState.fName}_${userSocialState.lName}_resume.pdf`
      );
    })
    .catch((err) => console.log(err));
}
