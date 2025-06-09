import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import { removeFeedback } from "../../../services/feedbackService";

export default function FeedbackViewScreen({ route, navigation }) {
  const { feedback } = route.params || {};
  const fields = [
    { key: "title", label: "Tiêu đề", type: "text" },
    { key: "content", label: "Nội dung", type: "text" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={feedback}
      readOnly={true}
      showDelete={false}
    />
  );
}

// Nếu cần thêm chức năng xóa ở ViewScreen, có thể import và dùng removeFeedback tương tự EditScreen.
