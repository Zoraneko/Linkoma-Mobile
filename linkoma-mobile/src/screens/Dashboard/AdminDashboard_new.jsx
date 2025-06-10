import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import { List, Card } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
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

const { width, height } = Dimensions.get("window");

export default function AdminDashboard() {
  const navigation = useNavigation();
  const [residents, setResidents] = React.useState([]);
  const [apartments, setApartments] = React.useState([]);
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [serviceFees, setServiceFees] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [invoices, setInvoices] = React.useState([]);
  const [contracts, setContracts] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  // Load all data when dashboard is focused
  const loadAllData = React.useCallback(async () => {
    try {
      const [
        residentsData,
        apartmentsData,
        feedbacksData,
        serviceFeesData,
        notificationsData,
        invoicesData,
        contractsData,
      ] = await Promise.all([
        getAllResidents(),
        getAllApartments(),
        getAllFeedbacks(),
        getAllServiceFees(),
        getAllNotifications(),
        getAllInvoices(),
        getAllContracts(),
      ]);

      setResidents(residentsData);
      setApartments(apartmentsData);
      setFeedbacks(feedbacksData);
      setServiceFees(serviceFeesData);
      setNotifications(notificationsData);
      setInvoices(invoicesData);
      setContracts(contractsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadAllData();
    setRefreshing(false);
  }, [loadAllData]);

  useFocusEffect(
    React.useCallback(() => {
      loadAllData();
    }, [loadAllData])
  );

  const tabs = [
    {
      title: "Cư dân",
      icon: "people",
      iconLibrary: "MaterialIcons",
      color: "#4CAF50",
    },
    {
      title: "Căn hộ",
      icon: "building",
      iconLibrary: "FontAwesome5",
      color: "#2196F3",
    },
    {
      title: "Phản hồi",
      icon: "chat-bubble",
      iconLibrary: "MaterialIcons",
      color: "#FF9800",
    },
    {
      title: "Phí DV",
      icon: "credit-card",
      iconLibrary: "MaterialIcons",
      color: "#9C27B0",
    },
    {
      title: "Thông báo",
      icon: "notifications",
      iconLibrary: "MaterialIcons",
      color: "#F44336",
    },
    {
      title: "Hóa đơn",
      icon: "receipt",
      iconLibrary: "MaterialIcons",
      color: "#00BCD4",
    },
    {
      title: "Hợp đồng",
      icon: "description",
      iconLibrary: "MaterialIcons",
      color: "#795548",
    },
  ];

  // Empty state component
  const renderEmptyState = (title, subtitle, icon) => (
    <View style={styles.emptyState}>
      <MaterialIcons name={icon} size={64} color="#BDC3C7" />
      <Text style={styles.emptyStateTitle}>{title}</Text>
      <Text style={styles.emptyStateSubtitle}>{subtitle}</Text>
    </View>
  );

  // Statistics card component
  const renderStatsCard = (title, count, color, icon) => (
    <View style={[styles.statsCard, { borderLeftColor: color }]}>
      <View style={styles.statsContent}>
        <View>
          <Text style={styles.statsTitle}>{title}</Text>
          <Text style={[styles.statsCount, { color }]}>{count}</Text>
        </View>
        <View style={[styles.statsIcon, { backgroundColor: color + "20" }]}>
          <MaterialIcons name={icon} size={24} color={color} />
        </View>
      </View>
    </View>
  );

  // Hàm render icon
  const renderIcon = (tab, isActive) => {
    const IconComponent =
      tab.iconLibrary === "MaterialIcons"
        ? MaterialIcons
        : tab.iconLibrary === "FontAwesome5"
        ? FontAwesome5
        : Ionicons;
    return (
      <IconComponent
        name={tab.icon}
        size={24}
        color={isActive ? tab.color : "#666"}
      />
    );
  };

  // Hàm render nội dung tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderResidentsTab();
      case 1:
        return renderApartmentsTab();
      case 2:
        return renderFeedbacksTab();
      case 3:
        return renderServiceFeesTab();
      case 4:
        return renderNotificationsTab();
      case 5:
        return renderInvoicesTab();
      case 6:
        return renderContractsTab();
      default:
        return renderResidentsTab();
    }
  };

  const renderResidentsTab = () => (
    <ScrollView
      style={styles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Text style={styles.headerTitle}>Quản lý Cư dân</Text>
        <Text style={styles.headerSubtitle}>
          Tổng số: {residents.length} cư dân
        </Text>
        {renderStatsCard(
          "Tổng cư dân",
          residents.length,
          tabs[0].color,
          "people"
        )}
      </Card>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tabs[0].color }]}
          onPress={handleCreate}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm cư dân</Text>
        </TouchableOpacity>
      </View>
      {residents.length === 0 ? (
        renderEmptyState(
          "Chưa có cư dân nào",
          "Hãy thêm cư dân đầu tiên cho tòa nhà",
          "person_add"
        )
      ) : (
        <Card style={styles.listCard}>
          <List>
            {residents.map((resident) => (
              <List.Item
                key={resident.id}
                extra={
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => handleView(resident)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEdit(resident)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteResident(resident.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={styles.listItemContent}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={tabs[0].color}
                  />
                  <Text style={styles.listItemText}>{resident.name}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );

  const renderApartmentsTab = () => (
    <ScrollView
      style={styles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Text style={styles.headerTitle}>Quản lý Căn hộ</Text>
        <Text style={styles.headerSubtitle}>
          Tổng số: {apartments.length} căn hộ
        </Text>
        {renderStatsCard(
          "Tổng căn hộ",
          apartments.length,
          tabs[1].color,
          "home"
        )}
      </Card>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tabs[1].color }]}
          onPress={handleCreateApartment}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm căn hộ</Text>
        </TouchableOpacity>
      </View>
      {apartments.length === 0 ? (
        renderEmptyState(
          "Chưa có căn hộ nào",
          "Hãy thêm căn hộ đầu tiên cho tòa nhà",
          "home_work"
        )
      ) : (
        <Card style={styles.listCard}>
          <List>
            {apartments.map((apartment) => (
              <List.Item
                key={apartment.id}
                extra={
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => handleViewApartment(apartment)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEditApartment(apartment)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteApartment(apartment.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={styles.listItemContent}>
                  <FontAwesome5
                    name="building"
                    size={18}
                    color={tabs[1].color}
                  />
                  <Text style={styles.listItemText}>{apartment.name}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );

  const renderFeedbacksTab = () => (
    <ScrollView
      style={styles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Text style={styles.headerTitle}>Quản lý Phản hồi</Text>
        <Text style={styles.headerSubtitle}>
          Tổng số: {feedbacks.length} phản hồi
        </Text>
        {renderStatsCard(
          "Tổng phản hồi",
          feedbacks.length,
          tabs[2].color,
          "chat_bubble"
        )}
      </Card>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tabs[2].color }]}
          onPress={handleCreateFeedback}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm phản hồi</Text>
        </TouchableOpacity>
      </View>
      {feedbacks.length === 0 ? (
        renderEmptyState(
          "Chưa có phản hồi nào",
          "Chưa có phản hồi từ cư dân",
          "feedback"
        )
      ) : (
        <Card style={styles.listCard}>
          <List>
            {feedbacks.map((feedback) => (
              <List.Item
                key={feedback.id}
                extra={
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => handleViewFeedback(feedback)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEditFeedback(feedback)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteFeedback(feedback.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={styles.listItemContent}>
                  <MaterialIcons
                    name="chat-bubble"
                    size={18}
                    color={tabs[2].color}
                  />
                  <Text style={styles.listItemText}>{feedback.title}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );

  const renderServiceFeesTab = () => (
    <ScrollView
      style={styles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Text style={styles.headerTitle}>Quản lý Phí dịch vụ</Text>
        <Text style={styles.headerSubtitle}>
          Tổng số: {serviceFees.length} phí dịch vụ
        </Text>
        {renderStatsCard(
          "Tổng phí DV",
          serviceFees.length,
          tabs[3].color,
          "credit_card"
        )}
      </Card>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tabs[3].color }]}
          onPress={handleCreateServiceFee}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm phí dịch vụ</Text>
        </TouchableOpacity>
      </View>
      {serviceFees.length === 0 ? (
        renderEmptyState(
          "Chưa có phí dịch vụ nào",
          "Hãy thêm phí dịch vụ cho tòa nhà",
          "monetization_on"
        )
      ) : (
        <Card style={styles.listCard}>
          <List>
            {serviceFees.map((fee) => (
              <List.Item
                key={fee.id}
                extra={
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => handleViewServiceFee(fee)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEditServiceFee(fee)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteServiceFee(fee.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={styles.listItemContent}>
                  <MaterialIcons
                    name="credit-card"
                    size={18}
                    color={tabs[3].color}
                  />
                  <Text style={styles.listItemText}>{fee.name}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );

  const renderNotificationsTab = () => (
    <ScrollView
      style={styles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Text style={styles.headerTitle}>Quản lý Thông báo</Text>
        <Text style={styles.headerSubtitle}>
          Tổng số: {notifications.length} thông báo
        </Text>
        {renderStatsCard(
          "Tổng thông báo",
          notifications.length,
          tabs[4].color,
          "notifications"
        )}
      </Card>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tabs[4].color }]}
          onPress={handleCreateNotification}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm thông báo</Text>
        </TouchableOpacity>
      </View>
      {notifications.length === 0 ? (
        renderEmptyState(
          "Chưa có thông báo nào",
          "Hãy tạo thông báo đầu tiên",
          "notifications_off"
        )
      ) : (
        <Card style={styles.listCard}>
          <List>
            {notifications.map((notification) => (
              <List.Item
                key={notification.id}
                extra={
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => handleViewNotification(notification)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEditNotification(notification)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteNotification(notification.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={styles.listItemContent}>
                  <MaterialIcons
                    name="notifications"
                    size={18}
                    color={tabs[4].color}
                  />
                  <Text style={styles.listItemText}>{notification.title}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );

  const renderInvoicesTab = () => (
    <ScrollView
      style={styles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Text style={styles.headerTitle}>Quản lý Hóa đơn</Text>
        <Text style={styles.headerSubtitle}>
          Tổng số: {invoices.length} hóa đơn
        </Text>
        {renderStatsCard(
          "Tổng hóa đơn",
          invoices.length,
          tabs[5].color,
          "receipt"
        )}
      </Card>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tabs[5].color }]}
          onPress={handleCreateInvoice}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm hóa đơn</Text>
        </TouchableOpacity>
      </View>
      {invoices.length === 0 ? (
        renderEmptyState(
          "Chưa có hóa đơn nào",
          "Hãy tạo hóa đơn đầu tiên",
          "receipt_long"
        )
      ) : (
        <Card style={styles.listCard}>
          <List>
            {invoices.map((invoice) => (
              <List.Item
                key={invoice.id}
                extra={
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => handleViewInvoice(invoice)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEditInvoice(invoice)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteInvoice(invoice.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={styles.listItemContent}>
                  <MaterialIcons
                    name="receipt"
                    size={18}
                    color={tabs[5].color}
                  />
                  <Text style={styles.listItemText}>{invoice.code}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );

  const renderContractsTab = () => (
    <ScrollView
      style={styles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Text style={styles.headerTitle}>Quản lý Hợp đồng</Text>
        <Text style={styles.headerSubtitle}>
          Tổng số: {contracts.length} hợp đồng
        </Text>
        {renderStatsCard(
          "Tổng hợp đồng",
          contracts.length,
          tabs[6].color,
          "description"
        )}
      </Card>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tabs[6].color }]}
          onPress={handleCreateContract}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm hợp đồng</Text>
        </TouchableOpacity>
      </View>
      {contracts.length === 0 ? (
        renderEmptyState(
          "Chưa có hợp đồng nào",
          "Hãy tạo hợp đồng đầu tiên",
          "description"
        )
      ) : (
        <Card style={styles.listCard}>
          <List>
            {contracts.map((contract) => (
              <List.Item
                key={contract.id}
                extra={
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.viewButton]}
                      onPress={() => handleViewContract(contract)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEditContract(contract)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteContract(contract.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={styles.listItemContent}>
                  <MaterialIcons
                    name="description"
                    size={18}
                    color={tabs[6].color}
                  />
                  <Text style={styles.listItemText}>{contract.code}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );

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

  // Xử lý xóa cho từng loại với confirmation
  const handleDeleteResident = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa cư dân này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await removeResident(id);
            setResidents(await getAllResidents());
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa cư dân");
          }
        },
      },
    ]);
  };

  const handleDeleteApartment = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa căn hộ này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await removeApartment(id);
            setApartments(await getAllApartments());
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa căn hộ");
          }
        },
      },
    ]);
  };

  const handleDeleteFeedback = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa phản hồi này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await removeFeedback(id);
            setFeedbacks(await getAllFeedbacks());
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa phản hồi");
          }
        },
      },
    ]);
  };

  const handleDeleteServiceFee = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa phí dịch vụ này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await removeServiceFee(id);
            setServiceFees(await getAllServiceFees());
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa phí dịch vụ");
          }
        },
      },
    ]);
  };

  const handleDeleteNotification = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa thông báo này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await removeNotification(id);
            setNotifications(await getAllNotifications());
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa thông báo");
          }
        },
      },
    ]);
  };

  const handleDeleteInvoice = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa hóa đơn này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await removeInvoice(id);
            setInvoices(await getAllInvoices());
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa hóa đơn");
          }
        },
      },
    ]);
  };

  const handleDeleteContract = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa hợp đồng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await removeContract(id);
            setContracts(await getAllContracts());
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa hợp đồng");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>Quản lý tòa nhà Linkoma</Text>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>{renderTabContent()}</View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(index)}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === index && [
                  styles.activeTabIconContainer,
                  { backgroundColor: tab.color },
                ],
              ]}
            >
              {renderIcon(tab, activeTab === index)}
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === index && { color: tab.color, fontWeight: "600" },
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#2C3E50",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#BDC3C7",
    textAlign: "center",
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingBottom: 90, // Leave space for bottom nav
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTabButton: {
    // Additional styles for active tab if needed
  },
  tabIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 4,
  },
  activeTabIconContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  tabText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  // Card Styles
  headerCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  actionContainer: {
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  listCard: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 16,
    color: "#2C3E50",
    marginLeft: 12,
    fontWeight: "500",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  viewButton: {
    backgroundColor: "#3498DB",
  },
  editButton: {
    backgroundColor: "#E67E22",
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
  },
  // Empty state styles
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: 200,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginTop: 16,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  // Statistics card styles
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsTitle: {
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  statsCount: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
