# Đăng ký Company Trip 2026 - BSM Labs

Trang đăng ký tĩnh (HTML/CSS/JS) cho Company Trip 2026 "Beyond The Clouds" tại Sapa.
Dữ liệu đăng ký được ghi vào một Google Sheet thông qua Google Apps Script Web App.

## 1. Tạo Google Sheet lưu danh sách

1. Tạo một Google Sheet mới (ví dụ: "Company Trip 2026 - Danh sách đăng ký").
2. Trong Sheet, vào menu **Extensions > Apps Script**.
3. Xoá nội dung mặc định trong `Code.gs`, dán toàn bộ nội dung file
   [`apps-script/Code.gs`](apps-script/Code.gs) trong thư mục này vào.
4. Lưu lại (Ctrl/Cmd + S), đặt tên project tuỳ ý (ví dụ "CompanyTrip Registration").

## 2. Deploy thành Web App

1. Trong Apps Script, chọn **Deploy > New deployment**.
2. Chọn loại **Web app**.
3. Cấu hình:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Nhấn **Deploy**, cấp quyền truy cập Sheet khi được hỏi (chấp nhận cảnh báo "Google chưa xác minh app" vì đây là script của chính anh).
5. Copy **Web app URL** được trả về (dạng `https://script.google.com/macros/s/XXXXX/exec`).

## 3. Gắn URL vào trang đăng ký

Mở [`script.js`](script.js), thay dòng:

```js
const SCRIPT_URL = "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

bằng URL vừa copy ở bước 2.

## 4. Host trang web để lấy link công khai

Cách đơn giản nhất: dùng GitHub Pages (giống dự án `vong-quay-may-man`).

1. Tạo repo GitHub mới (hoặc dùng repo đã tạo kèm thư mục này).
2. Push code lên nhánh `main`.
3. Vào **Settings > Pages**, chọn nguồn là nhánh `main`, thư mục `/ (root)`.
4. Sau 1-2 phút, link đăng ký sẽ có dạng:
   `https://<tên-github-của-anh>.github.io/<tên-repo>/`

## 5. Kiểm tra lại

- Mở link, điền thử Họ tên + Phòng ban, chọn "Tham gia" → gửi → kiểm tra dòng mới xuất hiện trong Google Sheet.
- Thử lại với "Không tham gia" + lý do → kiểm tra cột "Lý do không tham gia" được ghi đúng.

## Cấu trúc file

- `index.html` — nội dung trang (thông báo + form đăng ký)
- `style.css` — giao diện
- `script.js` — xử lý form, gửi dữ liệu lên Apps Script
- `apps-script/Code.gs` — script phía Google Sheet, nhận và lưu dữ liệu
