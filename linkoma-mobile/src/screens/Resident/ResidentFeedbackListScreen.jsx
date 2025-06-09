import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Button, List, WhiteSpace } from "@ant-design/react-native";
import feedbackService from "../../services/feedbackService";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ResidentFeedbackListScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!user) return setLoading(false);
      setLoading(true);
      try {
        const data = await feedbackService.getFeedbacksByResident(user.userId);
        setFeedbacks(data || []);
      } catch (e) {
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [user]);

  const handleCreate = () => navigation.navigate("ResidentFeedbackCreate");
  const handleView = (feedback) =>
    navigation.navigate("ResidentFeedbackView", { feedback });
  const handleEdit = (feedback) =>
    navigation.navigate("ResidentFeedbackEdit", { feedback });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <WhiteSpace />
      <Button type="primary" onPress={handleCreate}>
        Gửi phản hồi mới
      </Button>
      <WhiteSpace />
      <List renderHeader={"Phản hồi của bạn"}>
        {feedbacks.map((fb) => (
          <List.Item
            key={fb.id}
            extra={
              <>
                <Button
                  size="small"
                  onPress={() => handleView(fb)}
                  style={{ marginRight: 8 }}
                >
                  Xem
                </Button>
                <Button
                  size="small"
                  type="ghost"
                  onPress={() => handleEdit(fb)}
                >
                  Sửa
                </Button>
              </>
            }
          >
            {fb.title}
          </List.Item>
        ))}
      </List>
    </View>
  );
}
