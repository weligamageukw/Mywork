import React, {useLayoutEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

import {SongProps} from '../types/types';
import {Colors} from '../styles/colors';

//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';

type SongDetailScreenProps = {
  song: SongProps;
};

const ListItemContent = ({song}: SongDetailScreenProps) => {
  useLayoutEffect(() => {}, []);
  return (
    <View style={styles.singleItem}>
      <View style={styles.row}>
        <Image style={styles.songThumb} source={{uri: song.artworkUrl100}} />
        <View style={styles.songContentContainer}>
          <View style={styles.rowTop}>
            <Text numberOfLines={1} style={[styles.header]}>
              {song.trackName}
            </Text>
            {/* <ListItemActions comments={'5'} likes={'10'} cocktail={song} /> */}
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                // Alert.alert('View Comments');
              }}
              style={styles.iconStyle}>
              <Ionicons
                // style={styles.actionButton}
                name="ellipsis-horizontal-sharp"
                size={15}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.description]}>{song.artistName}</Text>
            <Text style={styles.gray} numberOfLines={1}>
              {' '}
              ~ {song.collectionName}
            </Text>
            <View style={styles.rowActions}></View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gray: {
    color: '#bbb',
    fontSize: 12,
    paddingRight: 2,
  },
  songThumb: {
    height: 60,
    width: 60,
    borderRadius: 8,
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
    fontSize: 12,
    color: '#eee',
  },
  singleItem: {
    paddingHorizontal: 5,
    minHeight: 80,
    flex: 1,
    paddingVertical: 10,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  songContentContainer: {
    paddingTop: 5,
    flexGrow: 1,
    flexShrink: 1,
  },
  iconStyle: {
    // alignSelf: 'flex-end'
  },
});

export default ListItemContent;
