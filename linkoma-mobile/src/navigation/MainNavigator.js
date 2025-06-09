import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import RoleSelectScreen from "../screens/Auth/RoleSelectScreen";
import AdminDashboard from "../screens/Dashboard/AdminDashboard";
import ResidentDashboard from "../screens/Dashboard/ResidentDashboard";
import EmployeeDashboard from "../screens/Dashboard/EmployeeDashboard";
import ResidentCreateScreen from "../screens/Admin/ResidentManagement/ResidentCreateScreen";
import ResidentEditScreen from "../screens/Admin/ResidentManagement/ResidentEditScreen";
import ResidentViewScreen from "../screens/Admin/ResidentManagement/ResidentViewScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import ApartmentCreateScreen from "../screens/Admin/ApartmentManagement/ApartmentCreateScreen";
import ApartmentEditScreen from "../screens/Admin/ApartmentManagement/ApartmentEditScreen";
import ApartmentViewScreen from "../screens/Admin/ApartmentManagement/ApartmentViewScreen";
import FeedbackCreateScreen from "../screens/Admin/FeedbackManagement/FeedbackCreateScreen";
import FeedbackEditScreen from "../screens/Admin/FeedbackManagement/FeedbackEditScreen";
import FeedbackViewScreen from "../screens/Admin/FeedbackManagement/FeedbackViewScreen";
import ServiceFeeCreateScreen from "../screens/Admin/ServiceFeeManagement/ServiceFeeCreateScreen";
import ServiceFeeEditScreen from "../screens/Admin/ServiceFeeManagement/ServiceFeeEditScreen";
import ServiceFeeViewScreen from "../screens/Admin/ServiceFeeManagement/ServiceFeeViewScreen";
import NotificationCreateScreen from "../screens/Admin/NotificationManagement/NotificationCreateScreen";
import NotificationEditScreen from "../screens/Admin/NotificationManagement/NotificationEditScreen";
import NotificationViewScreen from "../screens/Admin/NotificationManagement/NotificationViewScreen";
import InvoiceCreateScreen from "../screens/Admin/InvoiceManagement/InvoiceCreateScreen";
import InvoiceEditScreen from "../screens/Admin/InvoiceManagement/InvoiceEditScreen";
import InvoiceViewScreen from "../screens/Admin/InvoiceManagement/InvoiceViewScreen";
import ContractCreateScreen from "../screens/Admin/ContractManagement/ContractCreateScreen";
import ContractEditScreen from "../screens/Admin/ContractManagement/ContractEditScreen";
import ContractViewScreen from "../screens/Admin/ContractManagement/ContractViewScreen";
import ResidentFeedbackCreateScreen from "../screens/Resident/ResidentFeedbackCreateScreen";
import ResidentFeedbackEditScreen from "../screens/Resident/ResidentFeedbackEditScreen";
import ResidentFeedbackViewScreen from "../screens/Resident/ResidentFeedbackViewScreen";
import ResidentServiceListScreen from "../screens/Resident/ResidentServiceListScreen";
import ResidentServiceRegisterScreen from "../screens/Resident/ResidentServiceRegisterScreen";
import ResidentNotificationListScreen from "../screens/Resident/ResidentNotificationListScreen";
import ResidentNotificationViewScreen from "../screens/Resident/ResidentNotificationViewScreen";
import ResidentInvoiceListScreen from "../screens/Resident/ResidentInvoiceListScreen";
import ResidentInvoiceViewScreen from "../screens/Resident/ResidentInvoiceViewScreen";
import ResidentInvoicePaymentScreen from "../screens/Resident/ResidentInvoicePaymentScreen";
import ResidentContractListScreen from "../screens/Resident/ResidentContractListScreen";
import ResidentContractViewScreen from "../screens/Resident/ResidentContractViewScreen";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function MainNavigator({ navigation }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      // Điều hướng tự động dựa vào role
      if (user.role === "admin") {
        navigation.reset({ index: 0, routes: [{ name: "AdminDashboard" }] });
      } else if (user.role === "employee") {
        navigation.reset({ index: 0, routes: [{ name: "EmployeeDashboard" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "ResidentDashboard" }] });
      }
    }
  }, [user, loading, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="RoleSelect"
        component={RoleSelectScreen}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="ResidentDashboard"
        component={ResidentDashboard}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="EmployeeDashboard"
        component={EmployeeDashboard}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="CreateResident"
        component={ResidentCreateScreen}
        options={{ title: "Thêm cư dân" }}
      />
      <Stack.Screen
        name="EditResident"
        component={ResidentEditScreen}
        options={{ title: "Sửa cư dân" }}
      />
      <Stack.Screen
        name="ViewResident"
        component={ResidentViewScreen}
        options={{ title: "Chi tiết cư dân" }}
      />
      <Stack.Screen
        name="ApartmentCreate"
        component={ApartmentCreateScreen}
        options={{ title: "Thêm căn hộ" }}
      />
      <Stack.Screen
        name="ApartmentEdit"
        component={ApartmentEditScreen}
        options={{ title: "Sửa căn hộ" }}
      />
      <Stack.Screen
        name="ApartmentView"
        component={ApartmentViewScreen}
        options={{ title: "Chi tiết căn hộ" }}
      />
      <Stack.Screen
        name="FeedbackCreate"
        component={FeedbackCreateScreen}
        options={{ title: "Thêm phản hồi" }}
      />
      <Stack.Screen
        name="FeedbackEdit"
        component={FeedbackEditScreen}
        options={{ title: "Sửa phản hồi" }}
      />
      <Stack.Screen
        name="FeedbackView"
        component={FeedbackViewScreen}
        options={{ title: "Chi tiết phản hồi" }}
      />
      <Stack.Screen
        name="ServiceFeeCreate"
        component={ServiceFeeCreateScreen}
        options={{ title: "Thêm phí dịch vụ" }}
      />
      <Stack.Screen
        name="ServiceFeeEdit"
        component={ServiceFeeEditScreen}
        options={{ title: "Sửa phí dịch vụ" }}
      />
      <Stack.Screen
        name="ServiceFeeView"
        component={ServiceFeeViewScreen}
        options={{ title: "Chi tiết phí dịch vụ" }}
      />
      <Stack.Screen
        name="NotificationCreate"
        component={NotificationCreateScreen}
        options={{ title: "Thêm thông báo" }}
      />
      <Stack.Screen
        name="NotificationEdit"
        component={NotificationEditScreen}
        options={{ title: "Sửa thông báo" }}
      />
      <Stack.Screen
        name="NotificationView"
        component={NotificationViewScreen}
        options={{ title: "Chi tiết thông báo" }}
      />
      <Stack.Screen
        name="InvoiceCreate"
        component={InvoiceCreateScreen}
        options={{ title: "Thêm hóa đơn" }}
      />
      <Stack.Screen
        name="InvoiceEdit"
        component={InvoiceEditScreen}
        options={{ title: "Sửa hóa đơn" }}
      />
      <Stack.Screen
        name="InvoiceView"
        component={InvoiceViewScreen}
        options={{ title: "Chi tiết hóa đơn" }}
      />
      <Stack.Screen
        name="ContractCreate"
        component={ContractCreateScreen}
        options={{ title: "Thêm hợp đồng" }}
      />
      <Stack.Screen
        name="ContractEdit"
        component={ContractEditScreen}
        options={{ title: "Sửa hợp đồng" }}
      />
      <Stack.Screen
        name="ContractView"
        component={ContractViewScreen}
        options={{ title: "Chi tiết hợp đồng" }}
      />
      <Stack.Screen
        name="ResidentFeedbackCreate"
        component={ResidentFeedbackCreateScreen}
        options={{ title: "Gửi phản hồi mới" }}
      />
      <Stack.Screen
        name="ResidentFeedbackEdit"
        component={ResidentFeedbackEditScreen}
        options={{ title: "Sửa phản hồi" }}
      />
      <Stack.Screen
        name="ResidentFeedbackView"
        component={ResidentFeedbackViewScreen}
        options={{ title: "Chi tiết phản hồi" }}
      />
      <Stack.Screen
        name="ResidentServiceList"
        component={ResidentServiceListScreen}
        options={{ title: "Dịch vụ đã đăng ký" }}
      />
      <Stack.Screen
        name="ResidentServiceRegister"
        component={ResidentServiceRegisterScreen}
        options={{ title: "Đăng ký dịch vụ" }}
      />
      <Stack.Screen
        name="ResidentNotificationList"
        component={ResidentNotificationListScreen}
        options={{ title: "Thông báo" }}
      />
      <Stack.Screen
        name="ResidentNotificationView"
        component={ResidentNotificationViewScreen}
        options={{ title: "Chi tiết thông báo" }}
      />
      <Stack.Screen
        name="ResidentInvoiceList"
        component={ResidentInvoiceListScreen}
        options={{ title: "Hóa đơn của bạn" }}
      />
      <Stack.Screen
        name="ResidentInvoiceView"
        component={ResidentInvoiceViewScreen}
        options={{ title: "Chi tiết hóa đơn" }}
      />
      <Stack.Screen
        name="ResidentInvoicePayment"
        component={ResidentInvoicePaymentScreen}
        options={{ title: "Thanh toán hóa đơn" }}
      />
      <Stack.Screen
        name="ResidentContractList"
        component={ResidentContractListScreen}
        options={{ title: "Hợp đồng của bạn" }}
      />
      <Stack.Screen
        name="ResidentContractView"
        component={ResidentContractViewScreen}
        options={{ title: "Chi tiết hợp đồng" }}
      />
    </Stack.Navigator>
  );
}
