import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WhiteSpace } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import DynamicForm from "../../components/DynamicForm";
import { List } from "@ant-design/react-native";
import residentService from "../../services/residentService";
import { useAuth } from "../../context/AuthContext";

const residentFields = [
  { key: "name", label: "Tên", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "phoneNumber", label: "Số điện thoại", type: "text" },
  { key: "dateOfBirth", label: "Ngày sinh", type: "text" },
  { key: "citizenId", label: "CMND/CCCD", type: "text" },
  { key: "address", label: "Địa chỉ", type: "text" },
  { key: "licensePlate", label: "Biển số xe", type: "text" },
  { key: "apartmentId", label: "Căn hộ", type: "text" },
];

export default function ResidentInfoScreen() {
  const { user } = useAuth();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchResident = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await residentService.getResidentById(user.userId);
        setInitialData(data || {});
      } catch (e) {
        setInitialData({});
      } finally {
        setLoading(false);
      }
    };
    fetchResident();
  }, [user]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (!initialData) {
    return (
      <View style={styles.center}>
        <List renderHeader={"Thông tin cư dân"}>
          <List.Item>Không tìm thấy thông tin cư dân.</List.Item>
        </List>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <WhiteSpace />
      <DynamicForm
        fields={residentFields}
        initialData={initialData}
        readOnly={true}
      />
    </View>
  );
}
