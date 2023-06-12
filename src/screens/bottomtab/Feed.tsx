import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ListItem from '../../components/ListItem';
import {useEffect, useState, useRef} from 'react';

import service from '../../services/service';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {cocktailProps} from '../../types/types';
import {Colors, Colors as colors} from '../../styles/colors';

type UserActionsProps = {
  setSearchResults: Function;
  refreshList: Function;
};

const UserActions = ({setSearchResults, refreshList}: UserActionsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const queryLetterCurrent = useRef('');
  const queryLetterPrev = useRef('');

  async function searchCocktails(query: string) {
    try {
      const response = await service.get('/search.php', {
        params: {
          f: query,
        },
      });
      if (response.data.drinks.length > 0) {
        setSearchResults(response.data.drinks.slice(0, 10));
      }
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        Alert.alert('Error getting cocktails');
      } else {
        console.log(`Error: ${err.message}`);
        Alert.alert('Unknown error!');
      }
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      if (queryLetterPrev.current != queryLetterCurrent.current) {
        queryLetterPrev.current = queryLetterCurrent.current;
        searchCocktails(queryLetterCurrent.current);
      }
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder="Search"
        placeholderTextColor={'#ccc'}
        clearButtonMode="always"
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={query => {
          if (query.length > 0) {
            queryLetterCurrent.current = query.slice(0, 1);
          } else {
            queryLetterCurrent.current = '';
          }
          handleSearch(query);
        }}
      />
      <TouchableOpacity onPress={() => refreshList()}>
        <FontAwesome name={'refresh'} size={20} color={'#eee'} />
      </TouchableOpacity>
    </View>
  );
};

const Feed = () => {
  const [cocktails, setCocktails] = useState<cocktailProps[]>([]);
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'm', 'i', 'l', 't'];
  const queryLetter = useRef('a');
  const [isLoading, setLoading] = useState(false);

  function getLetter() {
    const random = Math.floor(Math.random() * letters.length);
    return letters[random];
  }

  async function fetchCocktails(letter: string) {
    try {
      const response = await service.get('/search.php', {
        params: {
          f: letter,
        },
      });
      setCocktails(response.data.drinks.slice(0, 6));
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
    fetchCocktails(queryLetter.current);
  }, []);

  const setSearchCocktails = (searchList: cocktailProps[]) => {
    setCocktails(searchList);
  };

  function refreshList() {
    let letter = getLetter();
    queryLetter.current = letter;
    fetchCocktails(letter);
  }

  return (
    <SafeAreaView style={styles.container}>
      {UserActions({
        setSearchResults: setSearchCocktails,
        refreshList: refreshList,
      })}
      {cocktails.length > 0 && !isLoading ? (
        <FlatList
          testID="mainCocktailList"
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
        <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />
      )}
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbb',
  },
  inputWrapper: {
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  searchInput: {
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: Colors.secondry,
    borderWidth: 1,
    borderRadius: 8,
    width: '88%',
    color: Colors.tertiary,
  },
});
