import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { createInvoice } from "../../../services/invoiceService";

export default function InvoiceCreateScreen({ navigation }) {
  const fields = [
    {
      key: "code",
      label: "Mã hóa đơn",
      type: "text",
      placeholder: "Nhập mã hóa đơn",
    },
    {
      key: "amount",
      label: "Số tiền",
      type: "number",
      placeholder: "Nhập số tiền",
    },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={{}}
      onSubmit={async (data) => {
        await createInvoice(data);
        navigation.goBack();
      }}
    />
  );
}
