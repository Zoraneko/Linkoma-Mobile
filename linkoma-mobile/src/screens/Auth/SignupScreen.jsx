import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputItem, Button, List, Toast } from '@ant-design/react-native';
import { SafeAreaWrapper } from '../../components';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (username && password) {
      Toast.success('Đăng ký thành công!', 1);
      navigation.navigate('Login');
    } else {
      Toast.fail('Vui lòng nhập đủ thông tin', 1);
    }
  };
  return (
    <SafeAreaWrapper style={styles.container}>
      <List renderHeader={'Đăng ký'}>
        <InputItem value={username} onChange={setUsername} placeholder="Tên đăng nhập">
          Tên
        </InputItem>
        <InputItem value={password} onChange={setPassword} placeholder="Mật khẩu" type="password">
          Mật khẩu
        </InputItem>
      </List>
      <Button type="primary" style={styles.button} onPress={handleSignup}>
        Đăng ký
      </Button>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { marginTop: 20 },
});
