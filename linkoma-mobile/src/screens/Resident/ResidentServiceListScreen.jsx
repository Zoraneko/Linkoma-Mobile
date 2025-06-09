import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { List, WhiteSpace, Button } from "@ant-design/react-native";
import serviceFeeService from "../../services/serviceFeeService";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function ResidentServiceListScreen() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await serviceFeeService.getServicesByResident(user.userId);
        setServices(data || []);
      } catch (e) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [user]);

  const handleRegister = () => navigation.navigate("ResidentServiceRegister");

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <WhiteSpace />
      <Button type="primary" onPress={handleRegister}>
        Đăng ký dịch vụ mới
      </Button>
      <WhiteSpace />
      <List renderHeader={"Dịch vụ đã đăng ký"}>
        {services.map((sv) => (
          <List.Item key={sv.id}>{sv.name}</List.Item>
        ))}
      </List>
    </View>
  );
}
