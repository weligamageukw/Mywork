import ListItem from '../src/components/ListItem';
import renderer from 'react-test-renderer';

jest.mock('../src/components/ListItemContent', () => () => 'ListItemContent');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: jest.fn()}),
}));

const ListItemProps = {
  cocktail: {
    idDrink: '123',
    strDrink: 'abc',
    strDrinkThumb: 'image_path',
    strInstructions: 'Instructions',
    strCategory: 'Category',
    strIngredient1: 'Ingredient1',
    strIngredient2: 'Ingredient2',
    strIngredient3: 'Ingredient3',
    isFavourite: true,
  },
};
describe('render listItem', () => {
  it('should prperly render list item', () => {
    const tree = renderer.create(<ListItem {...ListItemProps} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
