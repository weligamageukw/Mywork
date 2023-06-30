import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors} from '../../styles/colors';

import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../redux/SignInSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleUsernameButtonPress = () => {
    console.log('Username Button Pressed');
  };

  const handlePasswordButtonPress = () => {
    console.log('Password Button Pressed');
  };

  const handleForgotPasswordPress = () => {
    console.log('Forgot Password Pressed');
  };

  async function userLogin(username: string, password: string) {
    // try {
    //   const response = await service.get('/search.php', {
    //     params: {
    //       f: letter,
    //     },
    //   });
    //   setCocktails(response.data.drinks.slice(0, 6));
    // } catch (err: any) {
    //   if (err.response) {
    //     console.log(err.response.data);
    //     Alert.alert('Error getting cocktails');
    //   } else {
    //     console.log(`Error: ${err.message}`);
    //     Alert.alert('Unknown error!');
    //   }
    // }
    // setLoading(false);
  }

  const postData = {
    email: 'example@example.com',
    password: 'examplePassword',
  };

  const sendPostRequest = async () => {
    try {
      const config = {
        email: 'qxkeb06yat@buy-blog.com',
        password: 'test@123',
      };

      const response = await axios({
        method: 'post',
        url: 'https://api.example.com/login',
        data: {
          email: 'qxkeb06yat@buy-blog.com',
          password: 'test@123',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginPress = () => {
    console.log('Login Pressed');
    // sendPostRequest();
    dispatch(signIn(true));
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.background}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={handleUsernameChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={{alignSelf: 'flex-start', marginLeft: 20}}
          onPress={handleForgotPasswordPress}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          {/* <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}> */}
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => console.log('Continue with Option 1')}>
            <Image
              source={require('../../assets/google.png')}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => console.log('Continue with Option 2')}>
            <Image
              source={require('../../assets/facebook.png')}
              style={{width: 60, height: 60}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
        <View
          style={{
            width: '60%',
            height: 3,
            backgroundColor: Colors.primary,
            marginTop: 25,
          }}
        />
        <Text style={[styles.termsText, {fontSize: 18}]}>
          Not have an account yet? join us
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    marginTop: 100,
    marginBottom: 32,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#aaa',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: Colors.primary,
  },
  forgotPasswordText: {
    textAlign: 'left',
    marginBottom: 8,
    color: Colors.primary,
    fontSize: 12,
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: Colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 16,
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
  },
  orText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  roundedButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 10,
  },
  termsText: {
    marginTop: 16,
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primary,
  },
});

export default Login;
