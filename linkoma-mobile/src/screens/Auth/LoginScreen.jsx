import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputItem, Button, Toast, List } from '@ant-design/react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      Toast.info('Đăng nhập thành công!', 1);
      navigation.navigate('RoleSelect');
    } else {
      Toast.fail('Vui lòng nhập đủ thông tin', 1);
    }
  };

  return (
    <View style={styles.container}>
      <List renderHeader={'Đăng nhập'}>
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
      <Button onPress={() => navigation.navigate('Signup')} style={styles.link}>
        Đăng ký
      </Button>
      <Button onPress={() => navigation.navigate('ForgotPassword')} style={styles.link}>
        Quên mật khẩu?
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { marginTop: 20 },
  link: { marginTop: 10 },
});
