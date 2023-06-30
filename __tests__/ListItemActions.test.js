import renderer from 'react-test-renderer';
import ListItemActions from '../src/components/ListItemActions';

jest.mock('react-native-vector-icons/FontAwesome', () => () => 'FontAwesome');
jest.mock('react-redux', () => ({
  useDispatch: () => ({dispatch: jest.fn()}),
}));

const ListItemActionsProps = {
  comments: '19',
  likes: '23',
  // isSelected: false,
  cocktail: {
    idDrink: '123',
    strDrink: 'abc',
    strDrinkThumb: 'image_path',
    strInstructions: 'Instructions',
    strCategory: 'Category',
    strIngredient1: 'Ingredient1',
    strIngredient2: 'Ingredient2',
    strIngredient3: 'Ingredient3',
    isFavourite: false,
  },
};
describe('render listItemActions', () => {
  it('should prperly render listItemActions', () => {
    const tree = renderer
      .create(<ListItemActions {...ListItemActionsProps} />)
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});

// import React from 'react';
// import {render, fireEvent} from '@testing-library/react-native';
// import {UserActions} from '../src/screens/bottomtab/Feed';

// describe('UserActions', () => {
//   it('should update search query correctly', () => {
//     const setSearchResults = jest.fn();
//     const refreshList = jest.fn();

//     const {getByPlaceholderText} = render(
//       <UserActions
//         setSearchResults={setSearchResults}
//         refreshList={refreshList}
//       />,
//     );

//     const searchInput = getByPlaceholderText('Search');

//     fireEvent.changeText(searchInput, 'apple');

//     expect(searchInput.props.value).toBe('apple');
//   });
// });
