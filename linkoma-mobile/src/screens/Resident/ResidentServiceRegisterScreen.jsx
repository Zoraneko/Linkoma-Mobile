import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import serviceFeeService from "../../services/serviceFeeService";
import { View, Alert } from "react-native";

const serviceFields = [
  { key: "name", label: "Tên dịch vụ", type: "text", required: true },
  { key: "description", label: "Mô tả", type: "text" },
];

export default function ResidentServiceRegisterScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleSubmit = async (data) => {
    try {
      await serviceFeeService.registerService({
        ...data,
        residentId: user.userId,
      });
      Alert.alert("Thành công", "Đăng ký dịch vụ thành công!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Không đăng ký được dịch vụ");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DynamicForm fields={serviceFields} onSubmit={handleSubmit} />
    </View>
  );
}
