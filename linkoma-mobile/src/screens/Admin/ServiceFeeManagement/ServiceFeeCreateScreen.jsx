import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { createServiceFee } from "../../../services/serviceFeeService";

export default function ServiceFeeCreateScreen({ navigation }) {
  const fields = [
    {
      key: "name",
      label: "Tên phí",
      type: "text",
      placeholder: "Nhập tên phí",
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
        await createServiceFee(data);
        navigation.goBack();
      }}
    />
  );
}
