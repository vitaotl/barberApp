import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet } from 'react-native';

import UserContextProvider from './src/contexts/UserContext'
import MainStack from './src/stacks/MainStack'

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    borderColor: 'red',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


