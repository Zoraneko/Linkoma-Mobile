import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, List } from '@ant-design/react-native';

export default function EmployeeDashboard() {
  const tabs = [
    { title: 'Công việc' },
    { title: 'Phản hồi' },
  ];

  return (
    <Tabs tabs={tabs}>
      <View style={styles.tabContent}>
        <List renderHeader={'Danh sách công việc'}>
          <List.Item>Sửa máy bơm lầu 2</List.Item>
          <List.Item>Dọn vệ sinh Block A</List.Item>
        </List>
      </View>
      <View style={styles.tabContent}>
        <List renderHeader={'Phản hồi mới'}>
          <List.Item>Ống nước Block B rò rỉ</List.Item>
        </List>
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContent: { flex: 1, padding: 10 },
});
