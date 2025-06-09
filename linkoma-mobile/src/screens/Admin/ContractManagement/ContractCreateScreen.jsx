import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { createContract } from "../../../services/contractService";

export default function ContractCreateScreen({ navigation }) {
  const fields = [
    {
      key: "code",
      label: "Mã hợp đồng",
      type: "text",
      placeholder: "Nhập mã hợp đồng",
    },
    {
      key: "apartment",
      label: "Căn hộ",
      type: "text",
      placeholder: "Nhập căn hộ",
    },
    { key: "startDate", label: "Ngày bắt đầu", type: "date" },
    { key: "endDate", label: "Ngày kết thúc", type: "date" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={{}}
      onSubmit={async (data) => {
        await createContract(data);
        navigation.goBack();
      }}
    />
  );
}
