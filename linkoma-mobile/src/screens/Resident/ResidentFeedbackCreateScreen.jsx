import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import feedbackService from "../../services/feedbackService";
import { View, Alert } from "react-native";

const feedbackFields = [
  { key: "title", label: "Tiêu đề", type: "text", required: true },
  { key: "content", label: "Nội dung", type: "text", required: true },
];

export default function ResidentFeedbackCreateScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleSubmit = async (data) => {
    try {
      await feedbackService.createFeedback({
        ...data,
        residentId: user.userId,
      });
      Alert.alert("Thành công", "Gửi phản hồi thành công!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Không gửi được phản hồi");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DynamicForm fields={feedbackFields} onSubmit={handleSubmit} />
    </View>
  );
}
