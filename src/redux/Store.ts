import {configureStore} from '@reduxjs/toolkit';
import SignInReducer from './SignInSlice';
import SongsReducer from './PlayedSongsSlice';

export default configureStore({
  reducer: {
    SignIn: SignInReducer,
    Songs: SongsReducer,
  },
});
