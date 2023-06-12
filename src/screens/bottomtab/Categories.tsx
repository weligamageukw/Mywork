import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import service from '../../services/service';
import {Colors} from '../../styles/colors';

type CategoryProps = {
  strCategory: string;
};

const Categories = () => {
  const [isLoading, setLoading] = useState(false);
  const [cocktailCategories, setCocktailCategories] = useState<CategoryProps[]>(
    [],
  );

  const ingredients = [
    'Light rum',
    'Applejack',
    'Gin',
    'Sweet Vermouth',
    'Strawberry schnapps',
    'Scotch',
    'Orange bitters',
    'Brandy',
  ];

  async function fetchCocktailCategories() {
    try {
      const response = await service.get('/list.php?c=list');
      setCocktailCategories(response.data.drinks);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        Alert.alert('Error getting cocktails');
      } else {
        console.log(`Error: ${err.message}`);
        Alert.alert('Unknown error!');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCocktailCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>All cocktail categories</Text>
      <Text style={styles.secondry}>
        You can have cocktail with or without Alcohol from our menu 🍸🥤🍹
      </Text>
      {cocktailCategories.length > 0 && !isLoading ? (
        <FlatList
          data={cocktailCategories}
          keyExtractor={item => {
            return item.strCategory;
          }}
          renderItem={({item}) => {
            return (
              <Text style={styles.normalTextStyle}>{item.strCategory}</Text>
            );
          }}
          ListHeaderComponentStyle={{backgroundColor: Colors.secondry}}
        />
      ) : (
        <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 25,
  },
  titleText: {
    color: Colors.button,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    margin: 18,
    alignSelf: 'center',
  },
  secondry: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 12,
  },
  normalTextStyle: {
    color: Colors.primary,
    marginVertical: 8,
    marginLeft: 24,
  },
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbb',
  },
});
