import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { createApartment } from "../../../services/apartmentService";

export default function ApartmentCreateScreen({ navigation }) {
  const fields = [
    {
      key: "name",
      label: "Tên căn hộ",
      type: "text",
      placeholder: "Nhập tên căn hộ",
    },
    { key: "block", label: "Block", type: "text", placeholder: "Nhập block" },
    { key: "floor", label: "Tầng", type: "number", placeholder: "Nhập tầng" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={{}}
      onSubmit={async (data) => {
        await createApartment(data);
        navigation.goBack();
      }}
    />
  );
}
