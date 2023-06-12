import React, {useLayoutEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import ListItemActions from './ListItemActions';
import {cocktailProps} from '../types/types';

type ListItemContentProps = {
  cocktail: cocktailProps;
};

const ListItemContent = ({cocktail}: ListItemContentProps) => {
  useLayoutEffect(() => {
    let tempElement;
    if (cocktail.isFavourite) {
      tempElement = {
        ...cocktail,
        isFavourite: true,
      };
    } else {
      tempElement = {
        ...cocktail,
        isFavourite: false,
      };
    }
  }, []);
  return (
    <View style={styles.singleItem}>
      <View style={styles.row}>
        <Image
          style={styles.cockTailThumb}
          source={{uri: cocktail.strDrinkThumb}}
        />
        <View style={styles.cocktailContentContainer}>
          <View style={styles.rowTop}>
            <Text numberOfLines={1} style={[styles.header]}>
              {cocktail.strDrink}
            </Text>
            <Text style={styles.gray} numberOfLines={1}>
              {' '}
              ~ {cocktail.strCategory}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Text numberOfLines={3} style={[styles.description]}>
              {cocktail.strInstructions}
            </Text>
            <View style={styles.rowActions}>
              <ListItemActions
                comments={'5'}
                likes={'10'}
                // isSelected={cocktail.isFavourite ? true : false}
                cocktail={cocktail}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gray: {
    color: '#bbb',
    fontSize: 13,
    paddingRight: 2,
  },
  cockTailThumb: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginRight: 12,
    marginTop: 4,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 4,
    paddingRight: 4,
    color: '#eee',
  },
  description: {
    fontSize: 14,
    color: '#eee',
  },
  singleItem: {
    paddingHorizontal: 12,
    minHeight: 80,
    flex: 1,
    paddingVertical: 16,
  },
  rowTop: {
    flexDirection: 'row',
  },
  rowActions: {
    flexGrow: 1,
    maxHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cocktailContentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default ListItemContent;
