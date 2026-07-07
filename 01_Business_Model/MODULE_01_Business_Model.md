# Module 1: Tái Cấu Trúc Mô Hình Kinh Doanh

## Bối Cảnh Dolphin Technology

**Thực trạng hiện tại:**

Dolphin Technology là công ty phần mềm quy mô khoảng 50 nhân sự, hoạt động tại thị trường nội địa Việt Nam. Mô hình kinh doanh hiện tại là phát triển phần mềm theo đơn đặt hàng của khách hàng — mỗi dự án là một sản phẩm riêng biệt, phục vụ một khách hàng cụ thể.

Các sản phẩm Dolphin đã triển khai trải rộng nhiều lĩnh vực: quản lý văn bản điện tử (Vietlot), hệ thống giải trí khách sạn (IPTV), phần mềm quản lý sự kiện/vé (Event/Ticket), tòa soạn điện tử/CMS. Hoạt động kinh doanh phụ thuộc chủ yếu vào mạng lưới quan hệ cá nhân của CEO, và các sản phẩm đã làm hầu như không tái sử dụng được cho khách hàng khác.

**Mong muốn của CEO:**

CEO không muốn phát triển theo hướng IT Outsourcing thuần túy. Định hướng là từ các sản phẩm đã triển khai (hoặc sẽ triển khai), chọn lọc sản phẩm tiềm năng để thử nghiệm và tách thành đơn vị kinh doanh (BU) vận hành độc lập. Mục tiêu dài hạn là trở thành **công ty sản phẩm**, đồng thời vẫn duy trì mảng dịch vụ làm nguồn cash flow ổn định.

**Bài toán cốt lõi:** Làm thế nào chuyển đổi từ mô hình phát triển phần mềm theo đơn đặt hàng sang công ty có sản phẩm riêng có khả năng mở rộng — mà vẫn đảm bảo tài chính trong suốt quá trình chuyển đổi?

---

## Phần 1: Chẩn Đoán — Dolphin Đang Ở Đâu?

### 1.1 Mô Hình Hiện Tại: Custom Software Studio

Dolphin hiện hoạt động theo mô hình **Software Studio** — nhận yêu cầu từ khách hàng, phát triển phần mềm theo đặc tả, bàn giao sản phẩm, và bảo trì nếu có hợp đồng.

```
┌─────────────────────────────────────────────────────┐
│              MÔ HÌNH HIỆN TẠI CỦA DOLPHIN          │
│                                                      │
│   Quan hệ CEO → Khách hàng đặt hàng                │
│        ↓                                             │
│   Dolphin phát triển phần mềm theo yêu cầu         │
│        ↓                                             │
│   Bàn giao → Bảo trì (nếu có hợp đồng)            │
│        ↓                                             │
│   Tìm khách mới → Lặp lại                          │
│                                                      │
│   Kết quả:                                           │
│   • Doanh thu phụ thuộc vào số dự án CEO tìm được   │
│   • Sản phẩm không tái sử dụng được                │
│   • Không có doanh thu định kỳ (recurring revenue)  │
│   • Mỗi dự án bắt đầu lại từ đầu                   │
└─────────────────────────────────────────────────────┘
```

### 1.2 Hệ Quả Của Mô Hình Này

**Workshop Activity 1:** CEO và ban lãnh đạo tự đánh giá — Dolphin đang gặp bao nhiêu trong số các vấn đề dưới đây?

| # | Vấn đề | Có/Không | Mức độ (1-5) |
|---|--------|----------|-------------|
| 1 | Doanh thu phụ thuộc vào khả năng tìm thương vụ của CEO | | |
| 2 | Nếu CEO vắng mặt, phần lớn pipeline bán hàng bị đình trệ | | |
| 3 | Đội ngũ nhàn rỗi trong khoảng trống giữa hai dự án (bench time cao) | | |
| 4 | Mỗi dự án mới phải tìm hiểu lĩnh vực mới từ đầu | | |
| 5 | Khó định giá vì mỗi dự án hoàn toàn khác nhau | | |
| 6 | Không có sản phẩm nào tiếp tục tạo doanh thu sau khi bàn giao | | |
| 7 | Khách hàng ít quay lại (dự án chỉ thực hiện một lần) | | |
| 8 | Khó tuyển dụng vì không có thương hiệu chuyên sâu trong ngành nào cụ thể | | |
| 9 | Biên lợi nhuận bị ép vì không có đòn bẩy (tài sản trí tuệ, nền tảng tái sử dụng) | | |
| 10 | Doanh thu không thể dự báo quá 3–6 tháng | | |

