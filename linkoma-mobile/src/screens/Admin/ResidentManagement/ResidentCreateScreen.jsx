import React from 'react';
import DynamicForm from '../../../components/DynamicForm';


const fields = [
  { key: 'name', label: 'Tên cư dân', type: 'text' },
  { key: 'dob', label: 'Ngày sinh', type: 'date' },
  { key: 'gender', label: 'Giới tính', type: 'select', options: ['Nam', 'Nữ'] },
];

export default function ResidentCreateScreen({ navigation }) {
  const handleCreate = (data) => {
    console.log('Create:', data);
    // Gọi API tạo mới
    navigation.goBack();
  };

  return (
    <DynamicForm
          fields={fields}
          initialData={{}} 
      onSubmit={handleCreate}
    />
  );
}
