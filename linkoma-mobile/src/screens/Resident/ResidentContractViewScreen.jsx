import React from "react";
import { View } from "react-native";
import { ModernScreenWrapper, ModernCard, InfoRow } from "../../components";
import { useRoute } from "@react-navigation/native";

export default function ResidentContractViewScreen() {
  const route = useRoute();
  const { contract } = route.params;

  const formatDate = (dateString) => {
    if (!dateString) return "Không có dữ liệu";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang hiệu lực";
      case "expired":
        return "Đã hết hạn";
      case "pending":
        return "Chờ xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "highlight";
      case "expired":
        return "danger";
      case "pending":
        return "warning";
      case "cancelled":
        return "default";
      default:
        return "default";
    }
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "Không xác định";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
      return `${diffYears} năm ${diffMonths % 12} tháng`;
    } else if (diffMonths > 0) {
      return `${diffMonths} tháng`;
    } else {
      return `${diffDays} ngày`;
    }
  };

  if (!contract) {
    return (
      <ModernScreenWrapper
        title="Chi tiết hợp đồng"
        subtitle="Thông tin không tồn tại"
        headerColor="#1976D2"
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
      subtitle={contract.title || `Hợp đồng #${contract.id}`}
      headerColor="#1976D2"
    >
      <View style={{ paddingBottom: 20 }}>
        <ModernCard title="Thông tin hợp đồng">
          <InfoRow
            label="Tiêu đề"
            value={contract.title || `Hợp đồng #${contract.id}`}
            icon="description"
            type="highlight"
          />

          <InfoRow
            label="Nội dung"
            value={contract.content || "Không có nội dung"}
            icon="article"
          />

          <InfoRow
            label="Loại hợp đồng"
            value={contract.type || "Không xác định"}
            icon="category"
          />

          <InfoRow
            label="Trạng thái"
            value={getStatusText(contract.status)}
            icon="assignment"
            type={getStatusColor(contract.status)}
          />
        </ModernCard>

        <ModernCard title="Thời gian hiệu lực">
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
            label="Thời hạn hợp đồng"
            value={calculateDuration(contract.startDate, contract.endDate)}
            icon="schedule"
            type="highlight"
          />
        </ModernCard>

        {contract.terms && (
          <ModernCard title="Điều khoản hợp đồng">
            <InfoRow label="Điều khoản" value={contract.terms} icon="gavel" />
          </ModernCard>
        )}

        {contract.deposit && (
          <ModernCard title="Thông tin tài chính">
            <InfoRow
              label="Tiền đặt cọc"
              value={new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(contract.deposit)}
              icon="attach-money"
              type="highlight"
            />

            {contract.monthlyRent && (
              <InfoRow
                label="Tiền thuê hàng tháng"
                value={new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(contract.monthlyRent)}
                icon="payment"
              />
            )}
          </ModernCard>
        )}

        {contract.notes && (
          <ModernCard title="Ghi chú">
            <InfoRow label="Ghi chú" value={contract.notes} icon="note" />
          </ModernCard>
        )}

        <ModernCard title="Thông tin ký kết">
          <InfoRow
            label="Ngày ký"
            value={formatDate(contract.signedAt)}
            icon="create"
          />

          <InfoRow
            label="Người ký"
            value={contract.signedBy || "Không xác định"}
            icon="person"
          />

          {contract.witnessedBy && (
            <InfoRow
              label="Người làm chứng"
              value={contract.witnessedBy}
              icon="supervisor-account"
            />
          )}
        </ModernCard>
      </View>
    </ModernScreenWrapper>
  );
}
