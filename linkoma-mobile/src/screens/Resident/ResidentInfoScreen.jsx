import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { ModernScreenWrapper, ModernCard, InfoRow } from "../../components";
import residentService from "../../services/residentService";
import { useAuth } from "../../context/AuthContext";

export default function ResidentInfoScreen() {
  const { user } = useAuth();
  const [residentData, setResidentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResident = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await residentService.getResidentById(user.userId);
      setResidentData(data || {});
    } catch (e) {
      console.error("Error fetching resident:", e);
      Alert.alert("Lỗi", "Không thể tải thông tin cư dân");
      setResidentData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResident();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return "Không có dữ liệu";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <ModernScreenWrapper
      title="Thông tin cá nhân"
      subtitle="Thông tin cư dân"
      headerColor="#1976D2"
      loading={loading}
      onRefresh={fetchResident}
    >
      {!loading && residentData && (
        <View style={{ paddingBottom: 20 }}>
          <ModernCard title="Thông tin cơ bản">
            <InfoRow
              label="Họ và tên"
              value={residentData.name}
              icon="person"
              type="highlight"
            />
            
            <InfoRow
              label="Email"
              value={residentData.email}
              icon="email"
              copyable
            />
            
            <InfoRow
              label="Số điện thoại"
              value={residentData.phoneNumber}
              icon="phone"
              copyable
            />
            
            <InfoRow
              label="Ngày sinh"
              value={formatDate(residentData.dateOfBirth)}
              icon="cake"
            />
            
            <InfoRow
              label="CMND/CCCD"
              value={residentData.citizenId}
              icon="badge"
              copyable
            />
          </ModernCard>

          <ModernCard title="Thông tin liên hệ">
            <InfoRow
              label="Địa chỉ"
              value={residentData.address}
              icon="location-on"
            />
            
            <InfoRow
              label="Căn hộ"
              value={residentData.apartmentName || residentData.apartmentId}
              icon="home"
              type="highlight"
            />
            
            <InfoRow
              label="Block"
              value={residentData.block}
              icon="business"
            />
            
            <InfoRow
              label="Tầng"
              value={residentData.floor?.toString()}
              icon="layers"
            />
          </ModernCard>

          <ModernCard title="Thông tin khác">
            <InfoRow
              label="Biển số xe"
              value={residentData.licensePlate}
              icon="directions-car"
            />
            
            <InfoRow
              label="Trạng thái"
              value={residentData.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
              icon="info"
              type={residentData.status === "active" ? "highlight" : "warning"}
            />
            
            <InfoRow
              label="Ngày tham gia"
              value={formatDate(residentData.createdAt)}
              icon="calendar-today"
            />
            
            <InfoRow
              label="Cập nhật lần cuối"
              value={formatDate(residentData.updatedAt)}
              icon="update"
            />
          </ModernCard>

          {residentData.emergencyContact && (
            <ModernCard title="Liên hệ khẩn cấp">
              <InfoRow
                label="Người liên hệ"
                value={residentData.emergencyContact}
                icon="contact-emergency"
              />
              
              <InfoRow
                label="Số điện thoại"
                value={residentData.emergencyPhone}
                icon="phone-in-talk"
                copyable
              />
            </ModernCard>
          )}
        </View>
      )}
    </ModernScreenWrapper>
  );
}
