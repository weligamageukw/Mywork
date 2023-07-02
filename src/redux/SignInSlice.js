import {createSlice} from '@reduxjs/toolkit';

export const SignInSlice = createSlice({
  name: 'signin',
  initialState: {
    // letter: 'q',
    authrized: false,
  },
  reducers: {
    signIn: (state, action) => {
      // state.authrized = action.payload;
      // console.log('signIn--', state.authrized);
    },
    // signOut: (state, action) => {
    //   state.authrized = false;
    //   console.log('signOut--', state.authrized);
    // },
  },
});

export const {signIn, signOut} = SignInSlice.actions;

export default SignInSlice.reducer;
