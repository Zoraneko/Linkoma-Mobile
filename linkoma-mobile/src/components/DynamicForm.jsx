import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputItem, DatePicker, List, Button, Picker, Modal, Text } from '@ant-design/react-native';

export default function DynamicForm({
  fields = [],
  initialData = {},
  readOnly = false,
  showDelete = false,
  onSubmit,
  onDelete,
}) {
  const [formData, setFormData] = useState({});
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmType, setConfirmType] = useState(''); // 'submit' | 'delete'

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderField = (field) => {
    const value = formData[field.key];

    if (readOnly) {
      return (
        <List.Item key={field.key}>
          <Text style={styles.label}>{field.label}</Text>
          <Text style={styles.value}>
            {field.type === 'date'
              ? value
                ? new Date(value).toLocaleDateString()
                : ''
              : value}
          </Text>
        </List.Item>
      );
    }

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <InputItem
            key={field.key}
            type={field.type}
            value={value}
            placeholder={field.placeholder || ''}
            onChange={v => handleChange(field.key, v)}
          >
            {field.label}
          </InputItem>
        );

      case 'date':
        case 'date':
  const dateValue = useMemo(() => {
    if (!value) return undefined;
    return value instanceof Date ? value : new Date(value);
  }, [value]);

  return (
    <DatePicker
      key={field.key}
      mode="date"
      value={dateValue}
      onChange={date => handleChange(field.key, date)}
    >
      <List.Item arrow="horizontal">{field.label}</List.Item>
    </DatePicker>
  );

        case 'select':
            const pickerData = useMemo(() => (
      field.options.map(opt => ({ label: opt, value: opt }))
    ), [field.options]);
        return (
      <Picker
        key={field.key}
        data={pickerData}
        cols={1}
        value={value ? [value] : []}
        onChange={val => handleChange(field.key, val[0])}
      >
        <List.Item arrow="horizontal">{field.label}</List.Item>
      </Picker>
    );

      default:
        return null;
    }
  };

  const handleAction = (type) => {
    setConfirmType(type);
    setConfirmVisible(true);
  };

  const confirmAction = () => {
    setConfirmVisible(false);
    if (confirmType === 'submit') {
      onSubmit && onSubmit(formData);
    } else if (confirmType === 'delete') {
      onDelete && onDelete();
    }
  };

  return (
    <View style={styles.container}>
      <List>{fields.map(renderField)}</List>

      {!readOnly && (
        <Button type="primary" style={styles.button} onPress={() => handleAction('submit')}>
          Lưu
        </Button>
      )}

      {readOnly && showDelete && (
        <Button type="warning" style={styles.button} onPress={() => handleAction('delete')}>
          Xóa
        </Button>
      )}

      <Modal
        transparent
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title="Xác nhận"
        footer={[
          { text: 'Hủy', onPress: () => setConfirmVisible(false) },
          { text: 'Đồng ý', onPress: confirmAction },
        ]}
      >
        <Text style={{ padding: 10 }}>
          Bạn có chắc chắn muốn {confirmType === 'submit' ? 'lưu thay đổi' : 'xóa thông tin'} này không?
        </Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  button: { marginTop: 20 },
  label: { fontWeight: 'bold' },
  value: { marginTop: 5, marginBottom: 10 },
});
