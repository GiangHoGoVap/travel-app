import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import sanityClient, { urlFor } from '../../../client';

const { width } = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
  const categoryIcons = [
    <Foundation name="mountains" size={25} color="#04555c" />,
    <Icon name="beach-access" size={25} color="#04555c" />,
    <MaterialCommunityIcons name="brightness-percent" size={25} color="#04555c" />,
    <Icon name="near-me" size={25} color="#04555c" />,
  ];
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'place']{ details, image, location,
      name, price}`
      )
      .then((data) => {
        setPlaces(data);
      });
  }, []);
  const ListCategories = () => {
    return (
      <View style={styles.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={styles.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const ListRegions = () => {
    const [regions, setRegions] = useState([]);
    useEffect(() => {
      sanityClient.fetch(`*[_type == 'region']{ image, name, places[]-> }`).then((data) => {
        setRegions(data);
      });
    }, []);
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        {regions.map((region, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RegionDetailsScreen', region)}
          >
            <View style={styles.categoryBtn}>
              <View style={styles.categoryBtnImgCon}>
                <Image
                  source={{ uri: urlFor(region.image).url() }}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'cover',
                    borderRadius: 30,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color: 'white',
                }}
              >
                {region.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', place)}
      >
        <ImageBackground style={styles.cardImage} source={{ uri: urlFor(place.image).url() }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon name="place" size={20} color="white" />
              <Text style={{ marginLeft: 5, color: 'white' }}>{place.location}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="star" size={20} color="#f5a623" />
              <Text style={{ marginLeft: 5, color: 'white' }}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({ place }) => {
    return (
      <ImageBackground style={styles.rmCardImage} source={{ uri: urlFor(place.image).url() }}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}
        >
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="place" size={22} color="white" />
              <Text style={{ color: 'white', marginLeft: 5 }}>{place.location}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="star" size={22} color="#f5a623" />
              <Text style={{ color: 'white', marginLeft: 5 }}>5.0</Text>
            </View>
          </View>
          <Text style={{ color: 'white', fontSize: 13 }}>{place.details}</Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={false} backgroundColor="#04555c" />
      <View style={styles.header}>
        <Icon name="sort" size={28} color="white" />
        <Icon name="notifications-none" size={28} color="white" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: '#04555c',
            height: 120,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Explore the</Text>
            <Text style={styles.headerTitle}>beautiful places</Text>
            <View style={styles.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput placeholder="Search place" style={{ color: 'black' }} />
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={styles.sectionTitle}>Regions</Text>
        <ListRegions />
        <Text style={styles.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <Card place={item} />}
          />
          <Text style={styles.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={places}
            renderItem={({ item }) => <RecommendedCard place={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#04555c',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#dddedd',
    shadowOpacity: 1,
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: '#e1e8e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  categoriesListContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 115,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: '#04555c',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
