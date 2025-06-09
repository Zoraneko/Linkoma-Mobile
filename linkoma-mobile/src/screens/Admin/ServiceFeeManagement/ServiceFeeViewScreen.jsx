import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { removeServiceFee } from "../../../services/serviceFeeService";

export default function ServiceFeeViewScreen({ route, navigation }) {
  const { serviceFee } = route.params || {};
  const fields = [
    { key: "name", label: "Tên phí", type: "text" },
    { key: "amount", label: "Số tiền", type: "number" },
  ];
  const handleDelete = () => {
    removeServiceFee(serviceFee.id)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error removing service fee:", error);
      });
  };
  return (
    <DynamicForm
      fields={fields}
      initialData={serviceFee}
      readOnly={true}
      showDelete={true}
      onDelete={handleDelete}
    />
  );
}