**Thang đánh giá:**
- 0–15 điểm: Tình hình chưa nghiêm trọng — tối ưu hóa mô hình hiện tại
- 16–30 điểm: Cần chuyển đổi có kế hoạch trong 1–2 năm tới
- 31–50 điểm: Cần chuyển đổi khẩn cấp — mô hình hiện tại không bền vững

### 1.3 Business Model Canvas — Dolphin Hiện Tại

**Workshop Activity 2:** Điền canvas này cùng ban lãnh đạo

```
┌──────────────────┬──────────────────┬──────────────────┐
│ ĐỐI TÁC          │ HOẠT ĐỘNG        │ GIÁ TRỊ          │
│ CHÍNH             │ CHÍNH            │ CUNG CẤP         │
│                   │                  │                  │
│ • Khách hàng giới │ • Phân tích yêu  │ • "Chúng tôi    │
│   thiệu qua CEO  │   cầu khách hàng │   phát triển phần│
│ • Đối tác công    │ • Phát triển phần│   mềm theo yêu  │
│   nghệ?           │   mềm theo đơn  │   cầu của quý    │
│ • Nhà cung cấp    │ • Bàn giao &     │   khách"         │
│   cloud?          │   bảo trì        │ • Giá cạnh tranh │
│                   │                  │ • Đội ngũ VN     │
│                   │                  │   linh hoạt      │
│                   │                  │                  │
├──────────────────┼──────────────────┼──────────────────┤
│ NGUỒN LỰC        │                  │ QUAN HỆ          │
│ CHÍNH             │                  │ KHÁCH HÀNG       │
│                   │                  │                  │
│ • ~50 kỹ sư       │                  │ • Quan hệ cá    │
│ • Mạng lưới quan  │                  │   nhân của CEO  │
│   hệ của CEO      │                  │ • Theo dự án    │
│ • Kinh nghiệm     │                  │   (đa số kết    │
│   nhiều lĩnh vực  │                  │   thúc sau       │
│ • Mã nguồn từ     │                  │   bàn giao)     │
│   các dự án cũ    │                  │                  │
│                   │                  │                  │
├──────────────────┴──────────────────┼──────────────────┤
│ CƠ CẤU CHI PHÍ                      │ NGUỒN DOANH THU  │
│                                      │                  │
│ • Lương (~70-80% tổng chi phí)      │ • Phí dự án      │
│ • Văn phòng                          │   (fixed/T&M)   │
│ • Hạ tầng/Cloud                      │ • Hợp đồng bảo  │
│ • Thời gian bán hàng của CEO         │   trì?           │
│                                      │ • Doanh thu định │
│                                      │   kỳ = ?%        │
└──────────────────────────────────────┴──────────────────┘

PHÂN KHÚC KHÁCH HÀNG:
• Vietlot (xổ số)
• Khách sạn (hospitality)
• Sự kiện/Giải trí (Event/Entertainment)
• Báo chí/Truyền thông
• Khác: ___________

KÊNH PHÂN PHỐI:
• Mạng lưới quan hệ cá nhân của CEO (chính)
• Giới thiệu từ khách cũ
• Khác: ___________
```

**Câu hỏi thảo luận sau khi điền:**
1. Nếu CEO nghỉ 6 tháng, công ty có tìm được thương vụ mới không?
2. Trong 5 năm qua, có bao nhiêu khách hàng quay lại hợp tác?
3. Có sản phẩm nào đang tạo doanh thu mà không cần Dolphin tiếp tục phát triển thêm?
4. Doanh thu từ bảo trì/hỗ trợ kỹ thuật chiếm bao nhiêu phần trăm tổng doanh thu?

---

## Phần 2: Mô Hình Mục Tiêu — Service-Funded Product Company

### 2.1 Tại Sao Không Thể Chuyển Thẳng Sang Mô Hình Sản Phẩm?

Với quy mô khoảng 50 người và tập trung tại thị trường nội địa, Dolphin chưa có điều kiện để chuyển đổi trực tiếp:

- Dừng nhận dự án dịch vụ để tập trung làm sản phẩm: nguy cơ cạn kiệt tài chính trong 3–6 tháng.
- Gọi vốn đầu tư mạo hiểm: chưa có sản phẩm đạt Product-Market Fit để thuyết phục nhà đầu tư.
- Tuyển riêng đội ngũ sản phẩm lớn: nguồn tài chính chưa cho phép.

