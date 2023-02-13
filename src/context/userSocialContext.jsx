import React, { createContext, useReducer, useEffect } from 'react';

export const userSocialContext = createContext();

let initialValue = [];

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return { ...state,...action.payload };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}

function UserSocialContext({ children }) {
  const [userSocialState, dispatchUserSocialState] = useReducer(
    reducer,
    initialValue
  );

  return (
    <userSocialContext.Provider
      value={{ userSocialState, dispatchUserSocialState }}
    >
      {children}
    </userSocialContext.Provider>
  );
}

export default UserSocialContext;
