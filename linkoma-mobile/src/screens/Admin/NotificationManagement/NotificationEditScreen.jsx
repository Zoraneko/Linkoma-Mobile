import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import {
  updateNotification,
  removeNotification,
} from "../../../services/notificationService";

export default function NotificationEditScreen({ route, navigation }) {
  const { notification } = route.params || {};
  const fields = [
    { key: "title", label: "Tiêu đề", type: "text" },
    { key: "content", label: "Nội dung", type: "text" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={notification}
      onSubmit={async (data) => {
        await updateNotification(notification.id, data);
        navigation.goBack();
      }}
      readOnly={false}
      showDelete={true}
      onDelete={async () => {
        await removeNotification(notification.id);
        navigation.goBack();
      }}
    />
  );
}
