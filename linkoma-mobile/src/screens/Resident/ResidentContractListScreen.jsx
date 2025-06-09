import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { List, WhiteSpace, Button } from "@ant-design/react-native";
import contractService from "../../services/contractService";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function ResidentContractListScreen() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        const data = await contractService.getContractsByResident(user.userId);
        setContracts(data || []);
      } catch (e) {
        setContracts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, [user]);

  const handleView = (contract) =>
    navigation.navigate("ResidentContractView", { contract });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <WhiteSpace />
      <List renderHeader={"Hợp đồng của bạn"}>
        {contracts.map((ct) => (
          <List.Item
            key={ct.id}
            extra={
              <Button size="small" onPress={() => handleView(ct)}>
                Xem
              </Button>
            }
          >
            {ct.title || `Hợp đồng #${ct.id}`}
          </List.Item>
        ))}
      </List>
    </View>
  );
}