Do đó, Dolphin cần một **mô hình kết hợp** với lộ trình chuyển đổi rõ ràng.

### 2.2 Mô Hình Service-Funded Product Company

```
┌─────────────────────────────────────────────────────────┐
│         MÔ HÌNH MỤC TIÊU: SERVICE-FUNDED PRODUCT       │
│                                                          │
│  ┌─────────────────┐     ┌─────────────────────────┐   │
│  │  MẢNG DỊCH VỤ   │     │  MẢNG SẢN PHẨM          │   │
│  │  (Nguồn tiền)   │────▶│  (Động lực tăng trưởng)  │   │
│  │                  │ tài │                           │   │
│  │  • Phát triển    │ trợ │  • Sản phẩm spin-off     │   │
│  │    phần mềm     │     │  • SaaS/Platform          │   │
│  │    theo đơn      │     │  • Doanh thu định kỳ     │   │
│  │  • CHỌN LỌC     │     │  • Có khả năng mở rộng   │   │
│  │    lĩnh vực     │     │                           │   │
│  │  • Tích lũy tài  │     │  Khởi đầu: 1 sản phẩm   │   │
│  │    sản trí tuệ  │     │  Mục tiêu: BU độc lập    │   │
│  └─────────────────┘     └─────────────────────────┘   │
│                                                          │
│  Tỷ lệ phân bổ nguồn lực:                              │
│  Năm 1: Dịch vụ 85% / Sản phẩm 15%                    │
│  Năm 2: Dịch vụ 70% / Sản phẩm 30%                    │
│  Năm 3: Dịch vụ 50% / Sản phẩm 50%                    │
│                                                          │
│  Mục tiêu doanh thu:                                    │
│  Năm 3: Doanh thu sản phẩm ≥ 30% tổng doanh thu       │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Nguyên Tắc Vận Hành Mô Hình Kết Hợp

**7 nguyên tắc cốt yếu:**

1. **Dịch vụ vẫn là ưu tiên về cash flow** — mảng sản phẩm không được ảnh hưởng đến khả năng giao hàng của mảng dịch vụ.
2. **Chọn lọc dự án dịch vụ** — chỉ nhận dự án trong lĩnh vực mà Dolphin muốn phát triển sản phẩm. Không nhận mọi thứ.
3. **Khai thác tài sản trí tuệ từ mọi dự án dịch vụ** — mỗi dự án phải để lại thành phần tái sử dụng được, kiến thức chuyên ngành, hoặc ý tưởng sản phẩm.
4. **Chỉ đầu tư vào 1 sản phẩm tại một thời điểm** — không dàn trải nguồn lực, tập trung toàn lực.
5. **Dừng sớm nếu không khả thi** — nếu sản phẩm không có sức hút thị trường sau 6 tháng thử nghiệm, dừng lại và chọn hướng mới.
6. **Tách đội ngũ rõ ràng** — nhân sự làm sản phẩm không bị điều chuyển sang dự án dịch vụ (trừ tình huống khẩn cấp).
7. **CEO phải chuyển trọng tâm** — từ trực tiếp bán hàng dịch vụ sang xây dựng tầm nhìn sản phẩm, đồng thời tuyển người phụ trách kinh doanh cho mảng dịch vụ.

### 2.4 Business Model Canvas — Mục Tiêu Năm 3

**Workshop Activity 3:** Cùng thiết kế canvas mục tiêu

```
┌──────────────────┬──────────────────┬──────────────────┐
│ ĐỐI TÁC          │ HOẠT ĐỘNG        │ GIÁ TRỊ          │
│ CHÍNH             │ CHÍNH            │ CUNG CẤP         │
│                   │                  │                  │
│ • Đối tác phân   │ • DỊCH VỤ: Phát │ • DỊCH VỤ: "Đối │
│   phối sản phẩm  │   triển phần mềm│   tác công nghệ  │
│ • Đối tác trong  │   trong lĩnh vực│   hiểu sâu       │
│   lĩnh vực mục   │   mục tiêu      │   [lĩnh vực]"   │
│   tiêu           │ • SẢN PHẨM:     │                  │
│ • Đối tác công   │   Phát triển &   │ • SẢN PHẨM:     │
│   nghệ           │   mở rộng sản   │   "Giải pháp     │
│   (cloud, API)   │   phẩm riêng    │   [lĩnh vực]     │
│                   │ • Kinh doanh &   │   sẵn dùng,      │
│                   │   tiếp thị cho  │   đã kiểm chứng" │
│                   │   cả 2 mảng     │                  │
│                   │                  │                  │
├──────────────────┼──────────────────┼──────────────────┤
│ NGUỒN LỰC        │                  │ QUAN HỆ          │
│ CHÍNH             │                  │ KHÁCH HÀNG       │
│                   │                  │                  │
│ • Chuyên gia      │                  │ • DỊCH VỤ: Đối  │
│   lĩnh vực       │                  │   tác dài hạn   │
│ • Tài sản trí    │                  │ • SẢN PHẨM: Tự  │
│   tuệ (IP)       │                  │   phục vụ +      │
│ • Nền tảng/thành │                  │   hỗ trợ kỹ     │
│   phần tái sử    │                  │   thuật          │
│   dụng           │                  │ • Cộng đồng      │
│ • Đội ngũ kinh   │                  │   người dùng     │
│   doanh (không   │                  │                  │
│   chỉ CEO)       │                  │                  │
│                   │                  │                  │
├──────────────────┴──────────────────┼──────────────────┤
│ CƠ CẤU CHI PHÍ                      │ NGUỒN DOANH THU  │
│                                      │                  │
│ • Lương (giảm tỷ trọng xuống 60%)  │ • Phí dịch vụ    │
│ • Đầu tư R&D (15-20%)              │   (~70% → 50%)  │
│ • Kinh doanh & Tiếp thị (10-15%)   │ • Bản quyền sản  │
│ • Hạ tầng cloud cho sản phẩm        │   phẩm/SaaS     │
│                                      │   (~30%)         │
│                                      │ • Bảo trì &      │
│                                      │   hỗ trợ (20%)  │
└──────────────────────────────────────┴──────────────────┘
```

---

## Phần 3: Đánh Giá Sản Phẩm — Chọn Sản Phẩm Đầu Tư Đầu Tiên

### 3.1 Đánh Giá Tiềm Năng Spin-off

**Workshop Activity 4:** Chấm điểm từng sản phẩm đã triển khai

Mỗi tiêu chí chấm từ 1 (thấp) đến 5 (cao):

| Tiêu chí | Trọng số | VB Điện tử (Vietlot) | IPTV Khách sạn | Event/Ticket | CMS/Tòa soạn | [Khác] |
|----------|---------|----------------------|-----------------|-------------|-------------|--------|
| **Market size** — số lượng khách hàng tiềm năng tại VN | 20% | | | | | |
| **Recurring potential** — khách hàng có trả phí định kỳ hàng tháng/năm không? | 20% | | | | | |
| **Reusability** — bao nhiêu phần trăm mã nguồn có thể dùng lại cho khách hàng khác? | 15% | | | | | |
| **Competitive gap** — mức độ cạnh tranh trên thị trường hiện tại | 15% | | | | | |
| **Domain expertise** — mức độ hiểu biết chuyên sâu của Dolphin trong lĩnh vực này | 10% | | | | | |
| **Sales channel** — khả năng bán hàng mà không phụ thuộc vào CEO | 10% | | | | | |
| **Margin potential** — mức giá khách hàng sẵn sàng chi trả | 10% | | | | | |
| **Tổng điểm (có trọng số)** | 100% | | | | | |

### 3.2 Tiêu Chí Loại Trước (Pass/Fail)

Trước khi chấm điểm chi tiết, loại bỏ sản phẩm nào không đạt các điều kiện tối thiểu:

```
□ Có ít nhất 20 khách hàng tiềm năng tại Việt Nam?
  Nếu thị trường quá hẹp (ví dụ: chỉ Vietlot cần), không đủ cơ sở để spin off.

