import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { List, WhiteSpace, Button } from "@ant-design/react-native";
import notificationService from "../../services/notificationService";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function ResidentNotificationListScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const data = await notificationService.getNotificationsByResident(
          user.userId
        );
        setNotifications(data || []);
      } catch (e) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  const handleView = (notification) =>
    navigation.navigate("ResidentNotificationView", { notification });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <WhiteSpace />
      <List renderHeader={"Thông báo"}>
        {notifications.map((nt) => (
          <List.Item
            key={nt.id}
            extra={
              <Button size="small" onPress={() => handleView(nt)}>
                Xem
              </Button>
            }
          >
            {nt.title}
          </List.Item>
        ))}
      </List>
    </View>
  );
}
