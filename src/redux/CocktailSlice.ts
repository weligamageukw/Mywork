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

// export const getCocktails = createAsyncThunk(
//   'cocktails/getCocktails',
//   async args => {
//     const response = await fetch(
//       'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
//     );
//     const formatedResponse = await response.json();
//     console.log(formatedResponse);
//     console.log(args);
//     // return formatedResponse;
//   },
// );

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
      // console.log(action.payload);
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
