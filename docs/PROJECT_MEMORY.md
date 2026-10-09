# 🧠 BỘ NHỚ DỰ ÁN & LỊCH SỬ PHÁT TRIỂN (PROJECT MEMORY)
## Dự án: Oloka.net (AI & Tech Hub + News Automation + Payload CMS)

---

## 📌 1. Thông tin Chung & Hạ tầng
- **Tên dự án**: Oloka News & AI Hub (`oloka.net`)
- **Repository**: `https://github.com/phucsd/oloka-net.git` (nhánh chính: `main`)
- **Thư mục làm việc chính thức**: `E:\Phuc's Data\Github\Oloka News`
- **Tên miền chính**: `https://oloka.net` (Cloudflare Pages: `https://oloka-net.pages.dev`)
- **Admin Dashboard**: `https://oloka.net/admin`
- **Media Storage**: Cloudflare R2 bucket `oloka-net-media`
- **Database**: Cloudflare D1 Database (`oloka-net-db` / SQLite Edge) kết nối với Payload CMS 3.0
- **Dịch vụ Voice liên kết**: `https://tts.oloka.net` (OlokaTTS Gateway)

---

## 🎨 2. Nhận diện Thương hiệu (Brand Identity)
- **Logo gốc**: `docs/assets/logo_oloka.svg` (`H:\My Drive\Sync Folder\Personal\0. OLOKA\SVG\Asset 5Oloka_new.svg`)
- **Bảng màu Dual-Tone**:
  - **Sky Cyan (`#46C7F0`)**: Đại diện cho công nghệ, trí tuệ nhân tạo, tính đột phá.
  - **Coral Tangerine (`#F47D59`)**: Đại diện cho sự sáng tạo, năng động, tính nhân bản và âm thanh.
  - **Gradient chuẩn**: `linear-gradient(135deg, #46C7F0 0%, #F47D59 100%)`
- **Theme giao diện**:
  - Giao diện **Light Theme** hiện đại làm mặc định (nền trắng/slate tinh tế, card bóng đổ mềm, viền sắc nét, typography tương phản cao).
  - Hỗ trợ Dark Mode với nền sâu `#0A0E17`.

---

## 🛠️ 3. Ngăn xếp Công nghệ (Tech Stack)
- **Framework**: Next.js 15 (App Router, Server Components, Server Actions)
- **CMS**: Payload CMS 3.0 (`@payloadcms/next`, `@payloadcms/d1-sqlite`, `@payloadcms/storage-s3`)
- **Deployment**: `@opennextjs/cloudflare` + Cloudflare Pages & Workers + Wrangler 4.x
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Package Manager**: `pnpm`
- **Testing & Quality**: Vitest, Playwright, ESLint, TypeScript Strict Mode

---

## 📰 4. Các Phân hệ Tính năng Đã Hoàn thiện

### 4.1. Cổng Tin tức Báo chí Công nghệ Chuẩn mực (`/news`, `/news/[slug]`)
- **40 Bài viết Báo chí Landmark Tuyển chọn**:
  - Được chọn lọc từ các chủ đề cốt lõi: AI Foundation Models, Open Source AI, AI Chip War, Privacy & Cyber Law, Enterprise AI, Clean Tech.
  - Đầy đủ bài viết dài, trích dẫn học thuật, trích dẫn chuyên gia, Key Takeaways, hộp thông tin dữ kiện, bản quyền trích dẫn hợp pháp.
  - Được lưu trữ kép: Hardcoded fallback trong `src/lib/news-data.ts` và đồng bộ trong Cloudflare D1.
- **Trình đọc Báo chí Hiện đại (Editorial Reader)**:
  - Hiển thị mục lục động, thời gian đọc ước tính, thanh tiến trình đọc, nút chia sẻ, bài viết liên quan.

### 4.2. Hệ thống Tự động Xuất bản Tin tức (Autonomous News Automation Pipeline)
- **Quy trình hoạt động**:
  - **Khám phá (Discover)**: Thu thập tin tức từ các nguồn mở uy tín (EFF, It's FOSS, Horizon Magazine, arXiv,...).
  - **Xác minh bản quyền (License Verification)**: Kiểm tra giấy phép hợp pháp (Creative Commons CC BY, CC BY-SA, Public Domain).
  - **Xếp hạng & Lọc trùng (Rank & Deduplicate)**: Lọc nội dung đạt điểm chất lượng từ 75/100 trở lên, kiểm tra trùng lặp ngữ nghĩa.
  - **Nghiên cứu & Dịch thuật (Enrich & Translate)**: Chuyển ngữ tiếng Việt chuẩn báo chí chuyên ngành, tổng hợp 3-5 Key Takeaways, trích dẫn nguồn gốc.
  - **Xuất bản (Publish)**: Đẩy trực tiếp vào Cloudflare D1 và tạo bài viết mới trên trang web.
- **Tần suất**: GitHub Actions chạy định kỳ mỗi 3 tiếng (`.github/workflows/news-automation.yml`).
- **Endpoint API**: `/api-automation/run` (cần `AUTOMATION_SECRET` để thực thi).

### 4.3. Kho Tiện ích & Công cụ (Tools Hub)
- **QR Code Studio 2-Tone (`/tools/qr-code`)**:
  - Tạo QR Code đa năng (URL, Text, WiFi, vCard).
  - Tùy chỉnh màu sắc theo 2 tone Oloka (`#46C7F0` & `#F47D59`).
  - Hỗ trợ chèn logo Oloka ở tâm mã QR, tùy biến bo góc, xuất file PNG độ phân giải cao và SVG vector.
  - Tích hợp công cụ Quét mã QR (QR Scanner).
- **Text-to-Speech Studio (`/tools/tts`)**:
  - Giao diện chuyển đổi văn bản thành giọng đọc đa ngôn ngữ.
  - Kết nối trực tiếp với backend `https://tts.oloka.net` (VieNeu-TTS / OmniVoice Gateway) và Web Speech API fallback.
- **Voice Studio (`/tools/voice`)**:
  - Ghi âm, thử giọng mẫu, phân tích âm thanh trực quan.

### 4.4. Trang Quản trị Payload CMS (`/admin`)
- Quản lý Collections: `Articles`, `Categories`, `Tools`, `Media`, `Users`.
- Kế hoạch bước tiếp theo đã thống nhất trong cuộc trò chuyện:
  - Tích hợp News Automation trực tiếp thành Payload CMS Plugin (bổ sung Collections `AutomationSources`, `AutomationLogs`, `AutomationCandidates`).
  - Đặt quyền kiểm soát hoàn toàn bên trong tài khoản Admin đăng nhập, loại bỏ các route trang công khai chưa được xác thực.

---

## 🚀 5. Lệnh Phát triển & Vận hành Thường dùng
- **Cài đặt thư viện**: `pnpm install`
- **Khởi chạy Local Dev**: `pnpm dev`
- **Kiểm tra TypeScript**: `npx tsc --noEmit`
- **Build dự án cho Cloudflare**: `pnpm build` / `npx @opennextjs/cloudflare`
- **Triển khai Cloudflare Pages**: `pnpm run deploy` hoặc push code lên `main` để GitHub Actions tự động deploy.
