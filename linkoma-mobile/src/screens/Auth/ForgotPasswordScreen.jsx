import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputItem, Button, Toast, List } from '@ant-design/react-native';
import { SafeAreaWrapper } from '../../components';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (email) {
      Toast.info('Mật khẩu đã được gửi!', 1);
      navigation.navigate('Login');
    } else {
      Toast.fail('Vui lòng nhập email', 1);
    }
  };
  return (
    <SafeAreaWrapper style={styles.container}>
      <List renderHeader={'Quên mật khẩu'}>
        <InputItem value={email} onChange={setEmail} placeholder="Email">
          Email
        </InputItem>
      </List>
      <Button type="primary" style={styles.button} onPress={handleReset}>
        Gửi mật khẩu
      </Button>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { marginTop: 20 },
});
