import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import feedbackService from "../../services/feedbackService";
import { View, Alert } from "react-native";

const feedbackFields = [
  { key: "title", label: "Tiêu đề", type: "text", required: true },
  { key: "content", label: "Nội dung", type: "text", required: true },
];

export default function ResidentFeedbackEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { feedback } = route.params;

  const handleSubmit = async (data) => {
    try {
      await feedbackService.updateFeedback(feedback.id, data);
      Alert.alert("Thành công", "Cập nhật phản hồi thành công!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Không cập nhật được phản hồi");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DynamicForm
        fields={feedbackFields}
        initialData={feedback}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
