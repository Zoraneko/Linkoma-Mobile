import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { removeNotification } from "../../../services/notificationService";

export default function NotificationViewScreen({ route, navigation }) {
  const { notification } = route.params || {};
  const fields = [
    { key: "title", label: "Tiêu đề", type: "text" },
    { key: "content", label: "Nội dung", type: "text" },
  ];
  const handleDelete = async () => {
    if (notification && notification.id) {
      await removeNotification(notification.id);
      navigation.goBack();
    }
  };
  return (
    <DynamicForm
      fields={fields}
      initialData={notification}
      readOnly={true}
      showDelete={false}
      onDelete={handleDelete}
    />
  );
}
