import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import {
  updateApartment,
  removeApartment,
} from "../../../services/apartmentService";

export default function ApartmentEditScreen({ route, navigation }) {
  const { apartment } = route.params || {};
  const fields = [
    { key: "name", label: "Tên căn hộ", type: "text" },
    { key: "block", label: "Block", type: "text" },
    { key: "floor", label: "Tầng", type: "number" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={apartment}
      onSubmit={async (data) => {
        await updateApartment(apartment.id, data);
        navigation.goBack();
      }}
      readOnly={false}
      showDelete={true}
      onDelete={async () => {
        await removeApartment(apartment.id);
        navigation.goBack();
      }}
    />
  );
}
