import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { createNotification } from "../../../services/notificationService";

export default function NotificationCreateScreen({ navigation }) {
  const fields = [
    {
      key: "title",
      label: "Tiêu đề",
      type: "text",
      placeholder: "Nhập tiêu đề",
    },
    {
      key: "content",
      label: "Nội dung",
      type: "text",
      placeholder: "Nhập nội dung",
    },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={{}}
      onSubmit={async (data) => {
        await createNotification(data);
        navigation.goBack();
      }}
    />
  );
}
