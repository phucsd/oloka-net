# 🚀 Hướng dẫn Vận hành & Triển khai oloka.net lên Cloudflare

Trang web **oloka.net** đã được xây dựng hoàn chỉnh với:
* **Next.js 15 App Router** + **Payload CMS 3.0**
* **Kho công cụ AI & Tiện ích**:
  * 🔊 **TTS Studio** (`/tools/tts`): Chuyển đổi văn bản thành giọng nói tiếng Việt mượt mà, tùy chỉnh tốc độ, cao độ, trực quan hóa sóng âm waveform.
  * 🎙️ **Voice Studio** (`/tools/voice`): Bàn thu âm trực tuyến, đo cường độ mic thời gian thực, liên kết cổng OmniVoice Cloud `voice.oloka.net`.
  * 📱 **QR Code Studio** (`/tools/qr-code`): Tạo mã QR 2 tone màu thương hiệu Oloka (`#46C7F0` & `#F47D59`), lồng ghép logo tâm điểm, tải PNG/SVG siêu nét.
  * 🧰 **Kho Công cụ tổng hợp** (`/tools`)
* 📰 **Chuyên trang Tin tức Công nghệ & AI News** (`/news` & `/news/[slug]`)
* 🎛️ **Bảng Quản trị Payload CMS** (`/admin`)
* 🎨 **Nhận diện thương hiệu 2-Tone**: Chiết xuất từ logo gốc `Asset 5Oloka_new.svg` (Cyan `#46C7F0` & Coral `#F47D59`).

---

## 💻 1. Chạy thử nghiệm Local (Development)

Trong thư mục dự án `C:\Users\admin\.gemini\antigravity\scratch\oloka-net`:

```bash
pnpm dev
```

Mở trình duyệt:
* Trang chủ: [http://localhost:3000](http://localhost:3000)
* TTS Studio: [http://localhost:3000/tools/tts](http://localhost:3000/tools/tts)
* Voice Studio: [http://localhost:3000/tools/voice](http://localhost:3000/tools/voice)
* QR Code Studio: [http://localhost:3000/tools/qr-code](http://localhost:3000/tools/qr-code)
* Tin tức AI: [http://localhost:3000/news](http://localhost:3000/news)
* Quản trị Payload CMS: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## ⛅ 2. Các bước Triển khai lên Cloudflare với tên miền oloka.net

### Bước 2.1: Tạo Cloudflare D1 Database
Tài khoản Cloudflare của bạn (`phucsd@gmail.com`) đã sẵn sàng.
Bạn có thể tạo database D1 bằng 1 trong 2 cách:

* **Cách A (Qua Dashboard)**:
  1. Vào [Cloudflare Dashboard](https://dash.cloudflare.com) -> Chọn **Storage & Databases** -> **D1 SQL Database**.
  2. Nhấn **Create Database**, đặt tên: `oloka-net-db`.
  3. Copy `Database ID` vừa tạo.

* **Cách B (Qua CLI)**:
  ```bash
  npx wrangler d1 create oloka-net-db
  ```

### Bước 2.2: Cập nhật `database_id` vào `wrangler.jsonc`
Mở tệp `wrangler.jsonc` và dán `database_id` vào:
```jsonc
  "d1_databases": [
    {
      "binding": "D1",
      "database_id": "<DÁN_DATABASE_ID_VÀO_ĐÂY>",
      "database_name": "oloka-net-db"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "oloka-net-media"
    }
  ]
```
*(Bucket R2 `oloka-net-media` đã có sẵn trên tài khoản Cloudflare của bạn).*

### Bước 2.3: Chạy Database Migration
```bash
pnpm run deploy:database
```

### Bước 2.4: Deploy Ứng dụng lên Cloudflare Workers / Pages
```bash
pnpm run deploy:app
```

---

## 🌐 3. Trỏ tên miền oloka.net

1. Trên Cloudflare Dashboard, vào dự án Worker/Pages `oloka-net`.
2. Chọn tab **Settings** -> **Domains & Routes** (hoặc **Custom Domains**).
3. Nhấn **Add Custom Domain** và nhập:
   * `oloka.net`
   * `www.oloka.net`
4. Cloudflare sẽ tự động trỏ bản ghi DNS và cấp chứng chỉ SSL HTTPS miễn phí ngay lập tức.
