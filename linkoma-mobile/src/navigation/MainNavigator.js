import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import RoleSelectScreen from '../screens/Auth/RoleSelectScreen';
import AdminDashboard from '../screens/Dashboard/AdminDashboard';
import ResidentDashboard from '../screens/Dashboard/ResidentDashboard';
import EmployeeDashboard from '../screens/Dashboard/EmployeeDashboard';


const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="ResidentDashboard" component={ResidentDashboard} />
      <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
    </Stack.Navigator>
  );
}
