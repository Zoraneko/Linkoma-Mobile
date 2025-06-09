import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { createResident } from "../../../services/residentService";

const fields = [
  { key: "name", label: "Tên cư dân", type: "text" },
  { key: "dob", label: "Ngày sinh", type: "date" },
  { key: "gender", label: "Giới tính", type: "select", options: ["Nam", "Nữ"] },
];

export default function ResidentCreateScreen({ navigation }) {
  const handleCreate = async (data) => {
    await createResident(data);
    navigation.goBack();
  };

  return (
    <DynamicForm fields={fields} initialData={{}} onSubmit={handleCreate} />
  );
}
