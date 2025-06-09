import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import {
  updateServiceFee,
  removeServiceFee,
} from "../../../services/serviceFeeService";

export default function ServiceFeeEditScreen({ route, navigation }) {
  const { serviceFee } = route.params || {};
  const fields = [
    { key: "name", label: "Tên phí", type: "text" },
    { key: "amount", label: "Số tiền", type: "number" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={serviceFee}
      onSubmit={async (data) => {
        await updateServiceFee(serviceFee.id, data);
        navigation.goBack();
      }}
      readOnly={false}
      showDelete={true}
      onDelete={async () => {
        await removeServiceFee(serviceFee.id);
        navigation.goBack();
      }}
    />
  );
}
