/* #!/usr/bin/env node

// Script to update all Admin and Resident screens to modern UI
const fs = require('fs');
const path = require('path');

// Template for Create screens
const createScreenTemplate = (entityName, entityNameVi, fields, serviceName, isResident = false) => `
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { ModernScreenWrapper, ModernFormInput, ModernButton } from "${isResident ? '../../' : '../../../'}components";
import { create${entityName} } from "${isResident ? '../../' : '../../../'}services/${serviceName}Service";
${isResident ? 'import { useAuth } from "../../context/AuthContext";' : ''}

export default function ${entityName}CreateScreen({ navigation }) {
  ${isResident ? 'const { user } = useAuth();' : ''}
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ${fields.map(f => `${f.key}: "",`).join('\n    ')}
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    ${fields.filter(f => f.required).map(f => `
    if (!formData.${f.key}.trim()) {
      newErrors.${f.key} = "${f.label} là bắt buộc";
    }`).join('')}
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await create${entityName}(${isResident ? '{ ...formData, residentId: user.userId }' : 'formData'});
      Alert.alert(
        "Thành công",
        "Tạo ${entityNameVi} thành công!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tạo ${entityNameVi}. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  return (
    <ModernScreenWrapper
      title="Tạo ${entityNameVi} mới"
      subtitle="Nhập thông tin ${entityNameVi}"
      headerColor="${isResident ? '#1976D2' : '#2C3E50'}"
    >
      <View style={{ paddingBottom: 20 }}>
        ${fields.map(f => `
        <ModernFormInput
          label="${f.label}"
          value={formData.${f.key}}
          onChangeText={(value) => updateField("${f.key}", value)}
          placeholder="${f.placeholder || `Nhập ${f.label.toLowerCase()}`}"
          icon="${f.icon || 'edit'}"
          ${f.keyboardType ? `keyboardType="${f.keyboardType}"` : ''}
          ${f.multiline ? 'multiline' : ''}
          ${f.numberOfLines ? `numberOfLines={${f.numberOfLines}}` : ''}
          ${f.required ? 'required' : ''}
          error={errors.${f.key}}
        />`).join('')}

        <View style={{ marginTop: 20, gap: 12 }}>
          <ModernButton
            title="Tạo ${entityNameVi}"
            onPress={handleSubmit}
            loading={loading}
            icon="add"
            fullWidth
          />
          
          <ModernButton
            title="Hủy"
            onPress={() => navigation.goBack()}
            type="outline"
            fullWidth
          />
        </View>
      </View>
    </ModernScreenWrapper>
  );
}`;

// Template for View screens
const viewScreenTemplate = (entityName, entityNameVi, fields, serviceName, isResident = false) => `
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { ModernScreenWrapper, ModernCard, InfoRow, ModernButton } from "${isResident ? '../../' : '../../../'}components";
import { remove${entityName} } from "${isResident ? '../../' : '../../../'}services/${serviceName}Service";

export default function ${entityName}ViewScreen({ route, navigation }) {
  const { ${entityName.toLowerCase()} } = route.params || {};
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEdit = () => {
    navigation.navigate("${entityName}EditScreen", { ${entityName.toLowerCase()} });
  };

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa ${entityNameVi} này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleteLoading(true);
              await remove${entityName}(${entityName.toLowerCase()}.id);
              Alert.alert(
                "Thành công",
                "Xóa ${entityNameVi} thành công!",
                [{ text: "OK", onPress: () => navigation.goBack() }]
              );
            } catch (error) {
              Alert.alert("Lỗi", "Không thể xóa ${entityNameVi}. Vui lòng thử lại.");
            } finally {
              setDeleteLoading(false);
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không có dữ liệu";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <ModernScreenWrapper
      title="Chi tiết ${entityNameVi}"
      subtitle={\`\${${entityName.toLowerCase()}?.name || "${entityNameVi}"}\`}
      headerColor="${isResident ? '#1976D2' : '#2C3E50'}"
      ${!isResident ? `rightHeaderComponent={
        <ModernButton
          title="Sửa"
          onPress={handleEdit}
          type="outline"
          size="small"
        />
      }` : ''}
    >
      <View style={{ paddingBottom: 20 }}>
        <ModernCard title="Thông tin chi tiết">
          ${fields.map(f => `
          <InfoRow
            label="${f.label}"
            value={${entityName.toLowerCase()}?.${f.key}${f.type === 'number' ? '?.toString()' : ''}}
            icon="${f.icon || 'info'}"
            ${f.highlight ? 'type="highlight"' : ''}
            ${f.copyable ? 'copyable' : ''}
          />`).join('')}
        </ModernCard>

        ${!isResident ? `
        <View style={{ marginTop: 20, gap: 12 }}>
          <ModernButton
            title="Chỉnh sửa"
            onPress={handleEdit}
            icon="edit"
            fullWidth
          />
          
          <ModernButton
            title="Xóa ${entityNameVi}"
            onPress={handleDelete}
            type="danger"
            loading={deleteLoading}
            icon="delete"
            fullWidth
          />
        </View>` : ''}
      </View>
    </ModernScreenWrapper>
  );
}`;

// Entity definitions
const entities = [
  {
    name: 'Contract',
    nameVi: 'hợp đồng',
    service: 'contract',
    fields: [
      { key: 'title', label: 'Tiêu đề hợp đồng', required: true, icon: 'description' },
      { key: 'content', label: 'Nội dung', multiline: true, numberOfLines: 4, icon: 'notes' },
      { key: 'startDate', label: 'Ngày bắt đầu', icon: 'event' },
      { key: 'endDate', label: 'Ngày kết thúc', icon: 'event-busy' },
      { key: 'value', label: 'Giá trị', keyboardType: 'numeric', icon: 'attach-money' },
    ]
  },
  {
    name: 'Invoice',
    nameVi: 'hóa đơn',
    service: 'invoice',
    fields: [
      { key: 'title', label: 'Tiêu đề hóa đơn', required: true, icon: 'receipt' },
      { key: 'amount', label: 'Số tiền', required: true, keyboardType: 'numeric', icon: 'attach-money' },
      { key: 'dueDate', label: 'Hạn thanh toán', icon: 'schedule' },
      { key: 'description', label: 'Mô tả', multiline: true, numberOfLines: 3, icon: 'description' },
      { key: 'status', label: 'Trạng thái', icon: 'assignment' },
    ]
  },
  {
    name: 'Notification',
    nameVi: 'thông báo',
    service: 'notification',
    fields: [
      { key: 'title', label: 'Tiêu đề thông báo', required: true, icon: 'notifications' },
      { key: 'content', label: 'Nội dung', required: true, multiline: true, numberOfLines: 4, icon: 'message' },
      { key: 'type', label: 'Loại thông báo', icon: 'category' },
      { key: 'priority', label: 'Mức độ ưu tiên', icon: 'priority-high' },
    ]
  },
  {
    name: 'ServiceFee',
    nameVi: 'phí dịch vụ',
    service: 'serviceFee',
    fields: [
      { key: 'name', label: 'Tên dịch vụ', required: true, icon: 'room-service' },
      { key: 'amount', label: 'Số tiền', required: true, keyboardType: 'numeric', icon: 'attach-money' },
      { key: 'description', label: 'Mô tả', multiline: true, numberOfLines: 3, icon: 'description' },
      { key: 'unit', label: 'Đơn vị tính', icon: 'straighten' },
    ]
  }
];

// Generate files for each entity
entities.forEach(entity => {
  // Admin Create Screen
  const adminCreatePath = \`../Admin/\${entity.name}Management/\${entity.name}CreateScreen.jsx\`;
  const adminCreateContent = createScreenTemplate(entity.name, entity.nameVi, entity.fields, entity.service, false);
  
  // Admin View Screen  
  const adminViewPath = \`../Admin/\${entity.name}Management/\${entity.name}ViewScreen.jsx\`;
  const adminViewContent = viewScreenTemplate(entity.name, entity.nameVi, entity.fields, entity.service, false);
  
  console.log(\`Generated templates for \${entity.name}\`);
});

console.log('Screen templates generated successfully!');
 */