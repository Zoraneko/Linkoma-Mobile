import React, { useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import {
  ModernScreenWrapper,
  ModernFormInput,
  ModernButton,
  ModernCard,
} from "../../../components";
import contractService from "../../../services/contractService";

export default function ContractEditScreen({ route, navigation }) {
  const { contract } = route.params || {};

  const [formData, setFormData] = useState({
    contractCode: contract?.contractCode || "",
    apartmentId: contract?.apartmentId || "",
    residentId: contract?.residentId || "",
    startDate: contract?.startDate || "",
    endDate: contract?.endDate || "",
    monthlyRent: contract?.monthlyRent?.toString() || "",
    deposit: contract?.deposit?.toString() || "",
    status: contract?.status || "active",
    notes: contract?.notes || "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contractCode.trim()) {
      newErrors.contractCode = "Mã hợp đồng không được để trống";
    }

    if (!formData.apartmentId.trim()) {
      newErrors.apartmentId = "Căn hộ không được để trống";
    }

    if (!formData.residentId.trim()) {
      newErrors.residentId = "Cư dân không được để trống";
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = "Ngày bắt đầu không được để trống";
    }

    if (!formData.endDate.trim()) {
      newErrors.endDate = "Ngày kết thúc không được để trống";
    }

    if (!formData.monthlyRent.trim()) {
      newErrors.monthlyRent = "Tiền thuê hàng tháng không được để trống";
    } else if (
      isNaN(formData.monthlyRent) ||
      parseFloat(formData.monthlyRent) <= 0
    ) {
      newErrors.monthlyRent = "Tiền thuê phải là số hợp lệ và lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      Alert.alert("Lỗi", "Vui lòng kiểm tra lại thông tin");
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        ...formData,
        monthlyRent: parseFloat(formData.monthlyRent),
        deposit: formData.deposit ? parseFloat(formData.deposit) : 0,
      };

      await contractService.updateContract(contract.id, updateData);
      Alert.alert("Thành công", "Cập nhật hợp đồng thành công", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error updating contract:", error);
      Alert.alert("Lỗi", "Không thể cập nhật hợp đồng");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa hợp đồng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            await contractService.deleteContract(contract.id);
            Alert.alert("Thành công", "Xóa hợp đồng thành công", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          } catch (error) {
            console.error("Error deleting contract:", error);
            Alert.alert("Lỗi", "Không thể xóa hợp đồng");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <ModernScreenWrapper
      title="Chỉnh sửa hợp đồng"
      subtitle="Cập nhật thông tin hợp đồng"
      headerColor="#2C3E50"
      loading={loading}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModernCard title="Thông tin hợp đồng">
          <ModernFormInput
            label="Mã hợp đồng"
            value={formData.contractCode}
            onChangeText={(value) => updateField("contractCode", value)}
            placeholder="Nhập mã hợp đồng"
            icon="description"
            error={errors.contractCode}
          />

          <ModernFormInput
            label="ID Căn hộ"
            value={formData.apartmentId}
            onChangeText={(value) => updateField("apartmentId", value)}
            placeholder="Nhập ID căn hộ"
            icon="home"
            error={errors.apartmentId}
          />

          <ModernFormInput
            label="ID Cư dân"
            value={formData.residentId}
            onChangeText={(value) => updateField("residentId", value)}
            placeholder="Nhập ID cư dân"
            icon="person"
            error={errors.residentId}
          />
        </ModernCard>

        <ModernCard title="Thời gian hợp đồng">
          <ModernFormInput
            label="Ngày bắt đầu"
            value={formData.startDate}
            onChangeText={(value) => updateField("startDate", value)}
            placeholder="DD/MM/YYYY"
            icon="event"
            error={errors.startDate}
          />

          <ModernFormInput
            label="Ngày kết thúc"
            value={formData.endDate}
            onChangeText={(value) => updateField("endDate", value)}
            placeholder="DD/MM/YYYY"
            icon="event-available"
            error={errors.endDate}
          />
        </ModernCard>

        <ModernCard title="Thông tin tài chính">
          <ModernFormInput
            label="Tiền thuê hàng tháng (VNĐ)"
            value={formData.monthlyRent}
            onChangeText={(value) => updateField("monthlyRent", value)}
            placeholder="Nhập số tiền"
            icon="attach-money"
            keyboardType="numeric"
            error={errors.monthlyRent}
          />

          <ModernFormInput
            label="Tiền cọc (VNĐ)"
            value={formData.deposit}
            onChangeText={(value) => updateField("deposit", value)}
            placeholder="Nhập tiền cọc (không bắt buộc)"
            icon="account-balance-wallet"
            keyboardType="numeric"
          />
        </ModernCard>

        <ModernCard title="Ghi chú">
          <ModernFormInput
            label="Ghi chú"
            value={formData.notes}
            onChangeText={(value) => updateField("notes", value)}
            placeholder="Ghi chú thêm về hợp đồng"
            icon="note"
            multiline
          />
        </ModernCard>

        <View style={{ marginTop: 20, gap: 12, paddingBottom: 20 }}>
          <ModernButton
            title="Cập nhật hợp đồng"
            onPress={handleUpdate}
            loading={loading}
            icon="save"
          />

          <ModernButton
            title="Xóa hợp đồng"
            onPress={handleDelete}
            variant="danger"
            icon="delete"
          />
        </View>
      </ScrollView>
    </ModernScreenWrapper>
  );
}
