import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";

const contractFields = [
  { key: "title", label: "Tiêu đề", type: "text" },
  { key: "content", label: "Nội dung", type: "text" },
  { key: "startDate", label: "Ngày bắt đầu", type: "date" },
  { key: "endDate", label: "Ngày kết thúc", type: "date" },
];

export default function ResidentContractViewScreen() {
  const route = useRoute();
  const { contract } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DynamicForm
        fields={contractFields}
        initialData={contract}
        readOnly={true}
      />
    </View>
  );
}
