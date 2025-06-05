import React from 'react';
import { Provider as AntProvider } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <AntProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AntProvider>
  );
}
