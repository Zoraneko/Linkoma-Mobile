import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "@ant-design/react-native";
import { Alert } from "react-native"; // Thêm Alert để debug
// import { api, apiNoAuth } from "./api";

// Tạo axios instance riêng cho login với cấu hình tốt hơn
import axios from "axios";
const loginApi = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL || "https://linkoma-be.onrender.com/v1",
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để log requests
loginApi.interceptors.request.use(
  (config) => {
    console.log("Sending request to:", config.baseURL + config.url);
    console.log("Request data:", config.data);
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Thêm interceptor để log responses
loginApi.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.statusText);
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.log("Response error:", error.response?.status, error.message);
    if (error.code === "ECONNABORTED") {
      console.log("Request timeout");
    }
    return Promise.reject(error);
  }
);

const login = async (email, password) => {
  console.log("=== BẮT ĐẦU ĐĂNG NHẬP ===");
  console.log("Email:", email);
  console.log(
    "API URL:",
    process.env.EXPO_PUBLIC_API_URL || "https://linkoma-be.onrender.com/v1"
  );

  try {
    // Thêm thông báo trước khi gọi API
    Alert.alert("Đang đăng nhập...", "Vui lòng đợi trong giây lát");

    console.log("Gửi request đến /auth/login...");
    const response = await loginApi.post("/auth/login", {
      email: email.trim(),
      password: password,
    });

    console.log("✅ Nhận được response từ server");
    console.log("Status:", response.status);
    console.log("Headers:", response.headers);

    const resData = response.data;
    console.log("Response data:", JSON.stringify(resData, null, 2));

    // Xử lý response theo cấu trúc API thực tế
    let user, accessToken;

    // Kiểm tra nhiều cấu trúc response có thể có
    if (resData && resData.user && resData.accessToken) {
      // Cấu trúc: { user, accessToken }
      user = resData.user;
      accessToken = resData.accessToken;
      console.log("✅ Sử dụng cấu trúc response level 1");
    } else if (resData && resData.data) {
      // Cấu trúc: { data: { user, accessToken } }
      if (resData.data.user && resData.data.accessToken) {
        user = resData.data.user;
        accessToken = resData.data.accessToken;
        console.log("✅ Sử dụng cấu trúc response level 2");
      }
    } else if (resData && resData.success && resData.result) {
      // Cấu trúc: { success, result: { user, token } }
      user = resData.result.user;
      accessToken = { token: resData.result.token };
      console.log("✅ Sử dụng cấu trúc response success/result");
    }

    if (user && accessToken) {
      console.log("✅ Tìm thấy user và token trong response");

      // Lưu token
      const tokenToSave = accessToken.token || accessToken;
      await AsyncStorage.setItem("accessToken", tokenToSave);

      if (accessToken.expires) {
        await AsyncStorage.setItem("accessTokenExpires", accessToken.expires);
      }

      // Lưu user
      await AsyncStorage.setItem("user", JSON.stringify(user));

      console.log("✅ Lưu thông tin đăng nhập thành công");
      Toast.success("Đăng nhập thành công!", 2);
      return user;
    }

    // Nếu không tìm thấy user/token
    console.log("❌ Không tìm thấy user hoặc token trong response");
    Alert.alert("Lỗi", "Server trả về dữ liệu không đúng format");
    throw new Error("Invalid response format");
  } catch (err) {
    console.log("❌ LỖI ĐĂNG NHẬP:", err);

    let errorMessage = "Lỗi không xác định";

    if (err.code === "ECONNABORTED") {
      errorMessage = "Kết nối timeout. Vui lòng thử lại.";
    } else if (err.response) {
      // Server trả về lỗi
      console.log("Server error status:", err.response.status);
      console.log("Server error data:", err.response.data);

      if (err.response.status === 401) {
        errorMessage = "Email hoặc mật khẩu không đúng";
      } else if (err.response.status >= 500) {
        errorMessage = "Lỗi server. Vui lòng thử lại sau.";
      } else {
        errorMessage =
          err.response.data?.message || `Lỗi ${err.response.status}`;
      }
    } else if (err.request) {
      // Không nhận được response
      console.log("No response received:", err.request);
      errorMessage = "Không thể kết nối đến server. Kiểm tra kết nối mạng.";
    } else {
      // Lỗi khác
      errorMessage = err.message;
    }

    Alert.alert("Đăng nhập thất bại", errorMessage);
    Toast.fail(errorMessage, 3);
    throw err;
  }
};

const logout = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("accessTokenExpires");
  await AsyncStorage.removeItem("user");
};

const getCurrentUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const getToken = async () => {
  return await AsyncStorage.getItem("accessToken");
};

export default {
  login,
  logout,
  getCurrentUser,
  getToken,
};
