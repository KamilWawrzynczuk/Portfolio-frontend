import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const proudOfContext = createContext();

let initialValue = [];

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
     
      return action.payload;
    case 'EDIT':
     
      return action.payload;
    default:
      return state;
  }
}

function ProudOfContext({ children }) {
  const [proudOfState, dispatchProudOfState] = useReducer(
    reducer,
    initialValue
  );

  return (
    <proudOfContext.Provider value={{ proudOfState, dispatchProudOfState }}>
      {children}
    </proudOfContext.Provider>
  );
}

export default ProudOfContext;
