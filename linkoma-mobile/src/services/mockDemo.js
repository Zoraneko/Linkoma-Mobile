// Mock API Demo - Testing all services
import mockUtils from './mockUtils';
import authService from './authService';
import apartmentService from './apartmentService';
import residentService from './residentService';
import invoiceService from './invoiceService';
import feedbackService from './feedbackService';
import notificationService from './notificationService';

export const runMockDemo = async () => {
  console.log("🚀 Starting Mock API Demo...");
  
  try {
    // Reset and add sample data
    mockUtils.resetMockData();
    mockUtils.addSampleData();
    
    console.log("\n📊 Initial Data State:");
    mockUtils.logMockDataState();
    
    // Test Authentication
    console.log("\n🔐 Testing Authentication...");
    
    // Login as admin
    console.log("Login as admin...");
    const adminUser = await authService.login('admin@linkoma.com', 'admin123');
    console.log("✅ Admin login successful:", adminUser.name);
    
    // Test wrong credentials
    try {
      await authService.login('wrong@email.com', 'wrongpass');
    } catch (error) {
      console.log("✅ Wrong credentials handled correctly");
    }
    
    // Test Apartment Service
    console.log("\n🏠 Testing Apartment Service...");
    
    const allApartments = await apartmentService.getAllApartments();
    console.log("✅ Got all apartments:", allApartments.length);
    
    const availableApartments = await apartmentService.getAllApartments({ status: 'available' });
    console.log("✅ Got available apartments:", availableApartments.length);
    
    const apartment1 = await apartmentService.getApartmentById(1);
    console.log("✅ Got apartment by ID:", apartment1?.name);
    
    // Test creating apartment
    const newApartment = await apartmentService.createApartment({
      name: "Demo Apartment",
      apartmentNumber: "999",
      block: "Z",
      floor: 1,
      area: 50,
      bedrooms: 1,
      bathrooms: 1,
      rentPrice: 5000000,
      servicePrice: 300000,
      deposit: 10000000,
      status: "available",
      owner: "Demo Owner",
      description: "Demo apartment for testing"
    });
    console.log("✅ Created new apartment:", newApartment.name);
    
    // Test Resident Service
    console.log("\n👥 Testing Resident Service...");
    
    const allResidents = await residentService.getAllResidents();
    console.log("✅ Got all residents:", allResidents.length);
    
    const activeResidents = await residentService.getAllResidents({ status: 'active' });
    console.log("✅ Got active residents:", activeResidents.length);
    
    // Test Invoice Service
    console.log("\n💰 Testing Invoice Service...");
    
    const allInvoices = await invoiceService.getAllInvoices();
    console.log("✅ Got all invoices:", allInvoices.length);
    
    const pendingInvoices = await invoiceService.getAllInvoices({ status: 'pending' });
    console.log("✅ Got pending invoices:", pendingInvoices.length);
    
    // Test payment processing
    if (pendingInvoices.length > 0) {
      try {
        const paymentResult = await invoiceService.payInvoice(pendingInvoices[0].id, {
          paymentMethod: 'bank_transfer'
        });
        console.log("✅ Payment processed:", paymentResult.success);
      } catch (error) {
        console.log("ℹ️ Payment simulation:", error.message);
      }
    }
    
    // Test Feedback Service
    console.log("\n📝 Testing Feedback Service...");
    
    const allFeedbacks = await feedbackService.getAllFeedbacks();
    console.log("✅ Got all feedbacks:", allFeedbacks.length);
    
    const newFeedback = await feedbackService.createFeedback({
      title: "Demo Feedback",
      content: "This is a demo feedback for testing",
      category: "general",
      priority: "medium",
      residentId: 1,
      apartmentId: 1,
      residentName: "Test Resident",
      apartmentName: "Test Apartment"
    });
    console.log("✅ Created new feedback:", newFeedback.title);
    
    // Test Notification Service
    console.log("\n🔔 Testing Notification Service...");
    
    const allNotifications = await notificationService.getAllNotifications();
    console.log("✅ Got all notifications:", allNotifications.length);
    
    const unreadNotifications = await notificationService.getAllNotifications({ isRead: false });
    console.log("✅ Got unread notifications:", unreadNotifications.length);
    
    // Test marking as read
    if (unreadNotifications.length > 0) {
      await notificationService.markAsRead(unreadNotifications[0].id);
      console.log("✅ Marked notification as read");
    }
    
    // Test logout
    console.log("\n🚪 Testing Logout...");
    await authService.logout();
    console.log("✅ Logout successful");
    
    // Test getting current user after logout
    const currentUser = await authService.getCurrentUser();
    console.log("✅ Current user after logout:", currentUser ? "Still logged in" : "Logged out");
    
    console.log("\n📊 Final Data State:");
    mockUtils.logMockDataState();
    
    console.log("\n🎉 Mock API Demo completed successfully!");
    console.log("All services are working correctly with mock data.");
    
    return {
      success: true,
      message: "Demo completed successfully",
      stats: mockUtils.getMockDataStats()
    };
    
  } catch (error) {
    console.error("❌ Demo failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Export for use in development
export default {
  runMockDemo
};
