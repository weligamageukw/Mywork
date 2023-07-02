import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Colors} from '../../styles/colors';

import {AuthContext} from '../../navigation/AuthContext';
import * as Songs from '../../data/songs.json';
import {SongProps} from '../../types/types';

//redux
import {useSelector} from 'react-redux';
import SongList from '../../components/SongsList';
import EncryptedStorage from 'react-native-encrypted-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Home = () => {
  const {signOut} = useContext(AuthContext);
  const [list, setList] = useState<SongProps[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const recentlyPlayed = useSelector((state: any) => state.Songs);

  useEffect(() => {
    setList(Songs?.results as SongProps[]);
    retrieveUserSession();
  }, []);

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        console.log('retrieveUserSession-->', session);
      }
    } catch (error) {
      console.log('Error retrieveUserSession');
    }
  }
  // const ListImageItem: React.FC<{song: SongProps}> = ({song}) => {
  //   return (
  //     <View style={styles.listItemContainer}>
  //       <Image style={styles.image} source={{uri: song.artworkUrl100}} />
  //       <View style={styles.overlay}>
  //         <Text style={styles.text} numberOfLines={2}>
  //           {song.trackName}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setLoading(true);
    setTimeout(() => {
      signOut();
    }, 2000);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.heading}>Good Afternoon</Text>
          <Text style={styles.subText}>Recently played</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.roundedImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={require('../../assets/banner.webp')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerText}>Septamber 16</Text>
          <Text style={styles.bannerUserText}>User</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.brand} />
        ) : null}
        <Text style={styles.subHeading}>All Songs </Text>
        <SongList songs={list} />
        <Text style={styles.subHeading}>Recently played </Text>
        {recentlyPlayed?.songs.length > 0 ? (
          <SongList songs={recentlyPlayed.songs} />
        ) : (
          <Text style={{color: 'white', fontSize: 16, margin: 15}}>
            No recently playes tracks. 🎸.
          </Text>
        )}
      </View>

      <Modal visible={showLogoutModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancelLogout}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleConfirmLogout}>
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
    justifyContent: 'space-between',
    width: '90%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  profileButton: {
    alignSelf: 'flex-start',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
    borderRadius: 30,
  },
  roundedImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  subText: {
    fontSize: 18,
    marginVertical: 12,
    color: Colors.primary,
    alignSelf: 'flex-start',
  },
  bannerImage: {
    width: '100%',
    height: screenHeight * 0.3,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    left: 20,
    top: 20,
  },
  bannerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerUserText: {
    color: 'white',
    marginTop: 6,
  },
  listContainer: {
    marginTop: 10,
    height: 220,
    marginBottom: 20,
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
  subHeading: {
    color: 'white',
    marginVertical: 8,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.headerLightBg,
  },
  modalButtonText: {
    color: Colors.headerLightBg,
    fontSize: 16,
  },
});

export default Home;
