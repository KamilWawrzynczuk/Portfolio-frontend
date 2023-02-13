

export function isLogin() {
  return JSON.parse(window.localStorage.getItem('isAuth'));
}
