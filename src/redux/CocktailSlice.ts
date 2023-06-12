import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {cocktailProps} from '../types/types';

type ActionSelect = {
  type: string,
  payload: cocktailProps,
};

type ActionRemove = {
  type: string,
  payload: string,
};

type StateProps = {
  list: cocktailProps[],
  isLoading: boolean,
};

export const CocktailSlice = createSlice({
  name: 'favouriteCocktails',
  initialState: {
    list: [],
    isLoading: false,
  },
  reducers: {
    selectCocktails: (state: StateProps, action: ActionSelect) => {
      state.list.push(action.payload);
    },
    removeCocktails: (state: StateProps, action: ActionRemove) => {
      let index = state.list.findIndex(
        (obj: cocktailProps) => obj.idDrink == action.payload,
      );
      if (index > -1) {
        state.list.splice(index, 1);
      }
    },
  },
});

export const {selectCocktails, removeCocktails} = CocktailSlice.actions;

export default CocktailSlice.reducer;
