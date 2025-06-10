// Services Index - Export all mock services
export { default as api } from './api';
export { default as authService } from './authService';
export { default as apartmentService } from './apartmentService';
export { default as residentService } from './residentService';
export { default as contractService } from './contractService';
export { default as invoiceService } from './invoiceService';
export { default as feedbackService } from './feedbackService';
export { default as serviceFeeService } from './serviceFeeService';
export { default as notificationService } from './notificationService';

// Export individual functions for backward compatibility
export * from './apartmentService';
export * from './residentService';
export * from './contractService';
export * from './invoiceService';
export * from './feedbackService';
export * from './serviceFeeService';
export * from './notificationService';

// Export mock data store
export * from './mockData';