import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, List } from '@ant-design/react-native';

export default function AdminDashboard() {
  const tabs = [
    { title: 'Cư dân' },
    { title: 'Căn hộ' },
    { title: 'Phản hồi' },
    { title: 'Thông báo' },
  ];

  return (
    <Tabs tabs={tabs} tabBarPosition="top">
      <View style={styles.tabContent}>
        <List renderHeader={'Danh sách cư dân'}>
          <List.Item>Nguyễn Văn A</List.Item>
          <List.Item>Trần Thị B</List.Item>
        </List>
      </View>
      <View style={styles.tabContent}>
        <List renderHeader={'Quản lý căn hộ'}>
          <List.Item>Block A - 101</List.Item>
          <List.Item>Block B - 202</List.Item>
        </List>
      </View>
      <View style={styles.tabContent}>
        <List renderHeader={'Phản hồi'}>
          <List.Item>Thiếu nước lầu 3</List.Item>
          <List.Item>Đèn hành lang hỏng</List.Item>
        </List>
      </View>
      <View style={styles.tabContent}>
        <List renderHeader={'Thông báo'}>
          <List.Item>Lịch bảo trì tháng 6</List.Item>
          <List.Item>Thông báo tiền điện</List.Item>
        </List>
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContent: { flex: 1, padding: 10 },
});
