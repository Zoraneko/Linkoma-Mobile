import React from 'react';
import DynamicForm from '../../../components/DynamicForm';


const fields = [
  { key: 'name', label: 'Tên cư dân', type: 'text' },
  { key: 'dob', label: 'Ngày sinh', type: 'date' },
  { key: 'gender', label: 'Giới tính', type: 'select', options: ['Nam', 'Nữ'] },
];

export default function ResidentEditScreen({ route, navigation }) {
  const { resident } = route.params;

  const handleUpdate = (data) => {
    console.log('Update:', data);
    navigation.goBack();
  };

  return (
    <DynamicForm
      fields={fields}
      initialData={resident}
      onSubmit={handleUpdate}
    />
  );
}
