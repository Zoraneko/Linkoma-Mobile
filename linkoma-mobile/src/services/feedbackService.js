// Mock Feedback Service
let feedbacks = [
  { id: 1, title: "Thiếu nước lầu 3", content: "Không có nước từ sáng." },
  { id: 2, title: "Đèn hành lang hỏng", content: "Đèn không sáng." },
];
let idCounter = 3;

export const getAllFeedbacks = async () => [...feedbacks];
export const getFeedbackById = async (id) => feedbacks.find((f) => f.id === id);
export const createFeedback = async (data) => {
  const newFeedback = { ...data, id: idCounter++ };
  feedbacks.push(newFeedback);
  return newFeedback;
};
export const updateFeedback = async (id, data) => {
  feedbacks = feedbacks.map((f) => (f.id === id ? { ...f, ...data } : f));
  return feedbacks.find((f) => f.id === id);
};
export const removeFeedback = async (id) => {
  feedbacks = feedbacks.filter((f) => f.id !== id);
  return true;
};
