import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const userContext = createContext();

let initialValue = {};

if (localStorage.getItem('userState') === null) {
  initialValue = {
    intro: {
      greeting: 'Hi, my name is',
      name: 'John Doe',
      header: 'I am a Designer',
      specialty: `I am specializing in UX Design`,
      current: `Currently, i am searching for new challenges`,
      proudOf: `Projects I'm proud of`,
    },
  };
} else {
  initialValue = {
    intro: JSON.parse(localStorage.getItem('userState')),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'INTRO':

      return { ...action.payload };
    default:
      return state;
  }
}

function UserContext({ children }) {
  const [userState, dispatchUserState] = useReducer(reducer, initialValue);

  return (
    <userContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </userContext.Provider>
  );
}

export default UserContext;
