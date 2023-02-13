import moment from 'moment';

export function getExpiration() {
  const expiration = localStorage.getItem('expires');
  const expiresAt = JSON.parse(expiration);
  //calculate point in time when token is expired
  return moment(expiresAt);
}
