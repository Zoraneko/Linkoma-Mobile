// Mock Invoice Service with enhanced data
let invoices = [
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
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    code: "HD002-2024-12",
    apartmentId: 2,
    apartmentName: "Block B - 202",
    residentId: 2,
    residentName: "Trần Thị B",
    month: "2024-12",
    issueDate: "2024-12-01",
    dueDate: "2024-12-15",
    amount: 12600000,
    status: "pending",
    type: "monthly_rent",
    description: "Hóa đơn tiền thuê tháng 12/2024",
    details: {
      rentAmount: 12000000,
      serviceAmount: 600000,
      electricityAmount: 0,
      waterAmount: 0,
      otherFees: 0
    },
    paymentMethod: null,
    paidAt: null,
    transactionId: null,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    code: "HD003-2024-12",
    apartmentId: 3,
    apartmentName: "Block C - 305",
    residentId: 3,
    residentName: "Lê Văn C",
    month: "2024-12",
    issueDate: "2024-12-01",
    dueDate: "2024-12-15",
    amount: 22800000,
    status: "overdue",
    type: "monthly_rent",
    description: "Hóa đơn tiền thuê tháng 12/2024",
    details: {
      rentAmount: 22000000,
      serviceAmount: 800000,
      electricityAmount: 0,
      waterAmount: 0,
      otherFees: 0
    },
    paymentMethod: null,
    paidAt: null,
    transactionId: null,
    overdueDate: "2024-12-16",
    lateFee: 228000, // 1% of total amount
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    code: "HD001-2025-01",
    apartmentId: 1,
    apartmentName: "Block A - 101",
    residentId: 1,
    residentName: "Nguyễn Văn A",
    month: "2025-01",
    issueDate: "2025-01-01",
    dueDate: "2025-01-15",
    amount: 8500000,
    status: "pending",
    type: "monthly_rent",
    description: "Hóa đơn tiền thuê tháng 01/2025",
    details: {
      rentAmount: 8000000,
      serviceAmount: 500000,
      electricityAmount: 0,
      waterAmount: 0,
      otherFees: 0
    },
    paymentMethod: null,
    paidAt: null,
    transactionId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
let idCounter = 5;

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllInvoices = async (filters = {}) => {
  await delay();
  let filteredInvoices = [...invoices];
  
  if (filters.status) {
    filteredInvoices = filteredInvoices.filter(i => i.status === filters.status);
  }
  if (filters.residentId) {
    filteredInvoices = filteredInvoices.filter(i => i.residentId === parseInt(filters.residentId));
  }
  if (filters.apartmentId) {
    filteredInvoices = filteredInvoices.filter(i => i.apartmentId === parseInt(filters.apartmentId));
  }
  if (filters.month) {
    filteredInvoices = filteredInvoices.filter(i => i.month === filters.month);
  }
  if (filters.type) {
    filteredInvoices = filteredInvoices.filter(i => i.type === filters.type);
  }
  
  // Sort by issue date (newest first)
  filteredInvoices.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
  
  return filteredInvoices;
};

export const getInvoiceById = async (id) => {
  await delay(300);
  return invoices.find((i) => i.id === parseInt(id));
};

export const createInvoice = async (data) => {
  await delay(800);
  const newInvoice = { 
    ...data, 
    id: idCounter++,
    code: data.code || `HD${String(idCounter).padStart(3, '0')}-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
    status: data.status || "pending",
    type: data.type || "monthly_rent",
    issueDate: data.issueDate || new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  invoices.push(newInvoice);
  return newInvoice;
};

export const updateInvoice = async (id, data) => {
  await delay(800);
  invoices = invoices.map((i) => 
    i.id === parseInt(id) ? { ...i, ...data, updatedAt: new Date().toISOString() } : i
  );
  return invoices.find((i) => i.id === parseInt(id));
};

export const removeInvoice = async (id) => {
  await delay(600);
  invoices = invoices.filter((i) => i.id !== parseInt(id));
  return true;
};

export const payInvoice = async (id, paymentData) => {
  await delay(1000);
  const invoice = invoices.find(i => i.id === parseInt(id));
  if (!invoice) {
    throw new Error("Không tìm thấy hóa đơn");
  }
  
  // Simulate payment processing
  const isSuccess = Math.random() > 0.1; // 90% success rate
  
  if (isSuccess) {
    invoice.status = "paid";
    invoice.paymentMethod = paymentData.paymentMethod;
    invoice.paidAt = new Date().toISOString();
    invoice.transactionId = `TXN${Date.now()}`;
    invoice.updatedAt = new Date().toISOString();
    
    return {
      success: true,
      invoice,
      message: "Thanh toán thành công"
    };
  } else {
    throw new Error("Thanh toán thất bại. Vui lòng thử lại.");
  }
};

export const getOverdueInvoices = async () => {
  await delay();
  const overdueInvoices = invoices.filter(i => i.status === "overdue");
  return overdueInvoices;
};

export const getInvoicesByResident = async (residentId) => {
  await delay();
  const residentInvoices = invoices.filter(i => i.residentId === parseInt(residentId));
  return residentInvoices.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
};
