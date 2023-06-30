import {configureStore} from '@reduxjs/toolkit';
import SignInReducer from './SignInSlice';

export default configureStore({
  reducer: {
    SignIn: SignInReducer,
  },
});