□ Khách hàng có nhu cầu cấp thiết đủ lớn để trả phí định kỳ hàng tháng/năm?
  Nếu khách hàng chỉ cần triển khai một lần rồi không dùng thêm, không thể chuyển thành sản phẩm.

□ Dolphin có thể phát triển MVP trong vòng 3 tháng với 3–5 người?
  Nếu yêu cầu đầu tư ban đầu quá lớn, rủi ro cao đối với quy mô công ty hiện tại.

□ Có thể bán hàng mà không cần CEO trực tiếp gặp từng khách?
  Nếu vẫn phụ thuộc vào bán hàng qua quan hệ cá nhân, chưa đủ điều kiện thành sản phẩm.
```

### 3.3 Phân Tích Sơ Bộ Từng Sản Phẩm

**Quản lý văn bản điện tử (dạng Vietlot):**
```
Tiềm năng: ★★★☆☆
+ Nhiều tổ chức/doanh nghiệp VN có nhu cầu (eOffice, quản lý văn bản)
+ Phù hợp xu hướng chuyển đổi số của khối nhà nước và doanh nghiệp
- Thị trường đã có nhiều đối thủ (VNPT, Viettel Solutions, Base.vn...)
- Mỗi tổ chức yêu cầu tùy chỉnh riêng, khó chuẩn hóa
? Có thể chuẩn hóa thành mô hình SaaS không?
```

**Hệ thống giải trí khách sạn (IPTV):**
```
Tiềm năng: ★★★★☆
+ Ngành hospitality Việt Nam đang tăng trưởng mạnh
+ Mô hình doanh thu định kỳ rõ ràng (phí thuê bao hàng tháng theo phòng)
+ Khách sạn hiếm khi tự phát triển hệ thống, sẵn sàng mua giải pháp có sẵn
+ Khả năng mở rộng tốt: triển khai thêm cho khách sạn mới mà không cần tùy chỉnh nhiều
- Đòi hỏi đầu tư phần cứng/hạ tầng ban đầu
- Đối thủ quốc tế có thể tham gia (nhưng mức giá thường cao hơn)
? Có bao nhiêu khách sạn 3–5 sao tại VN? Bao nhiêu chưa có hệ thống?
```

**Event/Ticket:**
```
Tiềm năng: ★★★☆☆
+ Thị trường sự kiện tại VN đang phát triển
+ Có thể chuyển thành nền tảng SaaS (tự phục vụ)
- Nhiều đối thủ mạnh đã có mặt (Ticketbox, Eventbrite...)
- Doanh thu theo mùa, không ổn định
? Có phân khúc nào chưa được phục vụ tốt?
```

**CMS/Tòa soạn điện tử:**
```
Tiềm năng: ★★☆☆☆
+ Dolphin có kiến thức chuyên sâu về lĩnh vực báo chí
- Quy mô thị trường nhỏ (số lượng tòa soạn tại VN có hạn)
- Nhiều CMS miễn phí hoặc giá thấp trên thị trường (WordPress, Contentful)
- Khó mở rộng ra ngoài Việt Nam
? Có yếu tố khác biệt nào đáng kể không?
```

⚠️ **Lưu ý:** Đây là đánh giá sơ bộ dựa trên thông tin hiện có. CEO và ban lãnh đạo cần kiểm chứng bằng dữ liệu thực tế trước khi đưa ra quyết định.

### 3.4 Khung Quyết Định: Invest / Watch / Kill

**Workshop Activity 5:** Sau khi chấm điểm, phân loại từng sản phẩm theo ma trận quyết định

```
    Tiềm năng Product-Market Fit (Cao)
         │
  WATCH  │  INVEST
  (Thử   │  (Đầu tư 15-20%
   nghiệm│   nguồn lực,
   nhỏ,  │   phát triển MVP,
   kiểm  │   tìm Product-
   chứng │   Market Fit)
   thêm) │
  ───────┼────────────
  KILL   │  WATCH
  (Không │  (Có thế mạnh
   đầu   │   nhưng thị
   tư)   │   trường chưa
         │   rõ ràng)
         │
    Lợi thế cạnh tranh của Dolphin (Cao) →
