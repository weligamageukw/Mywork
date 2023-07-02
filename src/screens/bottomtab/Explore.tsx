import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {Colors} from '../../styles/colors';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Songs from '../../data/songs.json';

import {SongProps} from '../../types/types';

import ListItem from '../../components/ListItem';

type ListItemProps = {
  song: SongProps;
};

const Explore = () => {
  const [list, setList] = useState<SongProps[]>([]);
  const [tempList, setTempList] = useState<SongProps[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const queryLetterCurrent = useRef('');
  const queryLetterPrev = useRef('');

  useEffect(() => {
    setList(Songs?.results as SongProps[]);
    setTempList(Songs?.results as SongProps[]);
  }, []);

  const searchSongs = (letter: string) => {
    if (list.length > 0) {
      try {
        const filteredTracks = list.filter(item => {
          return item.trackName?.startsWith(letter);
        });
        setTempList(filteredTracks);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      if (queryLetterPrev.current != queryLetterCurrent.current) {
        queryLetterPrev.current = queryLetterCurrent.current;
        searchSongs(queryLetterCurrent.current);
      }
    }
  };

  const handleCancelSearch = () => {
    setTempList(list);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name={'search-outline'} size={22} color={Colors.brand} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={'#aaa'}
          clearButtonMode="always"
          onChangeText={query => {
            if (query.length > 0) {
              queryLetterCurrent.current = query.slice(0, 1);
            } else {
              queryLetterCurrent.current = '';
            }
            handleSearch(query);
          }}
          value={searchQuery}
        />
        <Pressable onPress={handleCancelSearch}>
          {({pressed}) => (
            <Text style={{color: pressed ? Colors.secondry : Colors.primary}}>
              {'Cancel'}
            </Text>
          )}
          {/* <Text style={{color: Colors.primary}}>{'Cancel'}</Text> */}
        </Pressable>
        {/* <Button title="Cancel" onPress={() => handleCancelSearch()} /> */}
      </View>
      <View style={{marginTop: 10}}>
        {tempList.length > 0 ? (
          <FlatList
            data={tempList}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            maxToRenderPerBatch={10}
            renderItem={({item}) => {
              return <ListItem song={item} />;
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              marginTop: 50,
              marginLeft: 25,
            }}>
            🎵 Couldn't find any tracks..
          </Text>
        )}
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 15,
    backgroundColor: Colors.background,
  },
  //------
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    color: Colors.primary,
  },
  songThumb: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginRight: 12,
    marginTop: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.brand,
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.primary,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
