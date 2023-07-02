import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SongProps} from '../types/types';
import {Colors} from '../styles/colors';

//redux
import {useDispatch} from 'react-redux';
import {addSongs} from '../redux/PlayedSongsSlice';

type AudioPlayerProps = {
  song: SongProps;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({song}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const FinishedLoadingURL = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}) => {
        // console.log('finished loading url', success, url);
      },
    );
    const FinishedPlaying = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        // console.log('finished playing', success);
      },
    );
    return () => {
      FinishedLoadingURL.remove();
      FinishedPlaying.remove();
      stopAudio();
    };
  }, []);

  const playAudio = () => {
    try {
      SoundPlayer.playUrl(song.previewUrl);
      setIsPlaying(true);
      dispatch(addSongs(song));
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const pauseAudio = () => {
    try {
      SoundPlayer.pause();
      setIsPlaying(false);
    } catch (error) {
      console.log('Error pausing audio:', error);
    }
  };

  const stopAudio = () => {
    try {
      SoundPlayer.stop();
      setIsPlaying(false);
      // console.log('stopped playing:');
    } catch (error) {
      console.log('Error stoping audio:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={isPlaying ? pauseAudio : playAudio}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={20}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;
