import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
//@ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {selectCocktails, removeCocktails} from '../redux/CocktailSlice';
import {Colors} from '../styles/colors';
import {cocktailProps} from '../types/types';

type ListItemActionsProps = {
  comments: string;
  likes: string;
  // isSelected: boolean;
  cocktail: cocktailProps;
};

const ListItemActions = ({
  comments,
  likes,
  // isSelected,
  cocktail,
}: ListItemActionsProps) => {
  const [isFavourite, setFavourite] = useState(cocktail.isFavourite);
  // const [isFavourite, setFavourite] = useState(isSelected);
  const dispatch = useDispatch();

  const FavouriteHandler = () => {
    if (!isFavourite) {
      let tempElement = {
        ...cocktail,
        isFavourite: true,
      };
      dispatch(selectCocktails(tempElement));
    } else {
      dispatch(removeCocktails(cocktail.idDrink));
    }
    setFavourite(prev => !prev);
  };

  return (
    <View style={styles.rowActionsContentRight}>
      <View style={styles.row}>
        <View style={styles.elemAction}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              Alert.alert('View Comments');
            }}
            style={styles.iconStyle}>
            <FontAwesome
              style={styles.actionButton}
              name="comment-o"
              size={15}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.actionText}>{comments}</Text>
        </View>
        <View style={styles.elemAction}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              FavouriteHandler();
            }}
            style={styles.iconStyle}>
            <FontAwesome
              style={styles.actionButton}
              name={isFavourite ? 'heart' : 'heart-o'}
              size={15}
              color={isFavourite ? Colors.button : Colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.actionText}>{likes}</Text>
        </View>
      </View>
    </View>
  );
};

export default ListItemActions;

const styles = StyleSheet.create({
  rowActionsContentRight: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 8,
    marginRight: 16,
  },
  row: {flexDirection: 'row'},
  actionButton: {
    width: 15,
    height: 18,
    marginRight: 6,
  },
  iconStyle: {padding: 5},
  elemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
  actionText: {
    fontSize: 12,
    color: '#eee',
    marginLeft: -3,
  },
});
