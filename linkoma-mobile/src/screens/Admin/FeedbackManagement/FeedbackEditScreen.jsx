import React from "react";
import DynamicForm from "../../../components/DynamicForm";
import {
  updateFeedback,
  removeFeedback,
} from "../../../services/feedbackService";

export default function FeedbackEditScreen({ route, navigation }) {
  const { feedback } = route.params || {};
  const fields = [
    { key: "title", label: "Tiêu đề", type: "text" },
    { key: "content", label: "Nội dung", type: "text" },
  ];
  return (
    <DynamicForm
      fields={fields}
      initialData={feedback}
      onSubmit={async (data) => {
        await updateFeedback(feedback.id, data);
        navigation.goBack();
      }}
      readOnly={false}
      showDelete={true}
      onDelete={async () => {
        await removeFeedback(feedback.id);
        navigation.goBack();
      }}
    />
  );
}
