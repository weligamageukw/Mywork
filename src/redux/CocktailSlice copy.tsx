import {createSlice, AsyncThunk} from '@reduxjs/toolkit';
import {cocktailProps} from '../types/types';

type ActionSelect = {
  type: string;
  payload: cocktailProps;
};

type ActionRemove = {
  type: string;
  payload: string;
};

export const CocktailSlice = createSlice({
  name: 'favouriteCocktails',
  initialState: [],
  reducers: {
    selectCocktails: (state: cocktailProps[], action: ActionSelect) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeCocktails: (state: cocktailProps[], action: ActionRemove) => {
      // console.log(action.payload);
      let index = state.findIndex(
        (obj: cocktailProps) => obj.idDrink == action.payload,
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {selectCocktails, removeCocktails} = CocktailSlice.actions;

export default CocktailSlice.reducer;
