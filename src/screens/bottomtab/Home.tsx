import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../styles/colors';

import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../redux/SignInSlice';

const Home = () => {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signIn(false));
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Good afternoon</Text>
        <Image
          source={require('../../assets/user2.png')}
          style={styles.roundedImage}
        />
      </View>
      <Text style={styles.subText}>Recently played</Text>
      <Image
        source={require('../../assets/banner.jpeg')}
        style={styles.bannerImage}
      />
      <TouchableOpacity
        style={{
          marginTop: 50,
          backgroundColor: Colors.brand,
          width: 100,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
        }}
        onPress={() => {
          handleSignOut();
        }}>
        <Text style={{color: Colors.primary, fontSize: 18, fontWeight: 'bold'}}>
          Logout
        </Text>
      </TouchableOpacity>
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 60,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
    width: '90%',
    // paddingHorizontal: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginRight: 16,
    color: Colors.primary,
  },
  roundedImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  subText: {
    fontSize: 18,
    marginBottom: 16,
    color: Colors.primary,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  bannerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});

export default Home;
