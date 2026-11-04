# Son Tra Company

Website đăng ký hỗ trợ hành lý tại Nhà ga hành khách quốc tế Đà Nẵng, Việt Nam (T2).

## Nội dung

- Giao diện Việt, Anh, Hàn, Trung và ba ảnh minh họa AI đã tối ưu WebP.
- Đăng ký, lưu cơ sở dữ liệu D1, mã yêu cầu và khóa tra cứu riêng.
- Tra cứu, hủy yêu cầu đang chờ và màn hình điều phối có phân quyền.
- Mã nguồn React / Vinext / TypeScript, API, schema và migration SQL.

Đây là bản thử nghiệm, chỉ nhập dữ liệu giả. Chưa gửi email/SMS, chưa thanh toán, chưa tự giữ chỗ theo năng lực ca. Ảnh AI không phải ảnh chụp thực tế T2.

## Đưa lên GitHub

Giải nén, mở Terminal trong thư mục `son-tra-company`, tạo repository trống trên GitHub rồi chạy:

```bash
git init
git add .
git commit -m "Initial Son Tra Company website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/son-tra-company.git
git push -u origin main
```

Thay `YOUR_USERNAME` bằng tên tài khoản của bạn. Không nhập token GitHub vào mã nguồn.
Nếu dùng GitHub Desktop: thêm thư mục này làm local repository, tạo commit và chọn Publish repository.

## Chạy tại máy

Yêu cầu Node.js >=22.13.0 và pnpm 11.25.0 (theo trường `packageManager`).

```bash
corepack enable
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Mở địa chỉ được in trong Terminal, mặc định http://localhost:5173.

## Tạo bản build và cơ sở dữ liệu thử tại máy

```bash
corepack pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_broad_jigsaw.sql
```

Chạy migration một lần cho cơ sở dữ liệu mới; không chạy lại SQL tạo bảng đã áp dụng. Sau đó chạy `corepack pnpm dev` hoặc `corepack pnpm start`. Cơ sở dữ liệu local và cơ sở dữ liệu online là hai hệ thống riêng.

## Lưu ý triển khai

GitHub lưu mã nguồn; việc đẩy repository không tự đưa website lên mạng. Đây là ứng dụng có API máy chủ và Cloudflare D1, không phải website HTML tĩnh. GitHub Pages không chạy được chức năng đăng ký/tra cứu hiện tại.

Bản xuất giữ cấu trúc tương thích ChatGPT Sites / Cloudflare Workers. Đã bỏ mã định danh dự án ChatGPT đang hoạt động khỏi `.openai/hosting.json` để bản sao không liên kết nhầm dự án cũ. Không kèm lịch sử Git, token, dữ liệu khách, node_modules hoặc bản build.

Nếu triển khai qua ChatGPT Sites: đăng ký dự án mới, cấu hình binding D1 `DB`, áp dụng migrations và công bố qua quy trình Sites.

Nếu triển khai trực tiếp trên Cloudflare hoặc nền tảng khác: cần cấu hình Worker, D1 và cơ chế xác thực phù hợp trước khi mở dịch vụ. Không coi bản ZIP là cấu hình tự triển khai hoàn chỉnh cho Vercel/Netlify. Tham khảo `docs/STARTER_REFERENCE.md` cho kiến trúc và lệnh của starter.

**Phân quyền điều phối:** API hiện đọc danh sách `ADMIN_EMAILS` từ môi trường máy chủ và so sánh email do lớp đăng nhập đáng tin cậy cung cấp qua header `oai-authenticated-user-email`. Cơ chế header này do ChatGPT Sites cung cấp. Ngoài Sites, phải thay bằng xác thực phía máy chủ hoặc proxy xác thực có kiểm chứng, đồng thời chặn header do khách tự gửi. Chỉ đặt `ADMIN_EMAILS` trên host bên ngoài mà không có lớp xác thực không đủ bảo vệ dữ liệu. Không công khai API điều phối trước khi hoàn tất phần này.

## Các thư mục chính

- `app/page.tsx`: trang đăng ký và nội dung bốn ngôn ngữ.
- `app/globals.css`: thiết kế và bố cục responsive.
- `app/operations/`: giao diện nhân viên.
- `app/api/`: API đăng ký, tra cứu và điều phối.
- `public/images/`: ảnh nhân viên, hành lý, băng chuyền và máy bay.
- `db/`, `drizzle/`: schema và migration cơ sở dữ liệu.
- `worker/`, `scripts/`, `vite.config.ts`: cấu hình chạy và build.

Nguồn xuất: phiên bản Son Tra Company đã triển khai, commit `eb003a4b93202d100a39c3fbb0bbd809fee0d701`. Bản xuất không thay đổi website đang hoạt động.
