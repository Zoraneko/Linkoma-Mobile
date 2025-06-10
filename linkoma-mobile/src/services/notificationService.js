// Mock Notification Service with enhanced data
let notifications = [
  {
    id: 1,
    title: "Thông báo bảo trì hệ thống",
    content: "Tòa nhà sẽ tiến hành bảo trì hệ thống điện vào Chủ nhật tuần tới từ 8:00 - 17:00. Trong thời gian này có thể xảy ra tình trạng mất điện tạm thời.",
    type: "maintenance",
    priority: "high",
    status: "active",
    targetAudience: "all_residents",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: 1,
    authorName: "Ban Quản Lý",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Thông báo họp cư dân tháng 12",
    content: "Cuộc họp cư dân định kỳ tháng 12 sẽ diễn ra vào ngày 25/12/2024 lúc 19:00 tại sảnh tầng trệt. Nội dung: đánh giá hoạt động năm 2024 và kế hoạch năm 2025.",
    type: "meeting",
    priority: "medium",
    status: "active",
    targetAudience: "all_residents",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: 1,
    authorName: "Ban Quản Lý",
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "Thông báo thanh toán phí dịch vụ",
    content: "Kính gửi quý cư dân, phí dịch vụ tháng 12/2024 đã được gửi. Vui lòng thanh toán trước ngày 15/12 để tránh phát sinh phí chậm thanh toán.",
    type: "payment",
    priority: "high",
    status: "active",
    targetAudience: "all_residents",
    publishedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: 1,
    authorName: "Ban Quản Lý",
    isRead: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Cập nhật quy định mới",
    content: "Từ ngày 1/1/2025, tòa nhà sẽ áp dụng quy định mới về việc ra vào tòa nhà. Chi tiết xem tại văn bản đính kèm.",
    type: "announcement",
    priority: "medium",
    status: "active",
    targetAudience: "all_residents",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: 1,
    authorName: "Ban Quản Lý",
    isRead: false,
    attachments: [
      {
        name: "quy_dinh_moi_2025.pdf",
        url: "https://example.com/documents/quy_dinh_moi_2025.pdf"
      }
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];
let idCounter = 5;

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllNotifications = async (filters = {}) => {
  await delay();
  let filteredNotifications = [...notifications];
  
  if (filters.type) {
    filteredNotifications = filteredNotifications.filter(n => n.type === filters.type);
  }
  if (filters.priority) {
    filteredNotifications = filteredNotifications.filter(n => n.priority === filters.priority);
  }
  if (filters.status) {
    filteredNotifications = filteredNotifications.filter(n => n.status === filters.status);
  }
  if (filters.isRead !== undefined) {
    filteredNotifications = filteredNotifications.filter(n => n.isRead === filters.isRead);
  }
  
  // Sort by creation date (newest first)
  filteredNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return filteredNotifications;
};

export const getNotificationById = async (id) => {
  await delay(300);
  return notifications.find((n) => n.id === parseInt(id));
};

export const createNotification = async (data) => {
  await delay(800);
  const newNotification = { 
    ...data, 
    id: idCounter++,
    status: data.status || "active",
    priority: data.priority || "medium",
    type: data.type || "announcement",
    targetAudience: data.targetAudience || "all_residents",
    isRead: false,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  notifications.push(newNotification);
  return newNotification;
};

export const updateNotification = async (id, data) => {
  await delay(800);
  notifications = notifications.map((n) =>
    n.id === parseInt(id) ? { ...n, ...data, updatedAt: new Date().toISOString() } : n
  );
  return notifications.find((n) => n.id === parseInt(id));
};

export const removeNotification = async (id) => {
  await delay(600);
  notifications = notifications.filter((n) => n.id !== parseInt(id));
  return true;
};

export const markAsRead = async (id) => {
  await delay(300);
  const notification = notifications.find(n => n.id === parseInt(id));
  if (notification) {
    notification.isRead = true;
    notification.readAt = new Date().toISOString();
  }
  return notification;
};

export const markAllAsRead = async () => {
  await delay(500);
  notifications.forEach(n => {
    if (!n.isRead) {
      n.isRead = true;
      n.readAt = new Date().toISOString();
    }
  });
  return true;
};
