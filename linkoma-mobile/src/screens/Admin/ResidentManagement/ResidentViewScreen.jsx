import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { removeResident } from "../../../services/residentService";

const fields = [
  { key: "name", label: "Tên cư dân", type: "text" },
  { key: "dob", label: "Ngày sinh", type: "date" },
  { key: "gender", label: "Giới tính", type: "select", options: ["Nam", "Nữ"] },
];

export default function ResidentViewScreen({ route, navigation }) {
  const { resident } = route.params;

  const handleDelete = async () => {
    await removeResident(resident.id);
    navigation.goBack();
  };

  return (
    <DynamicForm
      fields={fields}
      initialData={resident}
      readOnly
      showDelete
      onDelete={handleDelete}
    />
  );
}
