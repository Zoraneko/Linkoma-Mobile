import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  ModernScreenWrapper,
  ModernCard,
  ModernButton,
} from "../../components";
import { MaterialIcons } from "@expo/vector-icons";
import contractService from "../../services/contractService";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function ResidentContractListScreen() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user } = useAuth();

  const fetchContracts = async () => {
    if (!user) return setLoading(false);
    setLoading(true);
    try {
      const data = await contractService.getContractsByResident(user.userId);
      setContracts(data || []);
    } catch (e) {
      console.error("Error fetching contracts:", e);
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [user]);

  const handleView = (contract) =>
    navigation.navigate("ResidentContractView", { contract });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#27AE60";
      case "expired":
        return "#E74C3C";
      case "pending":
        return "#F39C12";
      case "cancelled":
        return "#95A5A6";
      default:
        return "#7F8C8D";
    }
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return "check-circle";
      case "expired":
        return "cancel";
      case "pending":
        return "hourglass-empty";
      case "cancelled":
        return "block";
      default:
        return "help";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không có dữ liệu";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const isExpiringSoon = (endDate) => {
    if (!endDate) return false;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const renderEmptyState = () => (
    <ModernCard>
      <View style={styles.emptyState}>
        <MaterialIcons name="assignment" size={64} color="#BDC3C7" />
        <Text style={styles.emptyTitle}>Chưa có hợp đồng</Text>
        <Text style={styles.emptySubtitle}>
          Bạn chưa có hợp đồng nào. Vui lòng liên hệ ban quản lý để được hỗ trợ.
        </Text>
      </View>
    </ModernCard>
  );

  const renderContractItem = (contract) => (
    <TouchableOpacity
      key={contract.id}
      onPress={() => handleView(contract)}
      activeOpacity={0.8}
    >
      <ModernCard style={{ marginBottom: 12 }}>
        <View style={styles.contractHeader}>
          <View style={styles.contractIcon}>
            <MaterialIcons name="assignment" size={24} color="#1976D2" />
          </View>

          <View style={styles.contractContent}>
            <Text style={styles.contractTitle} numberOfLines={2}>
              {contract.title || `Hợp đồng #${contract.id}`}
            </Text>
            <Text style={styles.contractType} numberOfLines={1}>
              {contract.type || "Hợp đồng thuê"}
            </Text>
          </View>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(contract.status) },
              ]}
            >
              <MaterialIcons
                name={getStatusIcon(contract.status)}
                size={16}
                color="#FFFFFF"
              />
              <Text style={styles.statusText}>
                {getStatusText(contract.status)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contractDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={16} color="#1976D2" />
            <Text style={styles.dateText}>
              Từ: {formatDate(contract.startDate)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="event-available" size={16} color="#757575" />
            <Text style={styles.dateText}>
              Đến: {formatDate(contract.endDate)}
            </Text>
          </View>

          {contract.monthlyRent && (
            <View style={styles.detailRow}>
              <MaterialIcons name="attach-money" size={16} color="#27AE60" />
              <Text style={styles.rentText}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(contract.monthlyRent)}
              </Text>
            </View>
          )}
        </View>

        {isExpiringSoon(contract.endDate) && (
          <View style={styles.warningBanner}>
            <MaterialIcons name="warning" size={16} color="#F39C12" />
            <Text style={styles.warningText}>Hợp đồng sắp hết hạn!</Text>
          </View>
        )}
      </ModernCard>
    </TouchableOpacity>
  );

  return (
    <ModernScreenWrapper
      title="Hợp đồng của tôi"
      subtitle={`${contracts.length} hợp đồng`}
      headerColor="#1976D2"
      loading={loading}
      onRefresh={fetchContracts}
    >
      <View style={styles.container}>
        {contracts.length === 0 ? (
          renderEmptyState()
        ) : (
          <>{contracts.map(renderContractItem)}</>
        )}
      </View>
    </ModernScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    lineHeight: 24,
  },
  contractHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  contractIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contractContent: {
    flex: 1,
  },
  contractTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  contractType: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  contractDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  rentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27AE60",
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  warningText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F39C12",
  },
});
