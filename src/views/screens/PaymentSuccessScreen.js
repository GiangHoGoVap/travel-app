import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const PaymentSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.main}>
      <Image source={require('../../assets/success.png')} style={styles.successIcon} />
      <Text style={styles.text}>Successful Payment</Text>
      <Text style={styles.text}>Bon Voyage!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.goBackButton}
      >
        <Text style={styles.buttonText}>Back to Homepage</Text>
      </TouchableOpacity>
      <Image source={require('../../assets/traveling.png')} style={styles.travelingImage} />
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 115,
    height: 115,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goBackButton: {
    marginTop: 20,
    width: 200,
    height: 50,
    backgroundColor: '#00c851',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
  },
  travelingImage: {
    width: 200,
    height: 115,
    marginTop: 20,
  },
});
