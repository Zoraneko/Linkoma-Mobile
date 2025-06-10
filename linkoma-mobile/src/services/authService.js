// Mock Auth Service with enhanced data
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "@ant-design/react-native";

// Mock users data
const mockUsers = [
  {
    id: 1,
    email: "admin@linkoma.com",
    username: "admin",
    password: "admin123",
    name: "Quản trị viên",
    phone: "0123456789",
    role: "admin",
    avatar: "https://via.placeholder.com/150/0066CC/FFFFFF?text=ADMIN",
    isActive: true,
    createdAt: new Date().toISOString(),
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
    isActive: true,
    apartmentId: 1,
    createdAt: new Date().toISOString(),
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
    isActive: true,
    apartmentId: 2,
    createdAt: new Date().toISOString(),
    permissions: ["resident"]
  },
  {
    id: 4,
    email: "employee@linkoma.com",
    username: "employee1",
    password: "emp123",
    name: "Lê Văn C",
    phone: "0912345678",
    role: "employee",
    avatar: "https://via.placeholder.com/150/FF6600/FFFFFF?text=LVC",
    isActive: true,
    createdAt: new Date().toISOString(),
    permissions: ["apartment_management", "contract_management", "invoice_management"]
  }
];

// Simulate network delay
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const login = async (email, password) => {
  console.log("=== Mock Login Process ===");
  console.log("Email:", email);
  
  await delay(); // Simulate network delay
  
  try {
    // Find user by email or username
    const user = mockUsers.find(u => 
      (u.email === email.trim() || u.username === email.trim()) && 
      u.password === password
    );
    
    if (!user) {
      Toast.fail("Email hoặc mật khẩu không đúng", 2);
      throw new Error("Invalid credentials");
    }
    
    if (!user.isActive) {
      Toast.fail("Tài khoản đã bị khóa", 2);
      throw new Error("Account is inactive");
    }
    
    // Generate mock token
    const mockToken = `mock-jwt-token-${user.id}-${Date.now()}`;
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
    
    // Save to AsyncStorage
    await AsyncStorage.setItem("accessToken", mockToken);
    await AsyncStorage.setItem("accessTokenExpires", tokenExpires);
    await AsyncStorage.setItem("user", JSON.stringify({
      ...user,
      password: undefined // Don't store password
    }));
    
    console.log("✅ Mock login successful for:", user.name);
    Toast.success(`Chào mừng ${user.name}!`, 2);
    
    return {
      ...user,
      password: undefined,
      token: mockToken,
      expires: tokenExpires
    };
    
  } catch (error) {
    console.log("❌ Mock login failed:", error.message);
    throw error;
  }
};

const register = async (userData) => {
  console.log("=== Mock Register Process ===");
  console.log("User data:", userData);
  
  await delay(); // Simulate network delay
  
  try {
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      Toast.fail("Email đã được sử dụng", 2);
      throw new Error("Email already exists");
    }
    
    // Check if username already exists
    const existingUsername = mockUsers.find(u => u.username === userData.username);
    if (existingUsername) {
      Toast.fail("Tên đăng nhập đã được sử dụng", 2);
      throw new Error("Username already exists");
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: userData.role || "resident",
      avatar: userData.avatar || `https://via.placeholder.com/150/0066CC/FFFFFF?text=${userData.name.charAt(0)}`,
      isActive: true,
      createdAt: new Date().toISOString(),
      permissions: userData.role === "admin" ? ["all"] : ["resident"]
    };
    
    mockUsers.push(newUser);
    
    console.log("✅ Mock registration successful for:", newUser.name);
    Toast.success("Đăng ký thành công!", 2);
    
    return {
      ...newUser,
      password: undefined
    };
    
  } catch (error) {
    console.log("❌ Mock registration failed:", error.message);
    throw error;
  }
};

