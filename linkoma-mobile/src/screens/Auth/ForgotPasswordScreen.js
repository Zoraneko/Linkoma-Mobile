import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputItem, Button, Toast, List } from '@ant-design/react-native';

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
    <View style={styles.container}>
      <List renderHeader={'Quên mật khẩu'}>
        <InputItem value={email} onChange={setEmail} placeholder="Email">
          Email
        </InputItem>
      </List>
      <Button type="primary" style={styles.button} onPress={handleReset}>
        Gửi mật khẩu
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { marginTop: 20 },
});
