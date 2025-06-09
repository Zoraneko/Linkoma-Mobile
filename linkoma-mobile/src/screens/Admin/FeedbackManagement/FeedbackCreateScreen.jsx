import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { createFeedback } from "../../../services/feedbackService";

export default function FeedbackCreateScreen({ navigation }) {
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
        await createFeedback(data);
        navigation.goBack();
      }}
    />
  );
}
