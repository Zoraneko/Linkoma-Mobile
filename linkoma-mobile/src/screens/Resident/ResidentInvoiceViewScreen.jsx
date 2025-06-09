import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Button, Alert } from "react-native";
invoiceFields = [
  { key: "title", label: "Tiêu đề", type: "text" },
  { key: "amount", label: "Số tiền", type: "number" },
  { key: "dueDate", label: "Hạn thanh toán", type: "date" },
  { key: "status", label: "Trạng thái", type: "text" },
];

export default function ResidentInvoiceViewScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { invoice } = route.params;

  const handlePay = () => {
    navigation.navigate("ResidentInvoicePayment", { invoice });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DynamicForm
        fields={invoiceFields}
        initialData={invoice}
        readOnly={true}
      />
      {invoice.status !== "Đã thanh toán" && (
        <Button title="Thanh toán" onPress={handlePay} />
      )}
    </View>
  );
}
