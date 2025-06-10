// Mock Resident Service with enhanced data
let residents = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
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
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0987654321",
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
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0909123456",
    apartmentId: 3,
    status: "active",
    dateOfBirth: "1988-12-20",
    gender: "Nam",
    citizenId: "456789123",
    address: "789 Đường MNO, Quận 3, TP.HCM",
    emergencyContact: {
      name: "Lê Thị Z",
      phone: "0908765432",
      relationship: "Chị gái"
    },
    moveInDate: "2023-03-01",
    avatar: "https://via.placeholder.com/150/CC6600/FFFFFF?text=LVC",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
let idCounter = 4;

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllResidents = async (filters = {}) => {
  await delay();
  let filteredResidents = [...residents];
  
  if (filters.status) {
    filteredResidents = filteredResidents.filter(r => r.status === filters.status);
  }
  if (filters.apartmentId) {
    filteredResidents = filteredResidents.filter(r => r.apartmentId === parseInt(filters.apartmentId));
  }
  
  return filteredResidents;
};

export const getResidentById = async (id) => {
  await delay(300);
  return residents.find((r) => r.id === parseInt(id));
};

export const createResident = async (data) => {
  await delay(800);
  const newResident = { 
    ...data, 
    id: idCounter++,
    status: data.status || "active",
    avatar: data.avatar || `https://via.placeholder.com/150/0066CC/FFFFFF?text=${data.name.charAt(0)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  residents.push(newResident);
  return newResident;
};

export const updateResident = async (id, data) => {
  await delay(800);
  residents = residents.map((r) => 
    r.id === parseInt(id) ? { ...r, ...data, updatedAt: new Date().toISOString() } : r
  );
  return residents.find((r) => r.id === parseInt(id));
};

export const removeResident = async (id) => {
  await delay(600);
  residents = residents.filter((r) => r.id !== parseInt(id));
  return true;
};


// Lấy thông tin cư dân theo id
/* const getResidentById = async (id) => {
  // Giả sử API: GET /residents/:id
  try {
    const res = await fetch(
      `https://linkoma-be.onrender.com/v1/residents/${id}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!res.ok) throw new Error("Không tìm thấy cư dân");
    return await res.json();
  } catch (e) {
    return null;
  }
}; */

export default {
  getResidentById,
};
