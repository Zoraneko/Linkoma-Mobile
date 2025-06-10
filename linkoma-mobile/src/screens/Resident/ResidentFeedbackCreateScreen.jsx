import React, { useState } from "react";
import { View, Alert } from "react-native";
import {
  ModernScreenWrapper,
  ModernFormInput,
  ModernButton,
} from "../../components";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import feedbackService from "../../services/feedbackService";

export default function ResidentFeedbackCreateScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề là bắt buộc";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Nội dung là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await feedbackService.createFeedback({
        ...formData,
        residentId: user.userId,
        status: "pending",
      });
      Alert.alert("Thành công", "Gửi phản hồi thành công!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Không gửi được phản hồi");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  return (
    <ModernScreenWrapper
      title="Gửi phản hồi"
      subtitle="Tạo phản hồi mới"
      headerColor="#1976D2"
    >
      <View style={{ paddingBottom: 20 }}>
        <ModernFormInput
          label="Tiêu đề"
          value={formData.title}
          onChangeText={(value) => updateField("title", value)}
          placeholder="Nhập tiêu đề phản hồi"
          icon="title"
          required
          error={errors.title}
        />

        <ModernFormInput
          label="Nội dung"
          value={formData.content}
          onChangeText={(value) => updateField("content", value)}
          placeholder="Mô tả chi tiết vấn đề hoặc đề xuất của bạn"
          icon="description"
          multiline
          numberOfLines={6}
          required
          error={errors.content}
        />

        <ModernFormInput
          label="Danh mục"
          value={formData.category}
          onChangeText={(value) => updateField("category", value)}
          placeholder="Ví dụ: Khiếu nại, Đề xuất, Báo cáo sự cố"
          icon="category"
          error={errors.category}
        />

        <ModernFormInput
          label="Mức độ ưu tiên"
          value={formData.priority}
          onChangeText={(value) => updateField("priority", value)}
          placeholder="low/medium/high/urgent"
          icon="priority-high"
          error={errors.priority}
        />

        <View style={{ marginTop: 20, gap: 12 }}>
          <ModernButton
            title="Gửi phản hồi"
            onPress={handleSubmit}
            loading={loading}
            icon="send"
            fullWidth
          />

          <ModernButton
            title="Hủy"
            onPress={() => navigation.goBack()}
            type="outline"
            fullWidth
          />
        </View>
      </View>
    </ModernScreenWrapper>
  );
}
