import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { updateInvoice, removeInvoice } from "../../../services/invoiceService";

export default function InvoiceEditScreen({ route, navigation }) {
  const { invoice } = route.params || {};
  const fields = [
    { key: "code", label: "Mã hóa đơn", type: "text" },
    { key: "amount", label: "Số tiền", type: "number" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={invoice}
      onSubmit={async (data) => {
        await updateInvoice(invoice.id, data);
        navigation.goBack();
      }}
      readOnly={false}
      showDelete={true}
      onDelete={async () => {
        await removeInvoice(invoice.id);
        navigation.goBack();
      }}
    />
  );
}
