import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { removeApartment } from "../../../services/apartmentService";

export default function ApartmentViewScreen({ route, navigation }) {
  const { apartment } = route.params || {};
  const fields = [
    { key: "name", label: "Tên căn hộ", type: "text" },
    { key: "block", label: "Block", type: "text" },
    { key: "floor", label: "Tầng", type: "number" },
  ];
  const handleDelete = async () => {
    if (apartment && apartment.id) {
      await removeApartment(apartment.id);
      navigation.goBack();
    }
  };
  return (
    <DynamicForm
      fields={fields}
      initialData={apartment}
      readOnly={true}
      showDelete={true}
      onDelete={handleDelete}
    />
  );
}
