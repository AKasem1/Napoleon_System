// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './features/student/studentSlice';
import groupReducer from './features/group/groupSlice';
import authReducer from './features/auth/authSlice';

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state', e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    group: groupReducer,
    student: studentReducer,
    auth: authReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
