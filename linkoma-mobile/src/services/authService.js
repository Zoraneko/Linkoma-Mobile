import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "@ant-design/react-native";
import api from "./api";

const login = async (email, password) => {
  Toast.info("Bắt đầu gọi API đăng nhập", 2);
  console.log(
    "Đang gọi API đăng nhập với email:",
    email,
    "và password:",
    password
  );

  try {
    console.log("Trước khi gọi fetch");
    const response = await fetch(
      "https://linkoma-be.onrender.com/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    console.log("Sau khi gọi fetch");
    const resData = await response.json();
    Toast.info("API trả về: " + JSON.stringify(resData), 3);
    console.log("API trả về:", resData);

    // Xử lý response đúng với ví dụ thực tế
    let user, accessToken;
    if (resData && resData.user && resData.accessToken) {
      user = resData.user;
      accessToken = resData.accessToken;
    } else if (
      resData &&
      resData.data &&
      resData.data.user &&
      resData.data.accessToken
    ) {
      // fallback cho trường hợp response lồng trong data.data
      user = resData.data.user;
      accessToken = resData.data.accessToken;
    }
    if (user && accessToken) {
      await AsyncStorage.setItem("accessToken", accessToken.token);
      await AsyncStorage.setItem("accessTokenExpires", accessToken.expires);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Toast.success("Lưu user/token thành công", 2);
      return user;
    }
    Toast.fail("Đăng nhập thất bại: Sai cấu trúc response", 2);
    throw new Error("Đăng nhập thất bại");
  } catch (err) {
    console.log("Lỗi khi gọi API:", err);
    Toast.fail("Lỗi fetch: " + err.message, 4);
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
