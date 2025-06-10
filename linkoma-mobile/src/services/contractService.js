// Mock Contract Service with enhanced data
let contracts = [
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
    terms: `
      1. Người thuê cam kết sử dụng căn hộ đúng mục đích ở.
      2. Thanh toán tiền thuê đầy đủ, đúng hạn vào ngày 5 hàng tháng.
      3. Bảo quản tài sản trong căn hộ, bồi thường nếu có hư hại.
      4. Tuân thủ nội quy chung của tòa nhà.
      5. Không được chuyển nhượng hợp đồng cho bên thứ 3.
    `,
    signedDate: "2023-12-25",
    documentUrl: "https://example.com/contracts/contract-001.pdf",
    witnesses: [
      { name: "Trần Văn X", role: "Đại diện chủ đầu tư", signature: "signed" },
      { name: "Nguyễn Thị Y", role: "Nhân chứng", signature: "signed" }
    ],
    renewalOption: true,
    earlyTerminationClause: "Có thể chấm dứt sớm với thông báo trước 30 ngày",
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    code: "HĐ002-2024",
    apartmentId: 2,
    apartmentName: "Block B - 202",
    residentId: 2,
    residentName: "Trần Thị B",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    status: "active",
    rentAmount: 12000000,
    depositAmount: 24000000,
    serviceAmount: 600000,
    terms: `
      1. Người thuê cam kết sử dụng căn hộ đúng mục đích ở.
      2. Thanh toán tiền thuê đầy đủ, đúng hạn vào ngày 1 hàng tháng.
      3. Bảo quản tài sản trong căn hộ, bồi thường nếu có hư hại.
      4. Tuân thủ nội quy chung của tòa nhà.
      5. Được phép nuôi thú cưng với điều kiện không gây ồn ào.
    `,
    signedDate: "2024-01-20",
    documentUrl: "https://example.com/contracts/contract-002.pdf",
    witnesses: [
      { name: "Trần Văn X", role: "Đại diện chủ đầu tư", signature: "signed" },
      { name: "Lê Thị Z", role: "Nhân chứng", signature: "signed" }
    ],
    renewalOption: true,
    earlyTerminationClause: "Có thể chấm dứt sớm với thông báo trước 60 ngày",
    createdAt: new Date(Date.now() - 330 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    code: "HĐ003-2024",
    apartmentId: 3,
    apartmentName: "Block C - 305",
    residentId: 3,
    residentName: "Lê Văn C",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    status: "active",
    rentAmount: 22000000,
    depositAmount: 44000000,
    serviceAmount: 800000,
    terms: `
      1. Người thuê cam kết sử dụng căn hộ đúng mục đích ở.
      2. Thanh toán tiền thuê đầy đủ, đúng hạn vào ngày 1 hàng tháng.
      3. Bảo quản tài sản trong căn hộ, bồi thường nếu có hư hại.
      4. Tuân thủ nội quy chung của tòa nhà.
      5. Được sử dụng sân thượng riêng, chịu trách nhiệm bảo trì.
    `,
    signedDate: "2024-02-20",
    documentUrl: "https://example.com/contracts/contract-003.pdf",
    witnesses: [
      { name: "Trần Văn X", role: "Đại diện chủ đầu tư", signature: "signed" },
      { name: "Phạm Thị W", role: "Nhân chứng", signature: "signed" }
    ],
    renewalOption: true,
    earlyTerminationClause: "Có thể chấm dứt sớm với thông báo trước 90 ngày",
    createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];
let idCounter = 4;

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllContracts = async (filters = {}) => {
  await delay();
  let filteredContracts = [...contracts];
  
  if (filters.status) {
    filteredContracts = filteredContracts.filter(c => c.status === filters.status);
  }
  if (filters.residentId) {
    filteredContracts = filteredContracts.filter(c => c.residentId === parseInt(filters.residentId));
  }
  if (filters.apartmentId) {
    filteredContracts = filteredContracts.filter(c => c.apartmentId === parseInt(filters.apartmentId));
  }
  
  // Sort by start date (newest first)
  filteredContracts.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  
  return filteredContracts;
};

export const getContractById = async (id) => {
  await delay(300);
  return contracts.find((c) => c.id === parseInt(id));
};

export const createContract = async (data) => {
  await delay(800);
  const newContract = { 
    ...data, 
    id: idCounter++,
    code: data.code || `HĐ${String(idCounter).padStart(3, '0')}-${new Date().getFullYear()}`,
    status: data.status || "draft",
    witnesses: data.witnesses || [],
    renewalOption: data.renewalOption !== undefined ? data.renewalOption : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  contracts.push(newContract);
  return newContract;
};

export const updateContract = async (id, data) => {
  await delay(800);
  contracts = contracts.map((c) => 
    c.id === parseInt(id) ? { ...c, ...data, updatedAt: new Date().toISOString() } : c
  );
  return contracts.find((c) => c.id === parseInt(id));
};

export const removeContract = async (id) => {
  await delay(600);
  contracts = contracts.filter((c) => c.id !== parseInt(id));
  return true;
};

export const renewContract = async (id, renewalData) => {
  await delay(1000);
  const contract = contracts.find(c => c.id === parseInt(id));
  if (!contract) {
    throw new Error("Không tìm thấy hợp đồng");
  }
  
  const renewedContract = {
    ...contract,
    id: idCounter++,
    code: `${contract.code}-R1`,
    startDate: renewalData.startDate,
    endDate: renewalData.endDate,
    rentAmount: renewalData.rentAmount || contract.rentAmount,
    serviceAmount: renewalData.serviceAmount || contract.serviceAmount,
    status: "active",
    signedDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Mark old contract as expired
  contract.status = "expired";
  contract.updatedAt = new Date().toISOString();
  
  contracts.push(renewedContract);
  return renewedContract;
};

export const terminateContract = async (id, terminationData) => {
  await delay(800);
  const contract = contracts.find(c => c.id === parseInt(id));
  if (!contract) {
    throw new Error("Không tìm thấy hợp đồng");
  }
  
  contract.status = "terminated";
  contract.terminatedDate = new Date().toISOString().split('T')[0];
  contract.terminationReason = terminationData.reason;
  contract.updatedAt = new Date().toISOString();
  
  return contract;
};

export const getContractsByResident = async (residentId) => {
  await delay();
  const residentContracts = contracts.filter(c => c.residentId === parseInt(residentId));
  return residentContracts.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
};

export const getExpiringContracts = async (days = 30) => {
  await delay();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  
  const expiringContracts = contracts.filter(c => {
    const endDate = new Date(c.endDate);
    return c.status === "active" && endDate <= futureDate && endDate >= new Date();
  });
  
  return expiringContracts;
};
