import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import {
  updateContract,
  removeContract,
} from "../../../services/contractService";

export default function ContractEditScreen({ route, navigation }) {
  const { contract } = route.params || {};
  const fields = [
    { key: "code", label: "Mã hợp đồng", type: "text" },
    { key: "apartment", label: "Căn hộ", type: "text" },
    { key: "startDate", label: "Ngày bắt đầu", type: "date" },
    { key: "endDate", label: "Ngày kết thúc", type: "date" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={contract}
      onSubmit={async (data) => {
        await updateContract(contract.id, data);
        navigation.goBack();
      }}
      readOnly={false}
      showDelete={true}
      onDelete={async () => {
        await removeContract(contract.id);
        navigation.goBack();
      }}
    />
  );
}
