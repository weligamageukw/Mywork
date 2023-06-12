import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import ListItem from '../../components/ListItem';

import {cocktailProps} from '../../types/types';
import {Colors, Colors as colors} from '../../styles/colors';

type StateProps = {
  list: cocktailProps[];
};

const Favourite = (): JSX.Element => {
  const [cocktails, setCocktails] = useState<cocktailProps[]>([]);
  const cocktailList: StateProps = useSelector((state: any) => state.cocktails);

  useEffect(() => {
    if (cocktailList.list.length == 0) {
      setCocktails([]);
    }
    setCocktails(cocktailList.list);
  }, [cocktailList]);

  return (
    <SafeAreaView style={styles.container}>
      {cocktails.length > 0 ? (
        <FlatList
          testID="favouritelList"
          data={cocktails}
          keyExtractor={item => {
            return item.idDrink;
          }}
          renderItem={({item}) => {
            return <ListItem cocktail={item} />;
          }}
          ListHeaderComponentStyle={{backgroundColor: Colors.secondry}}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      ) : (
        <Text style={styles.emptyText}>
          There are no favourite cocktails. Please add some. 🍹🍸😎
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.primary,
    flex: 1,
    alignSelf: 'center',
    marginTop: 150,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.tertiary,
  },
});
