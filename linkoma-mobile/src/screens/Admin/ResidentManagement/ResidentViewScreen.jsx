import React from 'react';
import DynamicForm from '../../../components/DynamicForm';


const fields = [
  { key: 'name', label: 'Tên cư dân', type: 'text' },
  { key: 'dob', label: 'Ngày sinh', type: 'date' },
  { key: 'gender', label: 'Giới tính', type: 'select', options: ['Nam', 'Nữ'] },
];

export default function ResidentViewScreen({ route, navigation }) {
  const { resident } = route.params;

  const handleDelete = () => {
    console.log('Xoá:', resident);
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
