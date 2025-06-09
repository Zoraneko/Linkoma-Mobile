import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { List, WhiteSpace, Button } from "@ant-design/react-native";
import invoiceService from "../../services/invoiceService";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function ResidentInvoiceListScreen() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const data = await invoiceService.getInvoicesByResident(user.userId);
        setInvoices(data || []);
      } catch (e) {
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [user]);

  const handleView = (invoice) =>
    navigation.navigate("ResidentInvoiceView", { invoice });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <WhiteSpace />
      <List renderHeader={"Hóa đơn của bạn"}>
        {invoices.map((iv) => (
          <List.Item
            key={iv.id}
            extra={
              <Button size="small" onPress={() => handleView(iv)}>
                Xem
              </Button>
            }
          >
            {iv.title || `Hóa đơn #${iv.id}`}
          </List.Item>
        ))}
      </List>
    </View>
  );
}
