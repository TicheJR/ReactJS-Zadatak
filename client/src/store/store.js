import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import computersReducer from './computersSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    computers: computersReducer
  },
});

export default store;
