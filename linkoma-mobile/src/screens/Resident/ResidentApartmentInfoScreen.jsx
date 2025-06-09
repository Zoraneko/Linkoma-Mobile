import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import DynamicForm from "../../components/DynamicForm";
import apartmentService from "../../services/apartmentService";
import { useAuth } from "../../context/AuthContext";

const apartmentFields = [
  { key: "name", label: "Tên căn hộ", type: "text" },
  { key: "address", label: "Địa chỉ", type: "text" },
  { key: "floor", label: "Tầng", type: "number" },
  { key: "area", label: "Diện tích (m²)", type: "number" },
  { key: "owner", label: "Chủ sở hữu", type: "text" },
  { key: "status", label: "Trạng thái", type: "text" },
];

export default function ResidentApartmentInfoScreen() {
  const { user } = useAuth();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      if (!user || !user.apartmentId) return setLoading(false);
      setLoading(true);
      try {
        const data = await apartmentService.getApartmentById(user.apartmentId);
        setInitialData(data || {});
      } catch (e) {
        setInitialData({});
      } finally {
        setLoading(false);
      }
    };
    fetchApartment();
  }, [user]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <DynamicForm fields={apartmentFields} initialData={initialData} readOnly />
  );
}
