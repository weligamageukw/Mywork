import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {Colors} from '../../styles/colors';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Songs from '../../data/songs.json';

import {SongProps} from '../../types/types';

const Explore = () => {
  const [text, onChangeText] = React.useState('');
  const [list, setList] = React.useState<SongProps[]>();

  const handleInputChange = () => {};

  const handleSearch = () => {
    // onSearch(query);
  };

  useEffect(() => {
    // console.log('DATA ', Songs);
    setList(Songs?.results);
  }, []);

  // const Item = (song: SongProps) => {
  //   return (
  //     <View style={styles.item}>
  //       <Text style={styles.title}>{song.trackName}</Text>
  //     </View>
  //   );
  // };

  console.log('LIST OPF ', list);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name={'search-outline'} size={25} color={Colors.brand} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={onChangeText}
          value={text}
        />
        <Button title="Cancel" onPress={handleSearch} />
      </View>
      <View>
        <FlatList
          data={list}
          renderItem={({item}) => {
            return (
              <View style={styles.item}>
                <Image
                  style={styles.songThumb}
                  source={{uri: item.artworkUrl100}}
                />
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.title}>{item.trackName}</Text>
                  <Text style={styles.title}>{item.artistName}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item?.trackId}
        />
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
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
