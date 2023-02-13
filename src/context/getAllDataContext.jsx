import React, { createContext, useReducer, useEffect } from 'react';

export const allDataContext = createContext();

let initialValue = [];

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      console.log('fire w UPDATE ALL DATA');
      return { ...action.payload };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}

function AllDataContext({ children }) {
  const [allDataState, dispatchAllDataState] = useReducer(
    reducer,
    initialValue
  );

  return (
    <allDataContext.Provider value={{ allDataState, dispatchAllDataState }}>
      {children}
    </allDataContext.Provider>
  );
}

export default AllDataContext;
