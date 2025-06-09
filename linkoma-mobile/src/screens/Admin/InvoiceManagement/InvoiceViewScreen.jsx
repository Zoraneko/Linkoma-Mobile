import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { removeInvoice } from "../../../services/invoiceService";

export default function InvoiceViewScreen({ route, navigation }) {
  const { invoice } = route.params || {};
  const fields = [
    { key: "code", label: "Mã hóa đơn", type: "text" },
    { key: "amount", label: "Số tiền", type: "number" },
  ];
  const handleDelete = () => {
    removeInvoice(invoice.id)
      .then((response) => {
        // Xử lý thành công, có thể điều hướng về màn hình danh sách hóa đơn
        navigation.goBack();
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Có lỗi xảy ra khi xóa hóa đơn:", error);
      });
  };
  return (
    <DynamicForm
      fields={fields}
      initialData={invoice}
      readOnly={true}
      showDelete={true}
      onDelete={handleDelete}
    />
  );
}
