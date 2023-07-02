import {createSlice} from '@reduxjs/toolkit';

export const PlayedSongsSlice = createSlice({
  name: 'recentlyPlayed',
  initialState: {
    songs: [],
  },
  reducers: {
    addSongs: (state, action) => {
      state.songs.push(action.payload);
      console.log('addSongs', state.songs.length);
    },
  },
});

export const {addSongs} = PlayedSongsSlice.actions;

export default PlayedSongsSlice.reducer;
