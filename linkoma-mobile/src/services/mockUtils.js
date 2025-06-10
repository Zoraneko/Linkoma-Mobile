// Mock API Testing Utilities
import { mockDataStore, idCounters } from './mockData';

// Reset all data to initial state
export const resetMockData = () => {
  console.log("🔄 Resetting all mock data to initial state");
  
  // Reset counters
  Object.keys(idCounters).forEach(key => {
    idCounters[key] = mockDataStore[key]?.length + 1 || 1;
  });
  
  console.log("✅ Mock data reset complete");
};

// Add sample data for testing
export const addSampleData = () => {
  console.log("📊 Adding sample data for testing");
  
  // Add more apartments
  const sampleApartments = [
    {
      id: idCounters.apartments++,
      name: "Block D - 401",
      apartmentNumber: "401",
      block: "D",
      floor: 4,
      area: 90,
      bedrooms: 2,
      bathrooms: 2,
      hasBalcony: true,
      hasElevator: true,
      rentPrice: 15000000,
      servicePrice: 700000,
      deposit: 30000000,
      status: "available",
      owner: "Phạm Văn D",
      address: "101 Đường PQR, Quận 4, TP.HCM",
      postalCode: "100000",
      district: "Quận 4",
      city: "TP.HCM",
      yearBuilt: 2023,
      description: "Căn hộ hiện đại với view sông",
      images: [
        "https://via.placeholder.com/400x300/9933CC/FFFFFF?text=Apartment+D401+1",
        "https://via.placeholder.com/400x300/9933CC/FFFFFF?text=Apartment+D401+2"
      ],
      amenities: ["Điều hòa", "Tủ lạnh", "Máy giặt", "Ban công", "View sông"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  mockDataStore.apartments.push(...sampleApartments);
  
  // Add more residents
  const sampleResidents = [
    {
      id: idCounters.residents++,
      userId: idCounters.users,
      name: "Phạm Văn D",
      email: "phamvand@gmail.com",
      phone: "0901234567",
      apartmentId: null, // Not assigned yet
      status: "pending",
      dateOfBirth: "1992-03-15",
      gender: "Nam",
      citizenId: "112233445",
      address: "101 Đường PQR, Quận 4, TP.HCM",
      emergencyContact: {
        name: "Phạm Thị E",
        phone: "0908765432",
        relationship: "Chị gái"
      },
      moveInDate: null,
      avatar: "https://via.placeholder.com/150/9933CC/FFFFFF?text=PVD",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  mockDataStore.residents.push(...sampleResidents);
  
  // Add corresponding user
  const sampleUser = {
    id: idCounters.users++,
    email: "phamvand@gmail.com",
    username: "phamvand",
    password: "123456",
    name: "Phạm Văn D",
    phone: "0901234567",
    role: "resident",
    avatar: "https://via.placeholder.com/150/9933CC/FFFFFF?text=PVD",
    address: "101 Đường PQR, Quận 4, TP.HCM",
    apartmentId: null,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    permissions: ["resident"]
  };
  
  mockDataStore.users.push(sampleUser);
  
  console.log("✅ Sample data added successfully");
};

// Get statistics
export const getMockDataStats = () => {
  const stats = {};
  
  Object.keys(mockDataStore).forEach(key => {
    stats[key] = {
      count: mockDataStore[key].length,
      nextId: idCounters[key] || 1
    };
  });
  
  return stats;
};

// Log current state
export const logMockDataState = () => {
  console.log("📊 Current Mock Data State:");
  console.table(getMockDataStats());
  
  console.log("🏠 Apartments:", mockDataStore.apartments.map(a => ({ id: a.id, name: a.name, status: a.status })));
  console.log("👥 Users:", mockDataStore.users.map(u => ({ id: u.id, name: u.name, role: u.role })));
  console.log("🏘️ Residents:", mockDataStore.residents.map(r => ({ id: r.id, name: r.name, status: r.status })));
};

// Simulate network errors for testing
export const simulateNetworkError = (errorType = 'timeout') => {
  const errors = {
    timeout: new Error('Network timeout'),
    server: new Error('Server error (500)'),
    notFound: new Error('Not found (404)'),
    unauthorized: new Error('Unauthorized (401)'),
    forbidden: new Error('Forbidden (403)')
  };
  
  return Promise.reject(errors[errorType] || errors.timeout);
};

// Test all services
export const testAllServices = async () => {
  console.log("🧪 Testing all mock services...");
  
  try {
    // Test apartment service
    const { getAllApartments } = await import('./apartmentService');
    const apartments = await getAllApartments();
    console.log("✅ Apartment Service: OK", apartments.length, "apartments");
    
    // Test resident service  
    const { getAllResidents } = await import('./residentService');
    const residents = await getAllResidents();
    console.log("✅ Resident Service: OK", residents.length, "residents");
    
    // Test other services...
    console.log("✅ All services tested successfully");
    
  } catch (error) {
    console.error("❌ Service test failed:", error);
  }
};

export default {
  resetMockData,
  addSampleData,
  getMockDataStats,
  logMockDataState,
  simulateNetworkError,
  testAllServices
};
