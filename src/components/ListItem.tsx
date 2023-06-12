import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import ListItemContent from './ListItemContent';

import {cocktailProps} from '../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/MainNavigation';

type CocktailListItemProps = {
  cocktail: cocktailProps;
};

const ListItem = ({cocktail}: CocktailListItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <Pressable
      testID="list-item"
      onPress={() => {
        navigation.navigate('CocktailDetailsScreen', {cocktail});
      }}>
      <ListItemContent cocktail={cocktail} />
    </Pressable>
  );
};

export default ListItem;