```

Chỉ chọn **1 sản phẩm** vào ô INVEST. Đây là sản phẩm đầu tư chiến lược đầu tiên.

---

## Phần 4: Chuyển Đổi Mảng Dịch Vụ — Từ "Nhận Mọi Thứ" Sang "Chọn Lọc"

### 4.1 Tập Trung Lĩnh Vực Cho Mảng Dịch Vụ

Khi đã chọn sản phẩm đầu tư, mảng dịch vụ cũng cần tập trung vào lĩnh vực liên quan:

```
Ví dụ: Nếu sản phẩm đầu tư = IPTV Khách sạn

Mảng dịch vụ nên:
✅ Nhận dự án hospitality tech (PMS, đặt phòng, F&B tech)
✅ Nhận dự án entertainment/media tech
✅ Nhận dự án IoT/thiết bị thông minh
⚠️ Cân nhắc dự án gần lĩnh vực (retail tech, proptech)
❌ Tránh dự án không liên quan (logistics, fintech, education...)

Lý do: Mỗi dự án dịch vụ trong cùng lĩnh vực sẽ tích lũy thêm:
• Kiến thức chuyên ngành cho đội sản phẩm
• Quan hệ với khách hàng tiềm năng của sản phẩm
• Thành phần phần mềm có thể tái sử dụng
• Uy tín chuyên môn trong ngành
```

### 4.2 Khai Thác Tài Sản Trí Tuệ Từ Dự Án Dịch Vụ

**Quy trình bắt buộc cho mọi dự án dịch vụ:**

```
Trước dự án:
□ Dự án có thuộc lĩnh vực trọng tâm không?
□ Thành phần nào có thể tái sử dụng cho sản phẩm?
□ Kiến thức nào cần ghi nhận lại?

