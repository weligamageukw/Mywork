import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles/colors';

const Library = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <Text style={{color: 'white', margin: 50, fontSize: 20}}>
        Library Screen
      </Text>
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({});
