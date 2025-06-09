import React from "react";
import { View, StyleSheet } from "react-native";
import { Tabs } from "@ant-design/react-native";

import ResidentInfoScreen from "../Resident/ResidentInfoScreen";
import ResidentApartmentInfoScreen from "../Resident/ResidentApartmentInfoScreen";
import ResidentFeedbackListScreen from "../Resident/ResidentFeedbackListScreen";
import ResidentServiceListScreen from "../Resident/ResidentServiceListScreen";
import ResidentNotificationListScreen from "../Resident/ResidentNotificationListScreen";
import ResidentInvoiceListScreen from "../Resident/ResidentInvoiceListScreen";
import ResidentContractListScreen from "../Resident/ResidentContractListScreen";

export default function ResidentDashboard() {
  const tabs = [
    { title: "Thông tin cư trú" },
    { title: "Căn hộ" },
    { title: "Phản hồi" },
    { title: "Dịch vụ" },
    { title: "Thông báo" },
    { title: "Hóa đơn" },
    { title: "Hợp đồng" },
  ];

  return (
    <Tabs tabs={tabs} tabBarPosition="top">
      {/* TAB: Thông tin cư trú */}
      <View style={styles.tabContent}>
        <ResidentInfoScreen />
      </View>
      {/* TAB: Căn hộ */}
      <View style={styles.tabContent}>
        <ResidentApartmentInfoScreen />
      </View>
      {/* TAB: Phản hồi */}
      <View style={styles.tabContent}>
        <ResidentFeedbackListScreen />
      </View>
      {/* TAB: Dịch vụ */}
      <View style={styles.tabContent}>
        <ResidentServiceListScreen />
      </View>
      {/* TAB: Thông báo */}
      <View style={styles.tabContent}>
        <ResidentNotificationListScreen />
      </View>
      {/* TAB: Hóa đơn */}
      <View style={styles.tabContent}>
        <ResidentInvoiceListScreen />
      </View>
      {/* TAB: Hợp đồng */}
      <View style={styles.tabContent}>
        <ResidentContractListScreen />
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContent: { flex: 1, padding: 10 },
});