Trong dự án:
□ Thiết kế kiến trúc hướng tới khả năng tái sử dụng
□ Tách rõ phần chung ra khỏi phần tùy chỉnh riêng
□ Ghi chép kiến thức chuyên ngành thu được

Sau dự án:
□ Tách các thành phần tái sử dụng vào thư viện dùng chung
□ Viết case study (phục vụ tiếp thị cho cả mảng dịch vụ lẫn sản phẩm)
□ Cập nhật lộ trình sản phẩm nếu có phát hiện mới
□ Tổng kết: đội ngũ đã tích lũy thêm kiến thức chuyên ngành gì?
```

### 4.3 Giải Quyết Vấn Đề CEO Kiêm Nhiệm Bán Hàng

**Kế hoạch chuyển giao:**

```
Giai đoạn 1 (0–6 tháng): CEO vẫn chủ trì, bắt đầu xây dựng nền tảng
├── CEO tài liệu hóa quy trình bán hàng hiện tại
├── CEO giới thiệu các mối quan hệ trọng yếu cho nhân sự kinh doanh mới
├── Tuyển 1 Trưởng phòng Kinh doanh / Account Manager
├── Xây dựng tài liệu bán hàng (portfolio, case study)
└── CEO bắt đầu dành 20% thời gian cho tầm nhìn sản phẩm

Giai đoạn 2 (6–12 tháng): Chuyển giao dần
├── Trưởng phòng KD tự đảm nhận 30–50% pipeline
├── CEO tập trung vào thương vụ chiến lược + định hướng sản phẩm
├── Triển khai tiếp thị nội dung (content marketing, SEO trong lĩnh vực)
├── Xây dựng quan hệ với đối tác ngành
└── CEO dành 40% thời gian cho sản phẩm

Giai đoạn 3 (12–24 tháng): CEO chuyển trọng tâm sang sản phẩm
├── Đội kinh doanh đảm nhận 80%+ pipeline dịch vụ
├── CEO dẫn dắt chiến lược và tầm nhìn sản phẩm
├── Sản phẩm có kênh bán hàng riêng (website, tự phục vụ)
├── CEO chỉ tham gia các thương vụ dịch vụ lớn/chiến lược
└── CEO dành 60%+ thời gian cho sản phẩm
```

---

## Phần 5: Mô Hình Tài Chính & Cột Mốc

### 5.1 Quy Hoạch Tài Chính Cho Mô Hình Kết Hợp

**Workshop Activity 6:** Ước tính mô hình tài chính

```
HIỆN TẠI:
Doanh thu: ___ tỷ VND/năm
Biên lợi nhuận gộp: ___%
Nhân sự: ~50 người
Doanh thu trên đầu người: ___ triệu VND/tháng
Doanh thu định kỳ: ___%

MỤC TIÊU NĂM 1:
Doanh thu dịch vụ: ___ tỷ (duy trì hoặc tăng nhẹ)
Đầu tư cho sản phẩm: ___ tỷ (từ lợi nhuận mảng dịch vụ)
Doanh thu sản phẩm: ___ triệu (bắt đầu từ quy mô nhỏ)
Phân bổ nhân sự: 42 dịch vụ / 5 sản phẩm / 3 dùng chung
Chi phí đội sản phẩm: ~___ triệu/tháng

MỤC TIÊU NĂM 3:
Doanh thu dịch vụ: ___ tỷ
Doanh thu sản phẩm: ___ tỷ (mục tiêu 30% tổng doanh thu)
Biên lợi nhuận tổng hợp: ___% (mục tiêu tăng 10 điểm % so với hiện tại)
Nhân sự: __ dịch vụ / __ sản phẩm / __ dùng chung
```

### 5.2 Tư Duy Runway — Dolphin Có Thể Tài Trợ Sản Phẩm Bao Lâu?

```
Chi phí đội sản phẩm / tháng = Số người × Lương trung bình × 1,3 (chi phí quản lý)
Ví dụ: 5 người × 25 triệu × 1,3 = ~162 triệu/tháng

