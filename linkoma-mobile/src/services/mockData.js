// Mock Data Store - Centralized data management for all services
export const mockDataStore = {
  // Users data
  users: [
    {
      id: 1,
      email: "admin@linkoma.com",
      username: "admin",
      password: "admin123",
      name: "Quản trị viên",
      phone: "0123456789",
      role: "admin",
      avatar: "https://via.placeholder.com/150/0066CC/FFFFFF?text=ADMIN",
      address: "123 Admin Street, HCM City",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: ["all"]
    },
    {
      id: 2,
      email: "resident1@gmail.com",
      username: "resident1",
      password: "123456",
      name: "Nguyễn Văn A",
      phone: "0987654321",
      role: "resident",
      avatar: "https://via.placeholder.com/150/009933/FFFFFF?text=NVA",
      address: "Block A - 101",
      apartmentId: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: ["resident"]
    },
    {
      id: 3,
      email: "resident2@gmail.com",
      username: "resident2",
      password: "123456",
      name: "Trần Thị B",
      phone: "0909876543",
      role: "resident",
      avatar: "https://via.placeholder.com/150/CC6600/FFFFFF?text=TTB",
      address: "Block B - 202",
      apartmentId: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: ["resident"]
    }
  ],

  // Apartments data
  apartments: [
    { 
      id: 1, 
      name: "Block A - 101", 
      apartmentNumber: "101",
      block: "A", 
      floor: 1,
      area: 75,
      bedrooms: 2,
      bathrooms: 1,
      hasBalcony: true,
      hasElevator: true,
      rentPrice: 8000000,
      servicePrice: 500000,
      deposit: 16000000,
      status: "occupied",
      owner: "Nguyễn Văn A",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      postalCode: "100000",
      district: "Quận 1",
      city: "TP.HCM",
      yearBuilt: 2020,
      description: "Căn hộ 2 phòng ngủ, thoáng mát, view đẹp",
      images: [
        "https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Apartment+A101+1",
        "https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Apartment+A101+2"
      ],
      amenities: ["Điều hòa", "Tủ lạnh", "Máy giặt", "Ban công"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    { 
      id: 2, 
      name: "Block B - 202", 
      apartmentNumber: "202",
      block: "B", 
      floor: 2,
      area: 85,
      bedrooms: 3,
      bathrooms: 2,
      hasBalcony: true,
      hasElevator: true,
      rentPrice: 12000000,
      servicePrice: 600000,
      deposit: 24000000,
      status: "available",
      owner: "Trần Thị B",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      postalCode: "100000",
      district: "Quận 2",
      city: "TP.HCM",
      yearBuilt: 2021,
      description: "Căn hộ 3 phòng ngủ cao cấp, fully furnished",
      images: [
        "https://via.placeholder.com/400x300/009933/FFFFFF?text=Apartment+B202+1",
        "https://via.placeholder.com/400x300/009933/FFFFFF?text=Apartment+B202+2"
      ],
      amenities: ["Điều hòa", "Tủ lạnh", "Máy giặt", "Ban công", "Bếp từ"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    { 
      id: 3, 
      name: "Block C - 305", 
      apartmentNumber: "305",
      block: "C", 
      floor: 3,
      area: 120,
      bedrooms: 3,
      bathrooms: 3,
      hasBalcony: true,
      hasElevator: true,
      rentPrice: 22000000,
      servicePrice: 800000,
      deposit: 44000000,
      status: "available",
      owner: "Lê Văn C",
      address: "789 Đường MNO, Quận 3, TP.HCM",
      postalCode: "100000",
      district: "Quận 3",
      city: "TP.HCM",
      yearBuilt: 2022,
      description: "Căn hộ penthouse sang trọng với sân thượng riêng",
      images: [
        "https://via.placeholder.com/400x300/CC6600/FFFFFF?text=Penthouse+C305+1",
        "https://via.placeholder.com/400x300/CC6600/FFFFFF?text=Penthouse+C305+2"
      ],
      amenities: ["Điều hòa", "Tủ lạnh", "Máy giặt", "Ban công", "Sân thượng", "Bồn tắm"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  // Residents data (detailed user info for residents)
  residents: [
    {
      id: 1,
      userId: 2, // Links to users table
      name: "Nguyễn Văn A",
      email: "resident1@gmail.com",
      phone: "0987654321",
      apartmentId: 1,
      status: "active",
      dateOfBirth: "1990-01-01",
      gender: "Nam",
      citizenId: "123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      emergencyContact: {
        name: "Nguyễn Thị X",
        phone: "0987654321",
        relationship: "Vợ"
      },
      moveInDate: "2023-01-01",
      avatar: "https://via.placeholder.com/150/0066CC/FFFFFF?text=NVA",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      userId: 3,
      name: "Trần Thị B",
      email: "resident2@gmail.com",
      phone: "0909876543",
      apartmentId: 2,
      status: "active",
      dateOfBirth: "1985-05-15",
      gender: "Nữ",
      citizenId: "987654321",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      emergencyContact: {
        name: "Trần Văn Y",
        phone: "0123456789",
        relationship: "Chồng"
      },
      moveInDate: "2023-02-01",
      avatar: "https://via.placeholder.com/150/009933/FFFFFF?text=TTB",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  // Contracts data
  contracts: [
    {
      id: 1,
      code: "HĐ001-2024",
      apartmentId: 1,
      apartmentName: "Block A - 101",
      residentId: 1,
      residentName: "Nguyễn Văn A",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      rentAmount: 8000000,
      depositAmount: 16000000,
      serviceAmount: 500000,
      terms: "Điều khoản hợp đồng...",
      signedDate: "2023-12-25",
      documentUrl: "https://example.com/contracts/contract-001.pdf",
      witnesses: [
        { name: "Trần Văn X", role: "Đại diện chủ đầu tư", signature: "signed" }
      ],
      renewalOption: true,
      earlyTerminationClause: "Có thể chấm dứt sớm với thông báo trước 30 ngày",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  // Invoices data
  invoices: [
    {
      id: 1,
      code: "HD001-2024-12",
      apartmentId: 1,
      apartmentName: "Block A - 101",
      residentId: 1,
      residentName: "Nguyễn Văn A",
      month: "2024-12",
      issueDate: "2024-12-01",
      dueDate: "2024-12-15",
      amount: 8500000,
      status: "paid",
      type: "monthly_rent",
      description: "Hóa đơn tiền thuê tháng 12/2024",
      details: {
        rentAmount: 8000000,
        serviceAmount: 500000,
        electricityAmount: 0,
        waterAmount: 0,
        otherFees: 0
      },
      paymentMethod: "bank_transfer",
      paidAt: "2024-12-10T10:30:00Z",
      transactionId: "TXN123456789",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  // Feedbacks data
  feedbacks: [
    {
      id: 1,
      title: "Vấn đề về thang máy",
      content: "Thang máy tòa A bị hỏng từ 3 ngày nay",
      category: "maintenance",
      priority: "high",
      status: "pending",
      residentId: 1,
      residentName: "Nguyễn Văn A",
      apartmentId: 1,
      apartmentName: "Block A - 101",
      images: ["https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Elevator+Problem"],
      adminResponse: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  // Service Fees data
  serviceFees: [
    {
      id: 1,
      name: "Phí quản lý",
      amount: 50000,
      type: "monthly",
      description: "Phí quản lý tòa nhà hàng tháng",
      isActive: true,
      appliesTo: "all",
      effectiveDate: "2023-01-01",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  // Notifications data
  notifications: [
    {
      id: 1,
      title: "Thông báo bảo trì hệ thống",
      content: "Tòa nhà sẽ tiến hành bảo trì hệ thống điện vào Chủ nhật tuần tới",
      type: "maintenance",
      priority: "high",
      status: "active",
      targetAudience: "all_residents",
      publishedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      authorId: 1,
      authorName: "Ban Quản Lý",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

// Counters for generating new IDs
export const idCounters = {
  users: 4,
  apartments: 4,
  residents: 3,
  contracts: 2,
  invoices: 2,
  feedbacks: 2,
  serviceFees: 2,
  notifications: 2
};

// Utility functions
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const generateId = (entityType) => {
  return idCounters[entityType]++;
};

export const findById = (entityType, id) => {
  return mockDataStore[entityType].find(item => item.id === parseInt(id));
};

export const findByField = (entityType, field, value) => {
  return mockDataStore[entityType].filter(item => item[field] === value);
};

export const updateById = (entityType, id, data) => {
  const index = mockDataStore[entityType].findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    mockDataStore[entityType][index] = {
      ...mockDataStore[entityType][index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return mockDataStore[entityType][index];
  }
  return null;
};

export const deleteById = (entityType, id) => {
  const index = mockDataStore[entityType].findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    mockDataStore[entityType].splice(index, 1);
    return true;
  }
  return false;
};

export const addEntity = (entityType, data) => {
  const newEntity = {
    ...data,
    id: generateId(entityType),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockDataStore[entityType].push(newEntity);
  return newEntity;
};
