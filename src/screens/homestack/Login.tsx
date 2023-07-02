import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Colors} from '../../styles/colors';
import axios from 'axios';

import {AuthContext} from '../../navigation/AuthContext';
import EncryptedStorage from 'react-native-encrypted-storage';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [usernameCredentialsError, setUsernameCredentialsError] =
    useState<boolean>(true);
  const [passwordCredentialsError, setPasswordCredentialsError] =
    useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const {signIn} = useContext(AuthContext);

  const validateUsername = (text: string) => {
    if (text.trim() === '') {
      setUsernameError('Username is required');
      setUsernameCredentialsError(true);
    } else if (!isValidEmail(text)) {
      setUsernameError('Invalid email address');
      setUsernameCredentialsError(true);
    } else {
      setUsernameError('');
      setUsernameCredentialsError(false);
    }
  };

  const validatePassword = (text: string) => {
    const trimmedPassword = text.trim();
    if (trimmedPassword === '') {
      setPasswordError('Password is required');
      setPasswordCredentialsError(true);
    } else if (trimmedPassword.length < 6) {
      setPasswordError('Password should have at least 6 characters');
      setPasswordCredentialsError(true);
    } else {
      setPasswordError('');
      setPasswordCredentialsError(false);
    }
  };

  const isValidEmail = (email: string) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    validateUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleForgotPasswordPress = () => {
    console.log('Forgot Password Pressed');
  };

  async function storeUserSession() {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          token: 'ACCESS_TOKEN',
          username: 'emeraldsanto',
        }),
      );
    } catch (error) {
      console.log('Error storeUserSession');
    }
  }

  const handleLoginPress = () => {
    if (usernameCredentialsError) {
      Alert.alert('Please enter valid Username');
    } else if (passwordCredentialsError) {
      Alert.alert('Please enter valid Password');
    } else {
      setLoading(true);
      storeUserSession();
      setTimeout(() => {
        setLoading(false);
        signIn();
      }, 3000);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View> */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={toggleShowPassword}>
              <Text style={styles.showPasswordButtonText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.brand} />
        ) : null}
        <TouchableOpacity
          style={{alignSelf: 'flex-start', marginLeft: 20}}
          onPress={handleForgotPasswordPress}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or continue with</Text>
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
        <View style={styles.horizontalLine} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.createAccount}>Not have an account yet?</Text>
          <TouchableOpacity style={{}}>
            <Text style={styles.joinUsText}>Join Us</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 45,
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 8,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: '#aaa',
  },
  input: {
    height: 42,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: Colors.primary,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  forgotPasswordText: {
    textAlign: 'left',
    marginBottom: 8,
    color: Colors.primary,
    fontSize: 12,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  passwordInput: {
    flex: 1,
    height: 42,
    color: Colors.primary,
  },
  showPasswordButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    // backgroundColor: Colors.loginPageLable,
    borderRadius: 4,
    marginLeft: 8,
  },
  showPasswordButtonText: {
    color: Colors.brand,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    width: '90%',
    height: 45,
    backgroundColor: Colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 18,
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  orText: {
    marginTop: 20,
    color: Colors.primary,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
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
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primary,
    marginTop: 25,
  },
  horizontalLine: {
    width: '85%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.primary,
    marginTop: 25,
  },
  createAccount: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.primary,
    marginTop: 25,
  },
  joinUsText: {
    color: Colors.brand,
    fontSize: 16,
    marginLeft: 5,
    marginTop: 25,
  },
});

export default Login;