const logout = async () => {
  console.log("=== Mock Logout Process ===");
  
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("accessTokenExpires");
    await AsyncStorage.removeItem("user");
    
    console.log("✅ Mock logout successful");
    Toast.success("Đăng xuất thành công", 2);
    
  } catch (error) {
    console.log("❌ Mock logout failed:", error.message);
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const userStr = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("accessToken");
    const expires = await AsyncStorage.getItem("accessTokenExpires");
    
    if (!userStr || !token) {
      return null;
    }
    
    // Check if token is expired
    if (expires && new Date(expires) < new Date()) {
      console.log("Token expired, clearing storage");
      await logout();
      return null;
    }
    
    const user = JSON.parse(userStr);
    console.log("✅ Current user retrieved:", user.name);
    
    return user;
    
  } catch (error) {
    console.log("❌ Error getting current user:", error.message);
    return null;
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const expires = await AsyncStorage.getItem("accessTokenExpires");
    
    // Check if token is expired
    if (expires && new Date(expires) < new Date()) {
      console.log("Token expired");
      await logout();
      return null;
    }
    
    return token;
    
  } catch (error) {
    console.log("❌ Error getting token:", error.message);
    return null;
  }
};

const changePassword = async (currentPassword, newPassword) => {
  console.log("=== Mock Change Password Process ===");
  
  await delay();
  
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // Find user in mockUsers to check current password
    const userInStore = mockUsers.find(u => u.id === user.id);
    if (!userInStore || userInStore.password !== currentPassword) {
      Toast.fail("Mật khẩu hiện tại không đúng", 2);
      throw new Error("Current password is incorrect");
    }
    
    // Update password
    userInStore.password = newPassword;
    
    console.log("✅ Password changed successfully");
    Toast.success("Đổi mật khẩu thành công", 2);
    
    return { success: true, message: "Password changed successfully" };
    
  } catch (error) {
    console.log("❌ Change password failed:", error.message);
    throw error;
  }
};

const forgotPassword = async (email) => {
  console.log("=== Mock Forgot Password Process ===");
  console.log("Email:", email);
  
  await delay();
  
  try {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      Toast.fail("Email không tồn tại trong hệ thống", 2);
      throw new Error("Email not found");
    }
    
    console.log("✅ Password reset email sent (simulated)");
    Toast.success("Đã gửi email reset mật khẩu", 2);
    
    return { success: true, message: "Password reset email sent" };
    
  } catch (error) {
    console.log("❌ Forgot password failed:", error.message);
    throw error;
  }
};

const resetPassword = async (token, newPassword) => {
  console.log("=== Mock Reset Password Process ===");
  
  await delay();
  
  try {
    // In a real app, you would validate the reset token
    // For mock, we'll just simulate success
    console.log("✅ Password reset successful (simulated)");
    Toast.success("Mật khẩu đã được đặt lại", 2);
    
    return { success: true, message: "Password reset successful" };
    
  } catch (error) {
    console.log("❌ Reset password failed:", error.message);
    throw error;
  }
};

const updateProfile = async (profileData) => {
  console.log("=== Mock Update Profile Process ===");
  
  await delay();
  
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // Update user in mockUsers
    const userIndex = mockUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      
      // Update stored user data
      const updatedUser = { ...mockUsers[userIndex], password: undefined };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      
      console.log("✅ Profile updated successfully");
      Toast.success("Cập nhật thông tin thành công", 2);
      
      return updatedUser;
    }
    
    throw new Error("User not found");
    
  } catch (error) {
    console.log("❌ Update profile failed:", error.message);
    throw error;
  }
};

const refreshToken = async () => {
  console.log("=== Mock Refresh Token Process ===");
  
  await delay(300);
  
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // Generate new mock token
    const newToken = `mock-jwt-token-${user.id}-${Date.now()}`;
    const newExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    await AsyncStorage.setItem("accessToken", newToken);
    await AsyncStorage.setItem("accessTokenExpires", newExpires);
    
    console.log("✅ Token refreshed successfully");
    
    return { token: newToken, expires: newExpires };
    
  } catch (error) {
    console.log("❌ Token refresh failed:", error.message);
    throw error;
  }
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  getToken,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
  refreshToken,
};
