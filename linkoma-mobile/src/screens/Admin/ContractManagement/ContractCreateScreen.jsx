import React, { useState } from "react";
import { Alert, View } from "react-native";
import {
  ModernScreenWrapper,
  ModernFormInput,
  ModernButton,
} from "../../../components";
import { createContract } from "../../../services/contractService";

export default function ContractCreateScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    apartment: "",
    startDate: "",
    endDate: "",
    duration: "",
    deposit: "",
    monthlyRent: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Mã hợp đồng là bắt buộc";
    }

    if (!formData.apartment.trim()) {
      newErrors.apartment = "Căn hộ là bắt buộc";
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = "Ngày bắt đầu là bắt buộc";
    }

    if (!formData.endDate.trim()) {
      newErrors.endDate = "Ngày kết thúc là bắt buộc";
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
      await createContract(formData);
      Alert.alert("Thành công", "Tạo hợp đồng thành công!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tạo hợp đồng. Vui lòng thử lại.");
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
      title="Tạo hợp đồng mới"
      subtitle="Nhập thông tin hợp đồng"
      headerColor="#2C3E50"
    >
      <View style={{ paddingBottom: 20 }}>
        <ModernFormInput
          label="Mã hợp đồng"
          value={formData.code}
          onChangeText={(value) => updateField("code", value)}
          placeholder="Nhập mã hợp đồng"
          icon="badge"
          required
          error={errors.code}
        />

        <ModernFormInput
          label="Căn hộ"
          value={formData.apartment}
          onChangeText={(value) => updateField("apartment", value)}
          placeholder="Nhập căn hộ"
          icon="home"
          required
          error={errors.apartment}
        />

        <ModernFormInput
          label="Ngày bắt đầu"
          value={formData.startDate}
          onChangeText={(value) => updateField("startDate", value)}
          placeholder="DD/MM/YYYY"
          icon="event"
          required
          error={errors.startDate}
        />

        <ModernFormInput
          label="Ngày kết thúc"
          value={formData.endDate}
          onChangeText={(value) => updateField("endDate", value)}
          placeholder="DD/MM/YYYY"
          icon="event-busy"
          required
          error={errors.endDate}
        />

        <ModernFormInput
          label="Thời hạn (tháng)"
          value={formData.duration}
          onChangeText={(value) => updateField("duration", value)}
          placeholder="Nhập thời hạn"
          icon="schedule"
          keyboardType="numeric"
          error={errors.duration}
        />

        <ModernFormInput
          label="Tiền đặt cọc"
          value={formData.deposit}
          onChangeText={(value) => updateField("deposit", value)}
          placeholder="Nhập số tiền đặt cọc"
          icon="account-balance-wallet"
          keyboardType="numeric"
          error={errors.deposit}
        />

        <ModernFormInput
          label="Tiền thuê tháng"
          value={formData.monthlyRent}
          onChangeText={(value) => updateField("monthlyRent", value)}
          placeholder="Nhập tiền thuê hàng tháng"
          icon="attach-money"
          keyboardType="numeric"
          error={errors.monthlyRent}
        />

        <ModernFormInput
          label="Mô tả"
          value={formData.description}
          onChangeText={(value) => updateField("description", value)}
          placeholder="Nhập mô tả hợp đồng"
          icon="description"
          multiline
          numberOfLines={4}
          error={errors.description}
        />

        <View style={{ marginTop: 20, gap: 12 }}>
          <ModernButton
            title="Tạo hợp đồng"
            onPress={handleSubmit}
            loading={loading}
            icon="assignment"
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
