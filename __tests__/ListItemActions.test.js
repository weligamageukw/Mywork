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
