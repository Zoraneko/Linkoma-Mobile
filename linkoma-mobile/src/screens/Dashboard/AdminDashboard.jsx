import React from "react";
import { View, StyleSheet } from "react-native";
import { Tabs, List, Button, WhiteSpace, Flex } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getAllResidents,
  removeResident,
} from "../../services/residentService";
import {
  getAllApartments,
  removeApartment,
} from "../../services/apartmentService";
import {
  getAllFeedbacks,
  removeFeedback,
} from "../../services/feedbackService";
import {
  getAllServiceFees,
  removeServiceFee,
} from "../../services/serviceFeeService";
import {
  getAllNotifications,
  removeNotification,
} from "../../services/notificationService";
import { getAllInvoices, removeInvoice } from "../../services/invoiceService";
import {
  getAllContracts,
  removeContract,
} from "../../services/contractService";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminDashboard() {
  const navigation = useNavigation();
  const [residents, setResidents] = React.useState([]);
  const [apartments, setApartments] = React.useState([]);
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [serviceFees, setServiceFees] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [invoices, setInvoices] = React.useState([]);
  const [contracts, setContracts] = React.useState([]);

  // Load all data when dashboard is focused
  useFocusEffect(
    React.useCallback(() => {
      getAllResidents().then(setResidents);
      getAllApartments().then(setApartments);
      getAllFeedbacks().then(setFeedbacks);
      getAllServiceFees().then(setServiceFees);
      getAllNotifications().then(setNotifications);
      getAllInvoices().then(setInvoices);
      getAllContracts().then(setContracts);
    }, [])
  );

  const tabs = [
    { title: "Cư dân" },
    { title: "Căn hộ" },
    { title: "Phản hồi" },
    { title: "Phí dịch vụ" },
    { title: "Thông báo" },
    { title: "Hóa đơn" },
    { title: "Hợp đồng" },
  ];

  const handleCreate = () => {
    navigation.navigate("CreateResident");
  };

  const handleView = (resident) => {
    navigation.navigate("ViewResident", { resident });
  };

  const handleEdit = (resident) => {
    navigation.navigate("EditResident", { resident });
  };

  // Apartment handlers
  const handleCreateApartment = () => navigation.navigate("ApartmentCreate");
  const handleViewApartment = (apartment) =>
    navigation.navigate("ApartmentView", { apartment });
  const handleEditApartment = (apartment) =>
    navigation.navigate("ApartmentEdit", { apartment });

  // Feedback handlers
  const handleCreateFeedback = () => navigation.navigate("FeedbackCreate");
  const handleViewFeedback = (feedback) =>
    navigation.navigate("FeedbackView", { feedback });
  const handleEditFeedback = (feedback) =>
    navigation.navigate("FeedbackEdit", { feedback });

  // ServiceFee handlers
  const handleCreateServiceFee = () => navigation.navigate("ServiceFeeCreate");
  const handleViewServiceFee = (serviceFee) =>
    navigation.navigate("ServiceFeeView", { serviceFee });
  const handleEditServiceFee = (serviceFee) =>
    navigation.navigate("ServiceFeeEdit", { serviceFee });

  // Notification handlers
  const handleCreateNotification = () =>
    navigation.navigate("NotificationCreate");
  const handleViewNotification = (notification) =>
    navigation.navigate("NotificationView", { notification });
  const handleEditNotification = (notification) =>
    navigation.navigate("NotificationEdit", { notification });

  // Invoice handlers
  const handleCreateInvoice = () => navigation.navigate("InvoiceCreate");
  const handleViewInvoice = (invoice) =>
    navigation.navigate("InvoiceView", { invoice });
  const handleEditInvoice = (invoice) =>
    navigation.navigate("InvoiceEdit", { invoice });

  // Contract handlers
  const handleCreateContract = () => navigation.navigate("ContractCreate");
  const handleViewContract = (contract) =>
    navigation.navigate("ContractView", { contract });
  const handleEditContract = (contract) =>
    navigation.navigate("ContractEdit", { contract });

  // Xử lý xóa cho từng loại
  const handleDeleteResident = async (id) => {
    await removeResident(id);
    setResidents(await getAllResidents());
  };
  const handleDeleteApartment = async (id) => {
    await removeApartment(id);
    setApartments(await getAllApartments());
  };
  const handleDeleteFeedback = async (id) => {
    await removeFeedback(id);
    setFeedbacks(await getAllFeedbacks());
  };
  const handleDeleteServiceFee = async (id) => {
    await removeServiceFee(id);
    setServiceFees(await getAllServiceFees());
  };
  const handleDeleteNotification = async (id) => {
    await removeNotification(id);
    setNotifications(await getAllNotifications());
  };
  const handleDeleteInvoice = async (id) => {
    await removeInvoice(id);
    setInvoices(await getAllInvoices());
  };
  const handleDeleteContract = async (id) => {
    await removeContract(id);
    setContracts(await getAllContracts());
  };

  return (
    <Tabs tabs={tabs} tabBarPosition="top">
      {/* TAB: CƯ DÂN */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreate}>
          Thêm cư dân
        </Button>
        <WhiteSpace />
        <List renderHeader={"Danh sách cư dân"}>
          {residents.map((resident) => (
            <List.Item
              key={resident.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleView(resident)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEdit(resident)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {resident.name}
            </List.Item>
          ))}
        </List>
      </View>

      {/* TAB: CĂN HỘ */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreateApartment}>
          Thêm căn hộ
        </Button>
        <WhiteSpace />
        <List renderHeader={"Danh sách căn hộ"}>
          {apartments.map((apartment) => (
            <List.Item
              key={apartment.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleViewApartment(apartment)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEditApartment(apartment)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {apartment.name}
            </List.Item>
          ))}
        </List>
      </View>

      {/* TAB: PHẢN HỒI */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreateFeedback}>
          Thêm phản hồi
        </Button>
        <WhiteSpace />
        <List renderHeader={"Danh sách phản hồi"}>
          {feedbacks.map((feedback) => (
            <List.Item
              key={feedback.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleViewFeedback(feedback)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEditFeedback(feedback)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {feedback.title}
            </List.Item>
          ))}
        </List>
      </View>

      {/* TAB: PHÍ DỊCH VỤ */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreateServiceFee}>
          Thêm phí dịch vụ
        </Button>
        <WhiteSpace />
        <List renderHeader={"Danh sách phí dịch vụ"}>
          {serviceFees.map((fee) => (
            <List.Item
              key={fee.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleViewServiceFee(fee)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEditServiceFee(fee)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {fee.name}
            </List.Item>
          ))}
        </List>
      </View>

      {/* TAB: THÔNG BÁO */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreateNotification}>
          Thêm thông báo
        </Button>
        <WhiteSpace />
        <List renderHeader={"Danh sách thông báo"}>
          {notifications.map((notification) => (
            <List.Item
              key={notification.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleViewNotification(notification)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEditNotification(notification)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {notification.title}
            </List.Item>
          ))}
        </List>
      </View>

      {/* TAB: HÓA ĐƠN */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreateInvoice}>
          Thêm hóa đơn
        </Button>
        <WhiteSpace />
        <List renderHeader={"Danh sách hóa đơn"}>
          {invoices.map((invoice) => (
            <List.Item
              key={invoice.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleViewInvoice(invoice)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEditInvoice(invoice)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {invoice.code}
            </List.Item>
          ))}
        </List>
      </View>

      {/* TAB: HỢP ĐỒNG */}
      <View style={styles.tabContent}>
        <WhiteSpace />
        <Button type="primary" onPress={handleCreateContract}>
          Thêm hợp đồng
        </Button>
        <WhiteSpace />
        <List renderHeader={"Danh sách hợp đồng"}>
          {contracts.map((contract) => (
            <List.Item
              key={contract.id}
              extra={
                <Flex style={styles.flexRow}>
                  <Button
                    size="small"
                    onPress={() => handleViewContract(contract)}
                    style={styles.smallBtn}
                  >
                    Xem
                  </Button>
                  <Button
                    size="small"
                    type="ghost"
                    onPress={() => handleEditContract(contract)}
                    style={styles.smallBtn}
                  >
                    Sửa
                  </Button>
                </Flex>
              }
            >
              {contract.code}
            </List.Item>
          ))}
        </List>
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContent: { flex: 1, padding: 10 },
  smallBtn: { marginHorizontal: 4 },
  flexRow: { flexDirection: "row", justifyContent: "flex-end" },
});
