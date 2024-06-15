import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddMusicScreen from './screens/AddMusicScreen';
import MusicDetailScreen from './screens/MusicDetailScreen';
import EditMusicScreen from './screens/EditMusicScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMusic" component={AddMusicScreen} />
        <Stack.Screen name="MusicDetail" component={MusicDetailScreen} />
        <Stack.Screen name="EditMusic" component={EditMusicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
