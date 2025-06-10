// Mock Feedback Service with enhanced data
let feedbacks = [
  {
    id: 1,
    title: "Vấn đề về thang máy",
    content: "Thang máy tòa A bị hỏng từ 3 ngày nay, cư dân phải đi bộ lên tầng cao rất mệt mỏi.",
    category: "maintenance",
    priority: "high",
    status: "pending",
    residentId: 1,
    residentName: "Nguyễn Văn A",
    apartmentId: 1,
    apartmentName: "Block A - 101",
    images: ["https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Elevator+Problem"],
    adminResponse: "",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Yêu cầu sửa chữa điện nước",
    content: "Điện nước căn hộ B202 có vấn đề, đôi khi bị mất điện đột ngột.",
    category: "electrical",
    priority: "medium",
    status: "resolved",
    residentId: 2,
    residentName: "Trần Thị B",
    apartmentId: 2,
    apartmentName: "Block B - 202",
    images: [],
    adminResponse: "Đã kiểm tra và sửa chữa xong. Vấn đề do cầu dao cũ.",
    resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "Đề xuất cải thiện khu vực chung",
    content: "Mong muốn có thêm ghế ngồi ở khu vực sảnh để cư dân có thể nghỉ ngơi.",
    category: "suggestion",
    priority: "low",
    status: "in_progress",
    residentId: 3,
    residentName: "Lê Văn C",
    apartmentId: 3,
    apartmentName: "Block C - 305",
    images: ["https://via.placeholder.com/300x200/0066CC/FFFFFF?text=Lobby+Area"],
    adminResponse: "Đã ghi nhận đề xuất. Đang xem xét ngân sách.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];
let idCounter = 4;

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllFeedbacks = async (filters = {}) => {
  await delay();
  let filteredFeedbacks = [...feedbacks];
  
  if (filters.status) {
    filteredFeedbacks = filteredFeedbacks.filter(f => f.status === filters.status);
  }
  if (filters.category) {
    filteredFeedbacks = filteredFeedbacks.filter(f => f.category === filters.category);
  }
  if (filters.priority) {
    filteredFeedbacks = filteredFeedbacks.filter(f => f.priority === filters.priority);
  }
  if (filters.residentId) {
    filteredFeedbacks = filteredFeedbacks.filter(f => f.residentId === parseInt(filters.residentId));
  }
  
  return filteredFeedbacks;
};

export const getFeedbackById = async (id) => {
  await delay(300);
  return feedbacks.find((f) => f.id === parseInt(id));
};

export const createFeedback = async (data) => {
  await delay(800);
  const newFeedback = { 
    ...data, 
    id: idCounter++,
    status: "pending",
    priority: data.priority || "medium",
    category: data.category || "general",
    images: data.images || [],
    adminResponse: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  feedbacks.push(newFeedback);
  return newFeedback;
};

export const updateFeedback = async (id, data) => {
  await delay(800);
  feedbacks = feedbacks.map((f) => 
    f.id === parseInt(id) ? { ...f, ...data, updatedAt: new Date().toISOString() } : f
  );
  return feedbacks.find((f) => f.id === parseInt(id));
};

export const removeFeedback = async (id) => {
  await delay(600);
  feedbacks = feedbacks.filter((f) => f.id !== parseInt(id));
  return true;
};