Lợi nhuận mảng dịch vụ hàng tháng cần ≥ Chi phí đội sản phẩm + 20% dự phòng
→ Mảng dịch vụ cần tạo ra ≥ 195 triệu lợi nhuận/tháng để tài trợ mảng sản phẩm

Nếu biên lợi nhuận dịch vụ = 25% → cần doanh thu dịch vụ ≥ 780 triệu/tháng
Nếu biên lợi nhuận dịch vụ = 30% → cần doanh thu dịch vụ ≥ 650 triệu/tháng

Runway = (Tiền mặt dự trữ + Lợi nhuận dịch vụ dự kiến) / Chi phí đội sản phẩm
Mục tiêu: Runway ≥ 12 tháng trước khi sản phẩm cần tự trang trải
```

### 5.3 Cột Mốc & Điểm Quyết Định Tiếp Tục/Dừng

| Cột mốc | Thời điểm | Tiêu chí đánh giá |
|---------|----------|-------------------|
| **Chọn sản phẩm đầu tư** | Tháng 0 | Ban lãnh đạo thống nhất, xác định rõ chân dung khách hàng mục tiêu |
| **Hoàn thành MVP** | Tháng 3 | Các tính năng cốt lõi hoạt động, sản phẩm có thể sử dụng |
| **3 khách hàng thử nghiệm đầu tiên** | Tháng 6 | 3 khách hàng dùng thử, có phản hồi cụ thể |
| **Khách hàng trả phí đầu tiên** | Tháng 9 | Ít nhất 1 khách hàng trả phí (không phải dùng miễn phí) |
| **Tín hiệu Product-Market Fit** | Tháng 12 | ≥ 5 khách hàng trả phí, NPS > 30, tỷ lệ rời bỏ < 10%/tháng |
| **Đơn vị kinh doanh khả thi** | Tháng 18 | Doanh thu sản phẩm trang trải ≥ 50% chi phí đội ngũ |
| **Đơn vị kinh doanh độc lập** | Tháng 24–36 | Mảng sản phẩm có lãi, có báo cáo lãi/lỗ riêng |

**Điểm quyết định tại Tháng 12:**
```
TIẾP TỤC nếu:
✅ Có ≥ 5 khách hàng trả phí
✅ Khách hàng sẵn sàng giới thiệu cho người khác (NPS tích cực)
✅ Tỷ lệ rời bỏ hàng tháng < 10%
✅ Có lộ trình rõ ràng để trang trải chi phí đội sản phẩm trong 12 tháng tới
✅ Mảng dịch vụ vẫn hoạt động ổn định

DỪNG nếu:
❌ Dưới 3 khách hàng trả phí sau 12 tháng
❌ Khách hàng thử nghiệm đều ngừng sử dụng
❌ Mảng dịch vụ bị ảnh hưởng nghiêm trọng
❌ Không tìm được yếu tố khác biệt so với đối thủ

Nếu DỪNG: ngừng đầu tư vào sản phẩm hiện tại, rút bài học, chọn hướng đi mới.
```

---

## Phần 6: Rủi Ro & Biện Pháp Giảm Thiểu

### 6.1 Các Rủi Ro Chính

| Rủi ro | Xác suất | Mức độ ảnh hưởng | Biện pháp giảm thiểu |
|--------|---------|------------------|---------------------|
| Doanh thu dịch vụ sụt giảm khi CEO chuyển trọng tâm sang sản phẩm | Cao | Cao | Tuyển Trưởng phòng KD sớm, CEO chuyển giao dần |
| Sản phẩm không đạt Product-Market Fit | Trung bình | Cao | Tiếp cận tinh gọn, thử nghiệm sớm, nguyên tắc dừng sớm |
| Nhân sự bị kéo qua lại giữa hai mảng | Cao | Trung bình | Tách đội ngũ rõ ràng, không chia sẻ lập trình viên |
| Đứt gãy cash flow khi cả hai mảng chưa ổn định | Trung bình | Rất cao | Duy trì runway ≥ 12 tháng, không đầu tư vượt lợi nhuận dịch vụ |
| CEO không chuyển giao được vai trò bán hàng | Cao | Cao | Huấn luyện, cột mốc rõ ràng, cơ chế giám sát |
| Chọn sai sản phẩm đầu tư | Trung bình | Trung bình | Quyết định dựa trên dữ liệu, điểm đánh giá lại tại tháng 6 |

### 6.2 Nguyên Tắc Bất Di Bất Dịch Trong Quá Trình Chuyển Đổi

```
1. KHÔNG BAO GIỜ đầu tư vào sản phẩm nhiều hơn lợi nhuận hàng tháng của mảng dịch vụ.
2. KHÔNG BAO GIỜ điều chuyển lập trình viên sản phẩm sang dự án dịch vụ
   (ngoại trừ tình huống khẩn cấp có nguy cơ mất khách hàng lớn).
