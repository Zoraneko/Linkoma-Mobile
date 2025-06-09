import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, List, Button, WhiteSpace, Flex } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboard() {
  const navigation = useNavigation();

  const tabs = [
    { title: 'Cư dân' },
    { title: 'Căn hộ' },
    { title: 'Phản hồi' },
    { title: 'Thông báo' },
  ];

  const residents = [
    { id: 1, name: 'Nguyễn Văn A', dob: '1990-01-01', gender: 'Nam' },
    { id: 2, name: 'Trần Thị B', dob: '1995-05-12', gender: 'Nữ' },
  ];

  const handleCreate = () => {
    navigation.navigate('CreateResident');
  };

  const handleView = (resident) => {
    navigation.navigate('ViewResident', { resident });
  };

  const handleEdit = (resident) => {
    navigation.navigate('EditResident', { resident });
  };

  return (
    <Tabs tabs={tabs} tabBarPosition="top">
      {/* TAB: CƯ DÂN */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreate}>
          Thêm cư dân
        </Button>
        <WhiteSpace />
        <List renderHeader={'Danh sách cư dân'}>
          {residents.map((resident) => (
            <List.Item
              key={resident.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleView(resident)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEdit(resident)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {resident.name}
            </List.Item>
          ))}
        </List>
      </View>

      {/* TAB: CĂN HỘ */}
      <View style={styles.tabContent}>
        <List renderHeader={'Quản lý căn hộ'}>
          <List.Item>Block A - 101</List.Item>
          <List.Item>Block B - 202</List.Item>
        </List>
      </View>

      {/* TAB: PHẢN HỒI */}
      <View style={styles.tabContent}>
        <List renderHeader={'Phản hồi'}>
          <List.Item>Thiếu nước lầu 3</List.Item>
          <List.Item>Đèn hành lang hỏng</List.Item>
        </List>
      </View>

      {/* TAB: THÔNG BÁO */}
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
  smallBtn: { marginHorizontal: 4 },
  flexRow: { flexDirection: 'row', justifyContent: 'flex-end' },
});
