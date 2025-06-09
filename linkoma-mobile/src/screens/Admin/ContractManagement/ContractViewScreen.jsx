import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { removeContract } from "../../../services/contractService";

export default function ContractViewScreen({ route, navigation }) {
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
      readOnly={true}
      showDelete={false}
    />
  );
}

// Nếu cần thêm chức năng xóa ở ViewScreen, có thể import và dùng removeContract tương tự EditScreen.
