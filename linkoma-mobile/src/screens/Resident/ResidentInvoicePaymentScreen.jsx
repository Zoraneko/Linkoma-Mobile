import React from "react";
import { View, Alert } from "react-native";
import { Button, WhiteSpace, List } from "@ant-design/react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import invoiceService from "../../services/invoiceService";

export default function ResidentInvoicePaymentScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { invoice } = route.params;

  const handlePay = async () => {
    try {
      await invoiceService.payInvoice(invoice.id);
      Alert.alert("Thành công", "Thanh toán thành công!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Thanh toán thất bại");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <List renderHeader={"Xác nhận thanh toán"}>
        <List.Item extra={invoice.title || `Hóa đơn #${invoice.id}`}>
          Hóa đơn
        </List.Item>
        <List.Item extra={invoice.amount}>Số tiền</List.Item>
        <List.Item extra={invoice.dueDate}>Hạn thanh toán</List.Item>
      </List>
      <WhiteSpace />
      <Button type="primary" onPress={handlePay}>
        Xác nhận thanh toán
      </Button>
    </View>
  );
}
