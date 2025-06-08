import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, List } from '@ant-design/react-native';

export default function ResidentDashboard() {
  const tabs = [
    { title: 'Thông tin cư trú' },
    { title: 'Hóa đơn' },
    { title: 'Thông báo' },
  ];

  return (
    <Tabs tabs={tabs}>
      <View style={styles.tabContent}>
        <List renderHeader={'Thông tin cá nhân'}>
          <List.Item>Tên: Nguyễn Văn A</List.Item>
          <List.Item>Căn hộ: B302</List.Item>
        </List>
      </View>
      <View style={styles.tabContent}>
        <List renderHeader={'Hóa đơn'}>
          <List.Item>Điện tháng 5 - 200.000đ</List.Item>
          <List.Item>Nước tháng 5 - 80.000đ</List.Item>
        </List>
      </View>
      <View style={styles.tabContent}>
        <List renderHeader={'Thông báo'}>
          <List.Item>Thông báo đóng phí quản lý</List.Item>
        </List>
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContent: { flex: 1, padding: 10 },
});
