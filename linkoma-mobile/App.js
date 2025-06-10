import React from "react";
import { Provider as AntProvider } from "@ant-design/react-native";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./src/navigation/MainNavigator";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AntProvider locale={enUS}>
        <AuthProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </AuthProvider>
      </AntProvider>
    </SafeAreaProvider>
  );
}
