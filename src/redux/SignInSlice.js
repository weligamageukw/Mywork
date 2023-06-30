import {createSlice} from '@reduxjs/toolkit';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'm', 'i', 'l', 't'];

export const SignInSlice = createSlice({
  name: 'favouriteCocktails',
  initialState: {
    letter: 'q',
    authrized: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.authrized = action.payload;
      console.log('signIn--', state.authrized);
    },
    // signOut: (state, action) => {
    //   state.authrized = false;
    //   console.log('signOut--', state.authrized);
    // },
  },
});

export const {signIn, signOut} = SignInSlice.actions;

export default SignInSlice.reducer;
