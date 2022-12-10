import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import RegionDetailsScreen from './src/views/screens/RegionDetailsScreen';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import BasketScreen from './src/views/screens/BasketScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import RegisterScreen from './src/views/screens/RegisterScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="RegionDetailsScreen" component={RegionDetailsScreen} />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              presentation: 'fullScreenModal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              presentation: 'fullScreenModal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BasketScreen"
            component={BasketScreen}
            options={{ presentation: 'modal', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
