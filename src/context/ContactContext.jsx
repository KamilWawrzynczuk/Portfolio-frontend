import React, { createContext, useReducer, useEffect } from 'react';

export const contactContext = createContext();

let initialValue = [];

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':

      return { ...action.payload };
    case 'EDIT':
   
      return { ...action.payload };
    default:
      return state;
  }
}

function ContactContext({ children }) {
  const [contactState, dispatchContactState] = useReducer(
    reducer,
    initialValue
  );

  return (
    <contactContext.Provider value={{ contactState, dispatchContactState }}>
      {children}
    </contactContext.Provider>
  );
}

export default ContactContext;
