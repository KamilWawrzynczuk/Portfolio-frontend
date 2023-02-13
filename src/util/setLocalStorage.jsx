import moment from 'moment';

export function setLocalStorage(user) {
  const expires = user.data.expiresIn;
  const number = JSON.stringify(expires).charAt(1);

  const id = user.data.user_id;
  localStorage.setItem('user_id', id);
  localStorage.setItem('token', user.data.token);
  localStorage.setItem(
    'expires',
    JSON.stringify(moment(moment().toDate()).add(number, 'days').valueOf())
  );
}
