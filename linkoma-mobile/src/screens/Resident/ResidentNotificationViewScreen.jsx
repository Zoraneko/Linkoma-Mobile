import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";

const notificationFields = [
  { key: "title", label: "Tiêu đề", type: "text" },
  { key: "content", label: "Nội dung", type: "text" },
  { key: "createdAt", label: "Ngày gửi", type: "date" },
];

export default function ResidentNotificationViewScreen() {
  const route = useRoute();
  const { notification } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DynamicForm
        fields={notificationFields}
        initialData={notification}
        readOnly={true}
      />
    </View>
  );
}