3. LUÔN duy trì ít nhất 6 tháng runway cho đội sản phẩm.
4. DỪNG đầu tư vào sản phẩm nếu không đạt tiêu chí tại các điểm quyết định.
5. CEO PHẢI có kế hoạch kế nhiệm cho vai trò bán hàng trong 12 tháng đầu tiên.
```

---

## Phần 7: Tình Huống Tham Khảo — Công Ty Việt Nam Chuyển Từ Dịch Vụ Sang Sản Phẩm

### Tình huống 1: Base.vn
- **Xuất phát:** Agency phát triển web/ứng dụng theo đơn đặt hàng
- **Hiện tại:** Nền tảng quản trị doanh nghiệp (SaaS)
- **Quá trình:** Nhận ra nhiều khách hàng có chung nhu cầu, chuẩn hóa giải pháp thành sản phẩm, chuyển sang mô hình SaaS
- **Kết quả:** Trở thành một trong những nền tảng quản trị doanh nghiệp hàng đầu Việt Nam
- **Bài học:** Quan sát nhu cầu lặp lại từ các dự án dịch vụ để tìm ra sản phẩm tiềm năng

### Tình huống 2: Palexy (Analytics cho ngành bán lẻ)
- **Xuất phát:** Triển khai dự án phân tích dữ liệu cho các nhà bán lẻ
- **Hiện tại:** Nền tảng SaaS phân tích hành vi khách hàng tại cửa hàng
- **Quá trình:** Một dự án thành công được chuẩn hóa và triển khai cho các nhà bán lẻ khác
- **Bài học:** Một dự án dịch vụ riêng lẻ có thể trở thành sản phẩm nếu thị trường đủ lớn

### Tình huống 3: KMS Technology → QASymphony
- **Xuất phát:** Công ty outsourcing
- **Hiện tại:** Phát triển QASymphony (nền tảng quản lý kiểm thử phần mềm) song song với mảng dịch vụ
- **Quá trình:** Mảng dịch vụ tài trợ cho mảng sản phẩm, tách thành BU riêng, sau đó bán cho Tricentis
- **Bài học:** Mô hình kết hợp dịch vụ–sản phẩm khả thi, nhưng cần tách biệt tổ chức rõ ràng

---

## Kết Quả Cần Đạt Sau Module 1

| # | Kết quả | Người chịu trách nhiệm | Trạng thái |
|---|---------|------------------------|-----------|
| 1 | Hoàn thành bài chẩn đoán 10 câu | Ban lãnh đạo | □ |
| 2 | Business Model Canvas hiện tại (đã điền) | CEO + Ban lãnh đạo | □ |
| 3 | Bảng đánh giá tiềm năng spin-off (đã chấm điểm) | CEO + PM | □ |
| 4 | Xác định sản phẩm đầu tư đầu tiên | CEO | □ |
| 5 | Xác định lĩnh vực trọng tâm cho mảng dịch vụ | CEO + Kinh doanh | □ |
| 6 | Mô hình tài chính & tính toán runway | CEO + Tài chính | □ |
| 7 | Kế hoạch chuyển giao vai trò bán hàng của CEO | CEO | □ |
| 8 | Business Model Canvas mục tiêu Năm 3 | Ban lãnh đạo | □ |
| 9 | Thống nhất các cột mốc và điểm quyết định | Ban lãnh đạo | □ |

---

## Kết Nối Sang Module 2

Khi đã hoàn thành Module 1 với các kết quả:
- ✅ Sản phẩm đầu tư đã được chọn
- ✅ Lĩnh vực trọng tâm cho mảng dịch vụ đã xác định
- ✅ Ban lãnh đạo thống nhất mô hình kết hợp

Module 2 sẽ thiết kế chi tiết:
- Portfolio dịch vụ: giữ lại, loại bỏ, hoặc phát triển thêm dịch vụ nào (phù hợp với lĩnh vực trọng tâm)
- Lộ trình sản phẩm và phạm vi MVP cho sản phẩm đã chọn
- Chiến lược định giá cho cả mảng dịch vụ (nâng biên lợi nhuận) và sản phẩm (SaaS/thuê bao)
