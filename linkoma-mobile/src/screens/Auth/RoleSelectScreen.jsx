import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, List } from '@ant-design/react-native';

export default function RoleSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <List renderHeader={'Chọn vai trò'}>
        <Button style={styles.button} onPress={() => navigation.navigate('AdminDashboard')}>
          Quản trị viên
        </Button>
        <Button style={styles.button} onPress={() => navigation.navigate('ResidentDashboard')}>
          Cư dân
        </Button>
        <Button style={styles.button} onPress={() => navigation.navigate('EmployeeDashboard')}>
          Nhân viên
        </Button>
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { marginVertical: 8 },
});
