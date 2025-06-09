import React from 'react';
import { Provider as AntProvider } from '@ant-design/react-native';
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <AntProvider locale={enUS}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AntProvider>
  );
}
