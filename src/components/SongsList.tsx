import React, {useState} from 'react';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {SongProps} from '../types/types';

interface SongListProps {
  songs: SongProps[];
}

const ListImageItem: React.FC<{song: SongProps}> = ({song}) => {
  return (
    <View style={styles.listItemContainer}>
      <Image style={styles.image} source={{uri: song.artworkUrl100}} />
      <View style={styles.overlay}>
        <Text style={styles.text} numberOfLines={2}>
          {song.trackName}
        </Text>
      </View>
    </View>
  );
};

const SongList: React.FC<SongListProps> = ({songs}) => {
  const [dataCount, setDataCount] = useState<number>(15);

  const loadMoreData = () => {
    setDataCount(prevCount => prevCount + 15);
  };

  const renderSongItem = ({item}: {item: SongProps}) => {
    return <ListImageItem song={item} />;
  };

  return (
    <FlatList
      data={songs.slice(0, dataCount)}
      renderItem={renderSongItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  listItemContainer: {
    marginRight: 14,
  },
  image: {
    width: 90,
    height: 90,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    opacity: 1,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
});

export default SongList;
