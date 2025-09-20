# Frontend - Food PTIT

![License](https://img.shields.io/badge/license-MIT-green)

## 📖 Giới thiệu
Frontend của dự án **Food PTIT** sử dụng React, Vite, Redux Toolkit, Ant Design và nhiều thư viện hiện đại khác để xây dựng giao diện người dùng tương tác, responsive và mượt mà.

---

## 🛠️ Công nghệ sử dụng
- **Framework & UI**: React 19, Ant Design, Bootstrap, Framer Motion
- **State Management**: Redux Toolkit, Redux Persist
- **Routing**: React Router DOM v7
- **Form & Validation**: React Hook Form, Validator
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Scrolling**: React Perfect Scrollbar
- **Animation**: Framer Motion
- **Build tool**: Vite
- **CSS Preprocessor**: Sass

---

## ⚙️ Cài đặt & chạy dự án

1. **Clone repository**
```bash
git clone <https://github.com/Viet0601/PTIT_FOOD_FE.git>
cd frontend
````

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy project trong chế độ development**

```bash
npm run dev
```

Frontend sẽ chạy mặc định tại: `http://localhost:5173`

4. **Build project để deploy**

```bash
npm run build
```

5. **Preview build**

```bash
npm run preview
```

---

## 📂 Cấu trúc thư mục

```
frontend/
├─ public/          # Tài nguyên tĩnh
├─ src/
│  ├─ assets/       # Hình ảnh, icon
│  ├─ components/   # Các component tái sử dụng
│  ├─ pages/        # Các page chính
│  ├─ redux/        # Store và slice
│  ├─ services/     # API service (axios)
│  ├─ hooks/        # Custom hooks
│  ├─ utils/        # Helper functions
│  └─ main.jsx      # Entry point
├─ package.json
└─ vite.config.js
```

---

## 🌐 Thư viện nổi bật

* **Ant Design**: UI component library mạnh mẽ, dễ dùng.
* **Redux Toolkit**: Quản lý state dễ dàng.
* **React Query**: Quản lý dữ liệu async, cache tự động.
* **Axios**: Gửi request HTTP.
* **React Hook Form**: Quản lý form, validation.
* **Framer Motion**: Hiệu ứng animation mượt mà.

---

## 📌 Cấu hình

* **Module type**: `"type": "module"` để hỗ trợ ES Module.
* **Vite**: Nhanh, tối ưu development & production.
* **ESLint**: Kiểm tra code chuẩn.
* **Sass**: Hỗ trợ viết CSS nâng cao.

---

## 📝 Scripts

| Lệnh              | Mô tả                              |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Chạy frontend ở chế độ development |
| `npm run build`   | Build project cho production       |
| `npm run preview` | Xem trước build                    |
| `npm run lint`    | Kiểm tra code với ESLint           |

---

## 🚀 Triển khai

Frontend có thể deploy lên các nền tảng như:

* Vercel
* Netlify
* Render
* AWS S3 + CloudFront

---

## 🛡️ License

