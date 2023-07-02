import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useEffect} from 'react';
import {SongProps} from '../../types/types';
import {useRoute} from '@react-navigation/native';

import {SongDetailScreenProps} from '../../navigation/MainNavigation';
import {Colors} from '../../styles/colors';

import AudioPlayer from '../../components/AudioPlayer';

const screenHeight = Dimensions.get('window').height;

const SongDetailScreen: React.FC<SongDetailScreenProps> = () => {
  const {
    params: {song},
  } = useRoute<SongDetailScreenProps>();

  useEffect(() => {
    // console.log('useEffect', song);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Text style={styles.heading} numberOfLines={1}>
            {song.trackName}
          </Text>
          <View style={styles.row}>
            <Image
              style={styles.songThumb}
              source={{uri: song.artworkUrl100}}
            />
            <View>
              <View style={styles.subHeaderContainer}>
                <View>
                  <Text style={styles.headerSubText}>{'Genre:'}</Text>
                  <Text style={styles.headerSubValue}>
                    {song.primaryGenreName}
                  </Text>
                </View>
                <View style={styles.marginLeft}>
                  <Text style={styles.headerSubText}>{'Country:'}</Text>
                  <Text style={styles.headerSubValue}>{song.country}</Text>
                </View>
              </View>
              <View style={styles.playButton}>
                <AudioPlayer song={song} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Text style={styles.artistText}>{'Artist Name: '}</Text>
          <Text style={styles.artistText} numberOfLines={1}>
            {song.trackName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.artistText, styles.normalText]}
            numberOfLines={1}>
            {'Collection Name: '}
          </Text>
          <Text style={[styles.artistText, styles.normalText]}>
            {song.collectionName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.artistText, styles.normalText]}>
            {'Track Price: '}
          </Text>
          <Text style={[styles.artistText, styles.normalText]}>
            {`USD ${song.trackPrice}`}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.artistText, styles.normalText]}>
            {'Release Date: '}
          </Text>
          <Text style={[styles.artistText, styles.normalText]}>
            {`${song.releaseDate.slice(0, 4)}/${song.releaseDate.slice(
              5,
              7,
            )}/${song.releaseDate.slice(8, 10)}`}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.artistText, styles.normalText]}>
            {'Description: '}
          </Text>
          <Text style={[styles.artistText, styles.normalText]}>
            {song.trackCensoredName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SongDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    backgroundColor: Colors.brand,
    height: screenHeight * 0.3,
    width: '100%',
    // position: 'relative',
  },
  header: {
    marginTop: 80,
    marginLeft: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  songThumb: {
    height: 100,
    width: 100,
    borderRadius: 8,
    marginTop: 15,
  },
  subHeaderContainer: {
    marginTop: 20,
    marginLeft: 15,
    flexDirection: 'row',
  },
  headerSubText: {
    fontSize: 12,
    marginBottom: 5,
  },
  marginLeft: {
    marginLeft: 18,
  },
  headerSubValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  playButton: {
    marginLeft: 30,
    marginTop: 15,
    backgroundColor: Colors.background,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
  },
  bottom: {
    flex: 1,
    backgroundColor: Colors.background,
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  artistText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    marginRight: 5,
  },
  normalText: {
    fontWeight: 'normal',
  },
});
