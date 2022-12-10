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

const RegisterScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmedPassword, onChangeConfirmedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.slogan}>Discover Vietnam with us</Text>
      <Image source={require('../../assets/register_image.jpg')} style={styles.registerImage} />

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
      <TextInput
        placeholder="Confirm passsword"
        style={styles.textInput}
        secureTextEntry
        onChangeText={onChangeConfirmedPassword}
        autoCapitalize="none"
        value={confirmedPassword}
      />
      <View style={styles.errorView}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          if (password !== confirmedPassword) {
            setErrorMessage('Please type your confirm password again!');
            return;
          }
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              navigation.navigate('Home');
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        }}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.annonymousText}>Continue as Annonymous</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  slogan: {
    color: '#04555c',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20,
  },
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
  registerImage: {
    width: 330,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
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
  registerButton: {
    width: '75%',
    height: 45,
    backgroundColor: '#04555c',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  annonymousText: {
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
