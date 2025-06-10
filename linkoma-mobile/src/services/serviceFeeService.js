// Mock Service Fee Service with enhanced data
let serviceFees = [
  {
    id: 1,
    name: "Phí quản lý",
    amount: 50000,
    type: "monthly",
    description: "Phí quản lý tòa nhà hàng tháng cho mỗi căn hộ",
    isActive: true,
    appliesTo: "all",
    effectiveDate: "2023-01-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Phí bảo vệ",
    amount: 30000,
    type: "monthly",
    description: "Phí bảo vệ 24/7 cho tòa nhà",
    isActive: true,
    appliesTo: "all",
    effectiveDate: "2023-01-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Phí gửi xe máy",
    amount: 100000,
    type: "monthly",
    description: "Phí gửi xe máy trong hầm để xe",
    isActive: true,
    appliesTo: "optional",
    effectiveDate: "2023-01-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Phí gửi ô tô",
    amount: 500000,
    type: "monthly",
    description: "Phí gửi ô tô trong hầm để xe",
    isActive: true,
    appliesTo: "optional",
    effectiveDate: "2023-01-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Phí vệ sinh",
    amount: 25000,
    type: "monthly",
    description: "Phí vệ sinh khu vực chung",
    isActive: true,
    appliesTo: "all",
    effectiveDate: "2023-01-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
let idCounter = 6;

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllServiceFees = async (filters = {}) => {
  await delay();
  let filteredFees = [...serviceFees];
  
  if (filters.type) {
    filteredFees = filteredFees.filter(f => f.type === filters.type);
  }
  if (filters.isActive !== undefined) {
    filteredFees = filteredFees.filter(f => f.isActive === filters.isActive);
  }
  if (filters.appliesTo) {
    filteredFees = filteredFees.filter(f => f.appliesTo === filters.appliesTo);
  }
  
  return filteredFees;
};

export const getServiceFeeById = async (id) => {
  await delay(300);
  return serviceFees.find((f) => f.id === parseInt(id));
};

export const createServiceFee = async (data) => {
  await delay(800);
  const newFee = { 
    ...data, 
    id: idCounter++,
    isActive: data.isActive !== undefined ? data.isActive : true,
    type: data.type || "monthly",
    appliesTo: data.appliesTo || "all",
    effectiveDate: data.effectiveDate || new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  serviceFees.push(newFee);
  return newFee;
};

export const updateServiceFee = async (id, data) => {
  await delay(800);
  serviceFees = serviceFees.map((f) => 
    f.id === parseInt(id) ? { ...f, ...data, updatedAt: new Date().toISOString() } : f
  );
  return serviceFees.find((f) => f.id === parseInt(id));
};

export const removeServiceFee = async (id) => {
  await delay(600);
  serviceFees = serviceFees.filter((f) => f.id !== parseInt(id));
  return true;
};
