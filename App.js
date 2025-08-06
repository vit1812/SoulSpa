// App.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './components/HomeScreen';
import PauseScreen from './components/PauseScreen';
import PauseSessionScreen from './components/PauseSessionScreen';
import PauseConfirmationScreen from './components/ConfirmationScreen';
import MorningScreen from './components/MorningScreen';
import BedtimeScreen from './components/BedtimeScreen';
import SoulResetScreen from './components/SoulResetScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':           iconName = 'home';            break;
              case 'SoulfulPause':   iconName = 'leaf';            break;
              case 'Morning':        iconName = 'sunny';           break;
              case 'Bedtime':        iconName = 'moon';            break;
              case 'SoulReset':      iconName = 'refresh-circle';  break;
              default:               return null;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // hide the PauseSession & PauseConfirmation tabs
          tabBarButton: (props) =>
            ['PauseSession','PauseConfirmation'].includes(route.name)
              ? null
              : <TouchableOpacity {...props} />,
          tabBarActiveTintColor: '#6A5ACD',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="SoulfulPause"
          component={PauseScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="PauseSession"
          component={PauseSessionScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name="PauseConfirmation" component={PauseConfirmationScreen} />
        <Tab.Screen name="Morning" component={MorningScreen} />
        <Tab.Screen name="Bedtime" component={BedtimeScreen} />
        <Tab.Screen name="SoulReset" component={SoulResetScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
