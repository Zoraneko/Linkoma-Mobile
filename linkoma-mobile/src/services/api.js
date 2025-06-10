// Mock API Service - Simulates HTTP requests for development
import { delay } from "./mockData";

// Mock API responses with consistent format
const createMockResponse = (data, status = 200) => ({
  data,
  status,
  statusText: "OK",
  headers: {},
  config: {}
});

// Mock HTTP methods
const mockApi = {
  get: async (url, config = {}) => {
    console.log(`Mock GET: ${url}`);
    await delay();
    
    // Simulate different responses based on URL
    if (url.includes("/apartments")) {
      return createMockResponse({
        success: true,
        data: [], // This will be handled by individual services
        message: "Success"
      });
    }
    
    return createMockResponse({
      success: true,
      data: null,
      message: "Mock GET response"
    });
  },
  
  post: async (url, data, config = {}) => {
    console.log(`Mock POST: ${url}`, data);
    await delay();
    
    return createMockResponse({
      success: true,
      data: null,
      message: "Mock POST response"
    });
  },
  
  put: async (url, data, config = {}) => {
    console.log(`Mock PUT: ${url}`, data);
    await delay();
    
    return createMockResponse({
      success: true,
      data: null,
      message: "Mock PUT response"
    });
  },
  
  patch: async (url, data, config = {}) => {
    console.log(`Mock PATCH: ${url}`, data);
    await delay();
    
    return createMockResponse({
      success: true,
      data: null,
      message: "Mock PATCH response"
    });
  },
  
  delete: async (url, config = {}) => {
    console.log(`Mock DELETE: ${url}`);
    await delay();
    
    return createMockResponse({
      success: true,
      message: "Mock DELETE response"
    });
  }
};

// Mock request interceptor
mockApi.interceptors = {
  request: {
    use: (onFulfilled, onRejected) => {
      console.log("Mock request interceptor registered");
      return { eject: () => {} };
    }
  },
  response: {
    use: (onFulfilled, onRejected) => {
      console.log("Mock response interceptor registered");
      return { eject: () => {} };
    }
  }
};

// Create mock instance
const api = mockApi;
const apiNoAuth = mockApi;

export { api, apiNoAuth };
export default api;
