import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ArrowLeftIcon color="black" />
      </TouchableOpacity>
      <Image source={require('../../assets/login_image.png')} style={styles.loginImage} />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={onChangeEmail}
        style={styles.textInput}
        autoCapitalize="none"
        value={email}
      />
      <TextInput
        placeholder="Passsword"
        style={styles.textInput}
        secureTextEntry
        onChangeText={onChangePassword}
        autoCapitalize="none"
        value={password}
      />
      <View style={styles.errorView}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              navigation.navigate('Home');
            })
            .catch((error) => {
              const errorCode = error.code;
              setErrorMessage(error.message);
            });
        }}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    top: 70,
    left: 25,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginImage: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  textInput: {
    width: '75%',
    padding: 10,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    borderColor: '#04555c',
    borderWidth: 0.5,
  },
  loginButton: {
    width: '75%',
    height: 45,
    backgroundColor: '#04555c',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#04555c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  errorView: {
    width: '75%',
    padding: 10,
  },
});
