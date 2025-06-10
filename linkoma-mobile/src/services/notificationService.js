// Mock Notification Service
let notifications = [
  { id: 1, title: "Lịch bảo trì tháng 6", content: "Bảo trì thang máy..." },
  { id: 2, title: "Thông báo tiền điện", content: "Thanh toán trước 15/6." },
];
let idCounter = 3;

export const getAllNotifications = async () => [...notifications];
export const getNotificationById = async (id) =>
  notifications.find((n) => n.id === id);
export const createNotification = async (data) => {
  const newNotification = { ...data, id: idCounter++ };
  notifications.push(newNotification);
  return newNotification;
};
export const updateNotification = async (id, data) => {
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, ...data } : n
  );
  return notifications.find((n) => n.id === id);
};
export const removeNotification = async (id) => {
  notifications = notifications.filter((n) => n.id !== id);
  return true;
};
