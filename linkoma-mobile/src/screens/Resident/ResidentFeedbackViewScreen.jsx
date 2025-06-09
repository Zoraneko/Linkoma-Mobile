import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";

const feedbackFields = [
  { key: "title", label: "Tiêu đề", type: "text" },
  { key: "content", label: "Nội dung", type: "text" },
];

export default function ResidentFeedbackViewScreen() {
  const route = useRoute();
  const { feedback } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DynamicForm
        fields={feedbackFields}
        initialData={feedback}
        readOnly={true}
      />
    </View>
  );
}
