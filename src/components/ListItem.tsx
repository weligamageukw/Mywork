import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import ListItemContent from './ListItemContent';

import {SongProps} from '../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/MainNavigation';

type ListItemProps = {
  song: SongProps;
};

const ListItem = ({song}: ListItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <Pressable
      testID="list-item"
      onPress={() => {
        // console.log('Pressable', song);

        navigation.navigate('SongDetailScreen', {song});
      }}>
      <ListItemContent song={song} />
    </Pressable>
  );
};

export default ListItem;
