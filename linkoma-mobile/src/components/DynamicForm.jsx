import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  DatePicker,
  List,
  Button,
  Picker,
  Modal,
  Text,
} from "@ant-design/react-native";

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
  const [confirmType, setConfirmType] = useState(""); // 'submit' | 'delete'

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const renderField = (field) => {
    const value =
      formData[field.key] !== undefined
        ? formData[field.key]
        : initialData[field.key] ?? "";

    if (readOnly) {
      return (
        <List.Item key={field.key}>
          <Text style={styles.label}>{field.label}</Text>
          <Text style={styles.value}>
            {field.type === "date"
              ? value
                ? new Date(value).toLocaleDateString()
                : ""
              : value}
          </Text>
        </List.Item>
      );
    }

    switch (field.type) {
      case "text":
      case "number":
        return (
          <List.Item
            key={field.key}
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              paddingVertical: 8,
              height: "auto",
              minHeight: 80,
            }}
          >
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              value={value !== undefined && value !== null ? String(value) : ""}
              placeholder={field.placeholder || ""}
              onChangeText={(v) => handleChange(field.key, v)}
              keyboardType={field.type === "number" ? "numeric" : "default"}
              style={styles.textInput}
              editable={!readOnly}
              clearButtonMode="while-editing"
            />
          </List.Item>
        );

      case "date":
        const dateValue = !value
          ? undefined
          : value instanceof Date
          ? value
          : new Date(value);

        return (
          <DatePicker
            key={field.key}
            mode="date"
            value={dateValue}
            onChange={(date) => handleChange(field.key, date)}
          >
            <List.Item arrow="horizontal">{field.label}</List.Item>
          </DatePicker>
        );

      case "select":
        const pickerData = field.options.map((opt) => ({
          label: opt,
          value: opt,
        }));

        return (
          <Picker
            key={field.key}
            data={pickerData}
            cols={1}
            value={value ? [value] : []}
            onChange={(val) => handleChange(field.key, val[0])}
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
    if (confirmType === "submit") {
      // Đảm bảo đủ key cho tất cả các trường và chuẩn hóa kiểu dữ liệu
      const result = {};
      fields.forEach((field) => {
        let value = formData[field.key];
        if (value === undefined || value === "") {
          if (field.type === "number") value = null;
          else if (field.type === "date") value = null;
          else value = "";
        } else if (field.type === "number") {
          value = isNaN(Number(value)) ? null : Number(value);
        }
        result[field.key] = value;
      });
      onSubmit && onSubmit(result);
    } else if (confirmType === "delete") {
      onDelete && onDelete();
    }
  };

  return (
    <View style={styles.container}>
      <List>{fields.map(renderField)}</List>

      {!readOnly && (
        <Button
          type="primary"
          style={styles.button}
          onPress={() => handleAction("submit")}
        >
          Lưu
        </Button>
      )}

      {readOnly && showDelete && (
        <Button
          type="warning"
          style={styles.button}
          onPress={() => handleAction("delete")}
        >
          Xóa
        </Button>
      )}

      <Modal
        transparent
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title="Xác nhận"
        footer={[
          { text: "Hủy", onPress: () => setConfirmVisible(false) },
          { text: "Đồng ý", onPress: confirmAction },
        ]}
      >
        <Text style={{ padding: 10 }}>
          Bạn có chắc chắn muốn{" "}
          {confirmType === "submit" ? "lưu thay đổi" : "xóa thông tin"} này
          không?
        </Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  button: { marginTop: 20 },
  label: { fontWeight: "bold", marginBottom: 6, fontSize: 15 },
  value: { marginTop: 5, marginBottom: 10 },
  textInput: {
    width: "100%",
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
});
