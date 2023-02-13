import { getExpiration } from './getExpiration';
import moment from 'moment';

export function isTokenExpire() {
  return moment(moment().toDate()).isBefore(getExpiration());
}
