import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { InputItem, Button, Toast, List } from "@ant-design/react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const user = await login(username, password);
        Toast.info("Đăng nhập thành công!", 1);
        // Đợi Toast hiển thị xong rồi mới điều hướng
        setTimeout(() => {
          if (user.role === "admin") {
            navigation.reset({
              index: 0,
              routes: [{ name: "AdminDashboard" }],
            });
          } else if (user.role === "employee") {
            navigation.reset({
              index: 0,
              routes: [{ name: "EmployeeDashboard" }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "ResidentDashboard" }],
            });
          }
        }, 1200);
      } catch (e) {
        Toast.fail("Sai tài khoản hoặc mật khẩu hoặc lỗi kết nối", 2);
        console.log("Lỗi đăng nhập:", e);
      }
    } else {
      Toast.fail("Vui lòng nhập đủ thông tin", 1);
    }
  };

  return (
    <View style={styles.container}>
      <List renderHeader={"Đăng nhập"}>
        <InputItem
          value={username}
          onChange={setUsername}
          placeholder="Tên đăng nhập"
        >
          Tên
        </InputItem>
        <InputItem
          value={password}
          onChange={setPassword}
          placeholder="Mật khẩu"
          type="password"
        >
          Mật khẩu
        </InputItem>
      </List>
      <Button style={styles.button} type="primary" onPress={handleLogin}>
        Đăng nhập
      </Button>
      <Button onPress={() => navigation.navigate("Signup")} style={styles.link}>
        Đăng ký
      </Button>
      <Button
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.link}
      >
        Quên mật khẩu?
      </Button>
      {/* Shortcut tạm thời để vào ResidentDashboard không cần đăng nhập */}
      <Button
        style={[styles.link, { backgroundColor: "#e6f7ff" }]}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "ResidentDashboard" }],
          })
        }
      >
        Shortcut Resident Dashboard
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { marginTop: 20 },
  link: { marginTop: 10 },
});
