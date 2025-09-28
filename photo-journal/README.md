# 📸 Photo Journal

Ứng dụng nhật ký ảnh được xây dựng với React, TypeScript và Capacitor. Cho phép bạn chụp ảnh, lưu trữ với tiêu đề tùy chỉnh, chỉnh sửa và chia sẻ ảnh một cách dễ dàng.

## ✨ Tính năng

- 📷 **Chụp ảnh**: Chụp ảnh trực tiếp từ camera với tiêu đề tùy chỉnh
- 🏷️ **Quản lý tiêu đề**: Thêm, chỉnh sửa tiêu đề cho từng ảnh
- 🗑️ **Xóa ảnh**: Xóa ảnh không cần thiết với xác nhận
- 📤 **Chia sẻ ảnh**: Chia sẻ ảnh qua các ứng dụng khác trên thiết bị
- 💾 **Lưu trữ cục bộ**: Tự động lưu ảnh và dữ liệu trên thiết bị
- 📱 **Đa nền tảng**: Hỗ trợ iOS, Android và Web

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Mobile**: Capacitor
- **Plugins**:
  - `@capacitor/camera` - Chụp ảnh
  - `@capacitor/filesystem` - Quản lý file
  - `@capacitor/preferences` - Lưu trữ dữ liệu
  - `@capacitor/share` - Chia sẻ ảnh

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+ 
- npm hoặc yarn
- Android Studio (cho Android)
- Xcode (cho iOS)

### Cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd photo-journal
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy trên web**
```bash
npm run dev
```

4. **Build cho production**
```bash
npm run build
```

### Chạy trên thiết bị di động

1. **Thêm platform**
```bash
# Android
npx cap add android

# iOS
npx cap add ios
```

2. **Sync và build**
```bash
npx cap sync
npx cap run android
# hoặc
npx cap run ios
```

## 📱 Cách sử dụng

### Chụp ảnh mới
1. Nhập tiêu đề cho ảnh vào ô input
2. Click nút "Chụp ảnh"
3. Cho phép truy cập camera khi được yêu cầu
4. Ảnh sẽ được lưu tự động

### Quản lý ảnh
- **Sửa tiêu đề**: Click nút "Sửa" → nhập tiêu đề mới → "Lưu"
- **Chia sẻ ảnh**: Click nút "Chia sẻ" → chọn ứng dụng
- **Xóa ảnh**: Click nút "Xóa" → xác nhận

## 📁 Cấu trúc dự án

```
photo-journal/
├── src/
│   ├── App.tsx              # Component chính
│   ├── App.css              # Styles
│   ├── hooks/
│   │   └── usePhotoGallery.ts # Hook quản lý ảnh
│   └── main.tsx             # Entry point
├── android/                 # Android project
├── ios/                     # iOS project (nếu có)
├── public/                  # Static files
└── dist/                    # Build output
```

## 🔧 Cấu hình

### Capacitor Config
File `capacitor.config.ts` chứa cấu hình cho các platform:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.photojournal',
  appName: 'photo-journal',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### Permissions
Ứng dụng cần các quyền sau:
- **Camera**: Để chụp ảnh
- **Storage**: Để lưu trữ ảnh
- **Share**: Để chia sẻ ảnh

## 🐛 Troubleshooting

### Lỗi thường gặp

1. **Camera không hoạt động**
   - Kiểm tra quyền truy cập camera
   - Đảm bảo chạy trên thiết bị thật (không phải browser)

2. **Ảnh không hiển thị**
   - Kiểm tra đường dẫn file
   - Đảm bảo file được lưu đúng thư mục

3. **Chia sẻ không hoạt động**
   - Kiểm tra plugin @capacitor/share đã được cài đặt
   - Test trên thiết bị thật

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.


**Lưu ý**: Ứng dụng này được thiết kế để chạy tốt nhất trên thiết bị di động thật. Một số tính năng có thể không hoạt động đầy đủ trên trình duyệt web.