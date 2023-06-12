import renderer from 'react-test-renderer';
import ListItemContent from '../src/components/ListItemContent';

jest.mock('../src/components/ListItemActions', () => () => 'ListItemActions');

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
describe('render listItemContent', () => {
  it('should prperly render list item', () => {
    const tree = renderer
      .create(<ListItemContent {...ListItemProps} />)
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
