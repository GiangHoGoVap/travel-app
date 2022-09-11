import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';

const OnBoardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/onboardImage.jpeg')}>
        <View style={style.details}>
          <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold'}}>
            Discover
          </Text>
          <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold'}}>
            Vietnam with us
          </Text>
          <Text style={{color: 'white', lineHeight: 25, marginTop: 15}}>
            Vietnam has fully reopened for international tourism without any
            Covid-19 restrictions. Now you are free to discover and enjoy
            various wild nature destinations. Holiday is coming, let’s get away
            from it all.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Home')}>
            <View style={style.btn}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardScreen;
