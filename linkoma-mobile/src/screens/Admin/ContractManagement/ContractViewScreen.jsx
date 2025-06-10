import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import {
  ModernScreenWrapper,
  ModernCard,
  InfoRow,
  ModernButton,
} from "../../../components";
import contractService from "../../../services/contractService";

export default function ContractViewScreen({ route, navigation }) {
  const { contractId } = route.params || {};
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContract = async () => {
    if (!contractId) return;
    setLoading(true);
    try {
      const data = await contractService.getContractById(contractId);
      setContract(data);
    } catch (error) {
      console.error("Error fetching contract:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin hợp đồng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [contractId]);

  const handleEdit = () => {
    navigation.navigate("ContractEditScreen", { contract });
  };

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa hợp đồng này? Hành động này không thể hoàn tác.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await contractService.deleteContract(contractId);
              Alert.alert("Thành công", "Xóa hợp đồng thành công", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              console.error("Error deleting contract:", error);
              Alert.alert("Lỗi", "Không thể xóa hợp đồng");
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không có dữ liệu";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "highlight";
      case "expired":
        return "danger";
      case "terminated":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang hiệu lực";
      case "expired":
        return "Đã hết hạn";
      case "terminated":
        return "Đã chấm dứt";
      default:
        return "Không xác định";
    }
  };

  if (!contract && !loading) {
    return (
      <ModernScreenWrapper
        title="Chi tiết hợp đồng"
        subtitle="Thông tin không tồn tại"
        headerColor="#2C3E50"
      >
        <ModernCard>
          <InfoRow
            label="Thông báo"
            value="Hợp đồng không tồn tại hoặc đã bị xóa"
            icon="error"
            type="warning"
          />
        </ModernCard>
      </ModernScreenWrapper>
    );
  }

  return (
    <ModernScreenWrapper
      title="Chi tiết hợp đồng"
      subtitle="Thông tin chi tiết hợp đồng"
      headerColor="#2C3E50"
      loading={loading}
      onRefresh={fetchContract}
    >
      {contract && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ModernCard title="Thông tin hợp đồng">
            <InfoRow
              label="Mã hợp đồng"
              value={contract.contractCode}
              icon="description"
              type="highlight"
              copyable
            />

            <InfoRow
              label="Căn hộ"
              value={contract.apartmentName || contract.apartmentId}
              icon="home"
            />

            <InfoRow
              label="Cư dân"
              value={contract.residentName || contract.residentId}
              icon="person"
            />

            <InfoRow
              label="Trạng thái"
              value={getStatusText(contract.status)}
              icon="info"
              type={getStatusColor(contract.status)}
            />
          </ModernCard>

          <ModernCard title="Thời gian hợp đồng">
            <InfoRow
              label="Ngày bắt đầu"
              value={formatDate(contract.startDate)}
              icon="event"
            />

            <InfoRow
              label="Ngày kết thúc"
              value={formatDate(contract.endDate)}
              icon="event-available"
            />

            <InfoRow
              label="Thời hạn"
              value={
                contract.duration
                  ? `${contract.duration} tháng`
                  : "Không xác định"
              }
              icon="schedule"
            />
          </ModernCard>

          <ModernCard title="Thông tin tài chính">
            <InfoRow
              label="Tiền thuê hàng tháng"
              value={formatCurrency(contract.monthlyRent)}
              icon="attach-money"
              type="highlight"
            />

            <InfoRow
              label="Tiền cọc"
              value={formatCurrency(contract.deposit)}
              icon="account-balance-wallet"
            />

            <InfoRow
              label="Tổng giá trị hợp đồng"
              value={formatCurrency(contract.totalValue)}
              icon="receipt"
            />
          </ModernCard>

          {contract.notes && (
            <ModernCard title="Ghi chú">
              <InfoRow label="Ghi chú" value={contract.notes} icon="note" />
            </ModernCard>
          )}

          <ModernCard title="Thông tin hệ thống">
            <InfoRow
              label="Ngày tạo"
              value={formatDate(contract.createdAt)}
              icon="calendar-today"
            />

            <InfoRow
              label="Cập nhật lần cuối"
              value={formatDate(contract.updatedAt)}
              icon="update"
            />

            <InfoRow
              label="Người tạo"
              value={contract.createdBy || "Hệ thống"}
              icon="person-add"
            />
          </ModernCard>

          <View style={{ marginTop: 20, gap: 12, paddingBottom: 20 }}>
            <ModernButton
              title="Chỉnh sửa hợp đồng"
              onPress={handleEdit}
              icon="edit"
            />

            <ModernButton
              title="Xóa hợp đồng"
              onPress={handleDelete}
              variant="danger"
              icon="delete"
            />
          </View>
        </ScrollView>
      )}
    </ModernScreenWrapper>
  );
}
