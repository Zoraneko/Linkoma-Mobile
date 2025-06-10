# 🏠 Linkoma Mobile

Ứng dụng quản lý căn hộ và cư dân sử dụng React Native + Expo với Mock API.

## 🚀 Cài đặt và chạy dự án

### 📋 Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm** hoặc **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Android Studio** (cho Android) hoặc **Xcode** (cho iOS)

### 💾 Clone dự án

```powershell
# Clone repository
git clone https://github.com/your-username/Linkoma-Mobile.git
cd Linkoma-Mobile\linkoma-mobile

# Cài đặt dependencies
npm install
# hoặc
yarn install
```

### ⚙️ Cấu hình môi trường

1. **Tạo file `.env`** trong thư mục `linkoma-mobile`:

```env
# API Configuration
EXPO_PUBLIC_API_URL=https://your-api-url.com/v1

# App Configuration
EXPO_PUBLIC_APP_NAME=Linkoma Mobile
EXPO_PUBLIC_APP_VERSION=1.0.0

# Development Mode
EXPO_PUBLIC_DEV_MODE=true
```

2. **Cấu hình Mock API** (cho development):

File `src/services/mockData.js` đã được cấu hình sẵn với dữ liệu mẫu.

### 🔧 Chạy ứng dụng

#### Development Mode với Expo

```powershell
# Khởi động Metro bundler
npm start
# hoặc
yarn start

# Chạy trên Android
npm run android
# hoặc
yarn android

# Chạy trên iOS (macOS only)
npm run ios
# hoặc
yarn ios

# Chạy trên Web
npm run web
# hoặc
yarn web
```

#### Sử dụng Expo Go App

1. Tải **Expo Go** từ App Store/Play Store
2. Scan QR code từ terminal
3. Ứng dụng sẽ tự động load trên điện thoại

### 📱 Testing trên thiết bị thật

#### Android
```powershell
# Kết nối thiết bị qua USB và enable USB Debugging
adb devices

# Chạy trên thiết bị
npx expo run:android --device
```

#### iOS (macOS only)
```powershell
# Chạy trên simulator
npx expo run:ios --simulator="iPhone 15"

# Chạy trên thiết bị thật (cần Apple Developer Account)
npx expo run:ios --device
```