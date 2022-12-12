import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { urlFor } from '../../../client';
import { addToBasket, selectBasketItems } from '../../slices/orderSlice';

const DetailsScreen = ({ navigation, route }) => {
  const place = route.params;
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7 }} source={{ uri: urlFor(place.image).url() }}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} color="white" onPress={navigation.goBack} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 60,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BasketScreen');
              }}
            >
              {items.length !== 0 && (
                <View style={styles.shoppingCart}>
                  <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
                    {items.length}
                  </Text>
                </View>
              )}
              <Icon name="shopping-cart" size={28} color="white" />
            </TouchableOpacity>
            <Icon name="more-vert" size={28} color="white" />
          </View>
        </View>
        <View style={styles.imageDetails}>
          <Text
            style={{
              width: '70%',
              fontSize: 30,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
            }}
          >
            {place.name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="star" size={30} color="#f5a623" />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>5.0</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <Icon name="favorite" color="red" size={30} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Icon name="place" size={28} color="#04555c" />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#04555c',
            }}
          >
            {place.location}
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>About the trip</Text>
        <Text style={{ marginTop: 20, lineHeight: 22 }}>{place.details}</Text>
      </View>
      <View style={styles.footer}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {place.price} đ
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: '#dddedd',
              marginLeft: 2,
            }}
          >
            /PER PERSON
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bookNowBtn}
          onPress={() => {
            dispatch(addToBasket(place));
          }}
        >
          <Text style={{ color: '#04555c', fontSize: 16, fontWeight: 'bold' }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: 'white',
    borderRadius: 30,
    right: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#dddedd',
    shadowOpacity: 1,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 0.3,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#04555c',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  shoppingCart: {
    backgroundColor: '#FF6347',
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: 'white',
    top: -13,
    right: -4,
  },
});

export default DetailsScreen;
