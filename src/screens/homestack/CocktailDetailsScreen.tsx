import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Colors as colors} from '../../styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../navigation/MainNavigation';
import type {RouteProp} from '@react-navigation/native';

type CocktailDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  'CocktailDetailsScreen'
>;

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'CocktailDetailsScreen'
>;

const cocktailBanner = (imageUrl: string) => {
  return <Image style={styles.cockTailBannerStyles} source={{uri: imageUrl}} />;
};
const ingredients = (
  ingredient1: string,
  ingredient2: string,
  ingredient3: string,
) => {
  return (
    <View>
      {ingredient1 ? (
        <Text style={styles.normalTextStyle}>{ingredient1}</Text>
      ) : null}
      {ingredient2 ? (
        <Text style={styles.normalTextStyle}>{ingredient2}</Text>
      ) : null}
      {ingredient3 ? (
        <Text style={styles.normalTextStyle}>{ingredient3}</Text>
      ) : null}
    </View>
  );
};

const CocktailDetailsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const {
    params: {cocktail},
  } = useRoute<CocktailDetailsScreenRouteProp>();

  // const {cocktail} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: cocktail.strDrink,
    });
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.background}}>
      <View testID="CocktailDetailsScreen" style={styles.container}>
        {/* <StatusBar barStyle={'light-content'} /> */}
        {cocktailBanner(cocktail.strDrinkThumb)}
        <View style={{padding: 10}}>
          <Text style={styles.nameTitle}>{cocktail.strDrink}</Text>
          <Text style={styles.titleText}>Ingredients</Text>
          {ingredients(
            cocktail.strIngredient1,
            cocktail.strIngredient2,
            cocktail.strIngredient3,
          )}
          <Text style={styles.titleText}>Instructions</Text>
          <Text style={styles.normalTextStyle}>{cocktail.strInstructions}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Videos')}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Check Video
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cockTailBannerStyles: {
    width: '100%',
    height: 280,
  },
  normalTextStyle: {
    color: Colors.primary,
    marginBottom: 4,
  },
  titleText: {
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 15,
  },
  nameTitle: {
    color: Colors.primary,
    fontSize: 26,
    alignSelf: 'center',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  button: {
    width: 250,
    height: 45,
    backgroundColor: Colors.button,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
});

export default CocktailDetailsScreen;
