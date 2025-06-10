import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { List, Card } from "@ant-design/react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { renderEmptyState, renderStatsCard } from "./AdminSharedComponents";
import { tabStyles } from "./AdminTabStyles";

export default function ContractsTab({
  contracts,
  tabs,
  refreshing,
  onRefresh,
  handleCreateContract,
  handleViewContract,
  handleEditContract,
  handleDeleteContract,
}) {
  return (
    <ScrollView
      style={tabStyles.tabContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={tabStyles.headerCard}>
        <Text style={tabStyles.headerTitle}>Quản lý Hợp đồng</Text>
        <Text style={tabStyles.headerSubtitle}>
          Tổng số: {contracts.length} hợp đồng
        </Text>
        {renderStatsCard(
          "Tổng hợp đồng",
          contracts.length,
          tabs[6].color,
          "description"
        )}
      </Card>
      <View style={tabStyles.actionContainer}>
        <TouchableOpacity
          style={[tabStyles.addButton, { backgroundColor: tabs[6].color }]}
          onPress={handleCreateContract}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={tabStyles.addButtonText}>Thêm hợp đồng</Text>
        </TouchableOpacity>
      </View>
      {contracts.length === 0 ? (
        renderEmptyState(
          "Chưa có hợp đồng nào",
          "Hãy tạo hợp đồng đầu tiên",
          "description"
        )
      ) : (
        <Card style={tabStyles.listCard}>
          <List>
            {contracts.map((contract) => (
              <List.Item
                key={contract.id}
                extra={
                  <View style={tabStyles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[tabStyles.actionButton, tabStyles.viewButton]}
                      onPress={() => handleViewContract(contract)}
                    >
                      <MaterialIcons name="visibility" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[tabStyles.actionButton, tabStyles.editButton]}
                      onPress={() => handleEditContract(contract)}
                    >
                      <MaterialIcons name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[tabStyles.actionButton, tabStyles.deleteButton]}
                      onPress={() => handleDeleteContract(contract.id)}
                    >
                      <MaterialIcons name="delete" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <View style={tabStyles.listItemContent}>
                  <MaterialIcons
                    name="description"
                    size={18}
                    color={tabs[6].color}
                  />
                  <Text style={tabStyles.listItemText}>{contract.code}</Text>
                </View>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </ScrollView>
  );
}
