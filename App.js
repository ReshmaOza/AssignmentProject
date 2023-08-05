import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screen/HomeScreen';
import InfoFormPage from './src/Screen/InfoFormPage';
import { Provider } from 'react-redux';
import store from './src/Redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome', headerTintColor: '#000000' }}
          />
          <Stack.Screen
            name="InfoFormPage"
            component={InfoFormPage}
            options={{ title: '', headerTintColor: '#000000' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
