import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const userProjectsContext = createContext();

let initialValue = [];

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
    
      return [...action.payload];
    case 'EDIT':
     
      return state.map((ele, index) => {
        if (ele.projectId === action.payload[0].projectId) {
          return action.payload[0];
        } else {
          return ele;
        }
      });
    case 'DELETE':

      return state.filter((project) => project.projectId !== action.payload);
    case 'ADD':

      return [...state, ...action.payload];
    default:
      return state;
  }
}

function UserProjectsContext({ children }) {
  const [userState, dispatchUserState] = useReducer(reducer, initialValue);

  return (
    <userProjectsContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </userProjectsContext.Provider>
  );
}

export default UserProjectsContext;
