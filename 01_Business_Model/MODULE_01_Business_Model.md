# Module 1: Tái Cấu Trúc Mô Hình Kinh Doanh

## Bối Cảnh Dolphin Technology

**Thực trạng hiện tại:**
- Công ty phần mềm ~50 người, thị trường nội địa Việt Nam
- Làm custom software theo đặt hàng khách hàng, mỗi dự án là một sản phẩm riêng biệt
- Sản phẩm đã làm rải rác nhiều lĩnh vực: quản lý văn bản điện tử (Vietlot), hệ thống giải trí khách sạn (IPTV), phần mềm event/ticket, tòa soạn điện tử/CMS...
- Bán hàng phụ thuộc chủ yếu vào network cá nhân của CEO
- Không tích lũy được: mỗi sản phẩm quá đặc thù, khó nhân rộng

**Mong muốn của CEO:**
- KHÔNG muốn phát triển theo hướng IT Outsourcing thuần
- Muốn từ các sản phẩm đã làm (hoặc sẽ làm) → thử nghiệm → spin off sản phẩm tiềm năng thành BU chạy độc lập
- Hướng tới trở thành **công ty product**, nhưng vẫn giữ service làm nguồn cash flow

**Bài toán cốt lõi:** Làm sao chuyển đổi từ "xưởng code theo đơn đặt hàng" sang "công ty có sản phẩm riêng có thể scale" mà không chết vì hết tiền trong quá trình chuyển đổi?

---

## Phần 1: Chẩn Đoán — Dolphin Đang Ở Đâu?

### 1.1 Mô Hình Hiện Tại: "Custom Software Studio"

Dolphin hiện tại hoạt động theo mô hình **Software Studio** — nhận đơn đặt hàng, build sản phẩm theo yêu cầu khách hàng, bàn giao, và (có thể) maintain.

```
┌─────────────────────────────────────────────────────┐
│              MÔ HÌNH HIỆN TẠI CỦA DOLPHIN          │
│                                                      │
│   CEO network → Khách hàng đặt hàng                │
│        ↓                                             │
│   Dolphin build sản phẩm theo spec                  │
│        ↓                                             │
│   Bàn giao → (Maintain nếu có hợp đồng)            │
│        ↓                                             │
│   Tìm khách mới → Lặp lại                          │
│                                                      │
│   Kết quả:                                           │
│   • Doanh thu = f(số project CEO tìm được)          │
│   • Sản phẩm không tái sử dụng được                │
│   • Không có recurring revenue                      │
│   • Mỗi project bắt đầu từ gần như zero            │
└─────────────────────────────────────────────────────┘
```

### 1.2 Hệ Quả Của Mô Hình Này

**Workshop Activity 1:** CEO và leadership tự đánh giá — Dolphin đang gặp bao nhiêu trong số các vấn đề dưới đây?

| # | Vấn đề | Có/Không | Mức độ (1-5) |
|---|--------|----------|-------------|
| 1 | Doanh thu phụ thuộc vào khả năng tìm deal của CEO | | |
| 2 | Mất CEO = mất phần lớn pipeline | | |
| 3 | Team rảnh khi giữa 2 project (bench time cao) | | |
| 4 | Mỗi project mới phải learn domain mới từ đầu | | |
| 5 | Khó estimate giá vì mỗi project khác nhau hoàn toàn | | |
| 6 | Không có sản phẩm nào generate revenue sau khi bàn giao | | |
| 7 | Khách hàng ít quay lại (one-time project) | | |
| 8 | Khó tuyển vì không có brand trong ngành nào cụ thể | | |
| 9 | Margin bị ép vì không có leverage (IP, platform) | | |
| 10 | Revenue không thể dự đoán được quá 3-6 tháng | | |

**Scoring:**
- 0-15 điểm: Tình hình chưa nghiêm trọng, optimize mô hình hiện tại
- 16-30 điểm: Cần chuyển đổi có kế hoạch trong 1-2 năm
- 31-50 điểm: Cần chuyển đổi khẩn cấp, mô hình hiện tại không bền vững

### 1.3 Business Model Canvas — Dolphin Hiện Tại

**Workshop Activity 2:** Điền canvas này cùng leadership team

```
┌──────────────────┬──────────────────┬──────────────────┐
│ KEY PARTNERS     │ KEY ACTIVITIES   │ VALUE PROPOSITION│
│                  │                  │                  │
│ • Khách hàng giới│ • Phân tích yêu  │ • "Chúng tôi    │
│   thiệu bởi CEO │   cầu khách hàng │   build phần mềm│
│ • Đối tác tech?  │ • Custom software│   theo ý bạn"   │
│ • Cloud provider?│   development    │ • Giá cạnh tranh │
│                  │ • Bàn giao &     │ • Team Việt Nam  │
│                  │   maintain       │   linh hoạt      │
│                  │                  │                  │
├──────────────────┼──────────────────┼──────────────────┤
│ KEY RESOURCES    │                  │ CUSTOMER         │
│                  │                  │ RELATIONSHIPS    │
│ • ~50 engineers  │                  │                  │
│ • CEO's network  │                  │ • Quan hệ cá    │
│ • Kinh nghiệm    │                  │   nhân CEO      │
│   nhiều domain   │                  │ • Project-based  │
│ • Code/source    │                  │   (đa số kết    │
│   từ các project │                  │   thúc sau       │
│   cũ             │                  │   bàn giao)     │
│                  │                  │                  │
├──────────────────┴──────────────────┼──────────────────┤
│ COST STRUCTURE                      │ REVENUE STREAMS  │
│                                     │                  │
│ • Lương (~70-80% chi phí)          │ • Project fees   │
│ • Office                            │   (fixed/T&M)   │
│ • Infra/Cloud                       │ • Maintenance    │
│ • Sales = CEO time                  │   contracts?     │
│                                     │ • Recurring = ?% │
└─────────────────────────────────────┴──────────────────┘

CUSTOMER SEGMENTS:
• Vietlot (xổ số)
• Khách sạn (hospitality)
• Event/Entertainment
• Báo chí/Truyền thông
• Khác: ___________

CHANNELS:
• CEO personal network (chính)
• Referral từ khách cũ
• Khác: ___________
```

**Câu hỏi thảo luận sau khi điền:**
1. Nếu CEO nghỉ 6 tháng, công ty có tìm được deal mới không?
2. Trong 5 năm qua, có bao nhiêu khách hàng quay lại?
3. Có sản phẩm nào đang generate revenue mà không cần Dolphin tiếp tục develop?
4. Revenue từ maintenance/support chiếm bao nhiêu %?

---

## Phần 2: Mô Hình Mục Tiêu — "Service-Funded Product Company"

### 2.1 Tại Sao Không Thể Nhảy Thẳng Sang Product?

Với quy mô ~50 người và thị trường nội địa, Dolphin không thể:
- Dừng nhận project để tập trung làm product (hết tiền trong 3-6 tháng)
- Gọi vốn VC kiểu startup (chưa có product-market fit)
- Tuyển thêm team product riêng lớn (cash không đủ)

→ Cần **mô hình hybrid** có lộ trình rõ ràng.

### 2.2 Mô Hình "Service-Funded Product Company"

```
┌─────────────────────────────────────────────────────────┐
│         MÔ HÌNH MỤC TIÊU: SERVICE-FUNDED PRODUCT       │
│                                                          │
│  ┌─────────────────┐     ┌─────────────────────────┐   │
│  │  SERVICE ARM     │     │  PRODUCT ARM             │   │
│  │  (Cash Engine)   │────▶│  (Growth Engine)         │   │
│  │                  │funds│                           │   │
│  │  • Custom dev    │     │  • Spin-off products     │   │
│  │  • Nhưng CHỌN    │     │  • SaaS/Platform         │   │
│  │    LỌC domain    │     │  • Recurring revenue     │   │
│  │  • Build IP      │     │  • Scalable              │   │
│  │    trong quá     │     │                           │   │
│  │    trình làm     │     │  Bắt đầu: 1 sản phẩm    │   │
│  │    service       │     │  Mục tiêu: BU độc lập    │   │
│  └─────────────────┘     └─────────────────────────┘   │
│                                                          │
│  Tỷ lệ phân bổ resource:                               │
│  Year 1: Service 85% / Product 15%                      │
│  Year 2: Service 70% / Product 30%                      │
│  Year 3: Service 50% / Product 50%                      │
│                                                          │
│  Revenue target:                                         │
│  Year 3: Product revenue ≥ 30% tổng revenue            │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Nguyên Tắc Vận Hành Hybrid

**7 nguyên tắc sống còn:**

1. **Service vẫn là ưu tiên cash flow** — không bao giờ để product arm ảnh hưởng đến khả năng deliver service
2. **Chọn lọc project service** — chỉ nhận project trong domain mà Dolphin muốn build product (không nhận mọi thứ)
3. **Harvest IP từ mọi service project** — mỗi project phải để lại reusable component, domain knowledge, hoặc product idea
4. **1 product bet tại 1 thời điểm** — không spread thin, focus
5. **Kill fast** — nếu product không có traction sau 6 tháng pilot, dừng và chọn bet mới
6. **Tách team rõ ràng** — người làm product không bị pull vào service project (trừ emergency)
7. **CEO phải chuyển focus** — từ bán service sang build product vision, hire sales cho service arm

### 2.4 Business Model Canvas — Mục Tiêu (Year 3)

**Workshop Activity 3:** Cùng thiết kế canvas mục tiêu

```
┌──────────────────┬──────────────────┬──────────────────┐
│ KEY PARTNERS     │ KEY ACTIVITIES   │ VALUE PROPOSITION│
│                  │                  │                  │
│ • Channel partner│ • SERVICE: Custom│ • SERVICE: "Đối │
│   bán product    │   dev trong      │   tác tech hiểu │
│ • Industry       │   domain chọn   │   sâu [domain]" │
│   partners trong │ • PRODUCT: Build │                  │
│   domain chọn   │   & scale sản    │ • PRODUCT: "Giải │
│ • Tech partners  │   phẩm riêng    │   pháp [domain]  │
│   (cloud, API)   │ • Sales & Mktg   │   sẵn dùng,     │
│                  │   cho cả 2 arm  │   proven"        │
│                  │                  │                  │
├──────────────────┼──────────────────┼──────────────────┤
│ KEY RESOURCES    │                  │ CUSTOMER         │
│                  │                  │ RELATIONSHIPS    │
│ • Domain experts │                  │                  │
│ • Product IP     │                  │ • SERVICE: Long- │
│ • Reusable       │                  │   term partner   │
│   platform/      │                  │ • PRODUCT: Self- │
│   components    │                  │   serve + support│
│ • Sales team     │                  │ • Community /    │
│   (không chỉ    │                  │   user group     │
│   CEO)          │                  │                  │
│                  │                  │                  │
├──────────────────┴──────────────────┼──────────────────┤
│ COST STRUCTURE                      │ REVENUE STREAMS  │
│                                     │                  │
│ • Lương (giảm tỷ trọng xuống 60%) │ • Service fees   │
│ • R&D investment (15-20%)          │   (~70% → 50%)  │
│ • Sales & Marketing (10-15%)       │ • Product license│
│ • Cloud/Infra cho product           │   / SaaS (~30%) │
│                                     │ • Maintenance &  │
│                                     │   support (20%)  │
└─────────────────────────────────────┴──────────────────┘
```

---

## Phần 3: Đánh Giá Sản Phẩm — Chọn "Product Bet" Đầu Tiên

### 3.1 Product Spin-off Potential Assessment

**Workshop Activity 4:** Đánh giá từng sản phẩm đã làm

Điểm mỗi tiêu chí từ 1 (thấp) đến 5 (cao):

| Tiêu chí | Trọng số | VB Điện tử (Vietlot) | IPTV Khách sạn | Event/Ticket | CMS/Tòa soạn | [Khác] |
|----------|---------|----------------------|-----------------|-------------|-------------|--------|
| **Market size** — bao nhiêu KH tiềm năng ở VN? | 20% | | | | | |
| **Recurring potential** — KH có trả tiền hàng tháng/năm? | 20% | | | | | |
| **Reusability** — bao nhiêu % code dùng lại cho KH khác? | 15% | | | | | |
| **Competitive gap** — đối thủ hiện tại mạnh không? | 15% | | | | | |
| **Domain expertise** — Dolphin hiểu domain này tới đâu? | 10% | | | | | |
| **Sales channel** — có thể bán mà không qua CEO? | 10% | | | | | |
| **Margin potential** — khách sẵn sàng trả bao nhiêu? | 10% | | | | | |
| **Tổng điểm (weighted)** | 100% | | | | | |

### 3.2 Tiêu Chí Pass/Fail

Trước khi chấm điểm, loại bỏ sản phẩm nào KHÔNG đạt các điều kiện tối thiểu:

```
□ Có ít nhất 20 khách hàng tiềm năng ở Việt Nam?
  → Nếu thị trường quá niche (ví dụ: chỉ Vietlot cần), không spin off được

□ Khách hàng có pain point đủ lớn để trả tiền hàng tháng/năm?
  → Nếu khách chỉ cần build 1 lần rồi thôi, không thành product được

□ Dolphin có thể build MVP trong ≤ 3 tháng với 3-5 người?
  → Nếu cần đầu tư quá lớn ban đầu, rủi ro cao cho công ty nhỏ

□ Có thể bán mà không cần CEO đi gặp từng khách?
  → Nếu vẫn phải rely on relationship selling, chưa phải product
```

### 3.3 Phân Tích Sơ Bộ Từng Sản Phẩm

**Quản lý văn bản điện tử (kiểu Vietlot):**
```
Potential: ★★★☆☆
+ Nhiều tổ chức/doanh nghiệp VN cần (eOffice, document management)
+ Xu hướng chuyển đổi số chính phủ & DN
- Thị trường đã có nhiều đối thủ (VNPT, Viettel Solutions, Base.vn...)
- Cần customize nhiều theo từng tổ chức
? Có thể standardize thành SaaS không?
```

**Hệ thống giải trí khách sạn (IPTV):**
```
Potential: ★★★★☆
+ Thị trường hospitality VN đang tăng mạnh
+ Recurring revenue rõ ràng (monthly subscription per room)
+ Khách sạn ít khi tự build, sẵn sàng mua giải pháp
+ Có thể scale: bán thêm khách sạn mới không cần custom nhiều
- Cần hardware/infra investment
- Đối thủ quốc tế có thể vào (nhưng giá cao hơn)
? Có bao nhiêu khách sạn 3-5 sao ở VN? Bao nhiêu chưa có hệ thống?
```

**Event/Ticket:**
```
Potential: ★★★☆☆
+ Thị trường event VN phát triển
+ Có thể SaaS hóa (self-serve platform)
- Nhiều đối thủ mạnh (Ticketbox, Eventbrite...)
- Seasonal, revenue không đều
? Có niche nào chưa ai phục vụ tốt?
```

**CMS/Tòa soạn điện tử:**
```
Potential: ★★☆☆☆
+ Hiểu domain báo chí
- Thị trường nhỏ (bao nhiêu tòa soạn ở VN?)
- Nhiều CMS miễn phí/giá rẻ (WordPress, Contentful)
- Khó scale ngoài VN
? Có yếu tố nào unique không?
```

⚠️ **Lưu ý:** Đây chỉ là đánh giá sơ bộ dựa trên thông tin hiện có. CEO và team cần validate bằng data thực tế.

### 3.4 Decision Framework: "Invest / Watch / Kill"

**Workshop Activity 5:** Sau khi scoring, plot lên ma trận quyết định

```
    Product-Market Fit Potential (High)
         │
  WATCH  │  INVEST
  (Pilot │  (Đầu tư 15-20%
   nhỏ,  │   resource,
   test   │   build MVP,
   thêm) │   find PMF)
  ───────┼────────────
  KILL   │  WATCH
  (Không │  (Có thế mạnh
   đầu   │   nhưng market
   tư)   │   chưa rõ)
         │
    Dolphin's Competitive Advantage (High) →
```

Chỉ chọn **1 sản phẩm** vào ô INVEST. Đây là "product bet" đầu tiên.

---

## Phần 4: Chuyển Đổi Service Arm — Từ "Nhận Mọi Thứ" Sang "Chọn Lọc"

### 4.1 Service Domain Focus

Khi đã chọn product bet, Service Arm cũng cần focus vào domain liên quan:

```
Ví dụ: Nếu product bet = IPTV Khách sạn

Service Arm nên:
✅ Nhận project hospitality tech (PMS, booking, F&B tech)
✅ Nhận project entertainment/media tech
✅ Nhận project IoT/smart device
⚠️ Cân nhắc project gần domain (retail tech, proptech)
❌ Tránh project không liên quan (logistics, fintech, education...)

Lý do: Mỗi service project trong domain tăng:
• Domain knowledge cho product team
• Relationships với potential product customers
• Reusable components cho product
• Credibility trong industry
```

### 4.2 "IP Harvesting" từ Service Projects

**Quy trình bắt buộc cho mọi service project:**

```
Trước project:
□ Project có trong domain focus không?
□ Components nào có thể reuse cho product?
□ Learnings nào cần capture?

Trong project:
□ Architect với reusability in mind
□ Tách phần generic ra khỏi phần custom
□ Document domain insights

Sau project:
□ Extract reusable components vào shared library
□ Write case study (dùng cho marketing cả service & product)
□ Update product roadmap nếu có insights mới
□ Debrief: domain knowledge nào team đã learn?
```

### 4.3 Giải Quyết Vấn Đề "CEO = Sales"

**Transition Plan cho Sales:**

```
Phase 1 (0-6 tháng): CEO vẫn lead, nhưng bắt đầu xây
├── CEO document quy trình sales hiện tại
├── CEO giới thiệu key relationships cho 1 sales hire
├── Tuyển 1 BD/Account Manager
├── Xây dựng sales collateral (portfolio, case studies)
└── CEO bắt đầu dành 20% thời gian cho product vision

Phase 2 (6-12 tháng): Chuyển dần
├── BD Manager tự handle 30-50% pipeline
├── CEO focus vào strategic deals + product direction
├── Bắt đầu inbound marketing (content, SEO trong domain)
├── Xây relationships với industry partners
└── CEO dành 40% thời gian cho product

Phase 3 (12-24 tháng): CEO = Chief Product Officer
├── BD Manager + team handle 80%+ service sales
├── CEO lead product strategy & vision
├── Product có own sales channel (website, self-serve)
├── CEO chỉ involve trong strategic/large service deals
└── CEO dành 60%+ thời gian cho product
```

---

## Phần 5: Financial Model & Milestones

### 5.1 Financial Planning cho Hybrid Model

**Workshop Activity 6:** Ước tính financial model

```
HIỆN TẠI:
Revenue: ___ tỷ VND/năm
Gross Margin: ___%
Team: ~50 người
Revenue per head: ___ triệu VND/tháng
Recurring revenue: ___%

YEAR 1 TARGET:
Service revenue: ___ tỷ (duy trì hoặc tăng nhẹ)
Product investment: ___ tỷ (từ margin service)
Product revenue: ___ triệu (bắt đầu từ rất nhỏ)
Team allocation: 42 service / 5 product / 3 shared
Burn rate cho product team: ~___ triệu/tháng

YEAR 3 TARGET:
Service revenue: ___ tỷ
Product revenue: ___ tỷ (target 30% tổng)
Blended margin: ___% (target tăng 10pp so với hiện tại)
Team: __ service / __ product / __ shared
```

### 5.2 "Runway Thinking" — Bao Lâu Dolphin Có Thể Fund Product?

```
Product Team Cost / tháng = Số người × Avg salary × 1.3 (overhead)
Ví dụ: 5 người × 25 triệu × 1.3 = ~162 triệu/tháng

Service Arm monthly profit cần ≥ Product Team Cost + buffer 20%
→ Service cần generate ≥ 195 triệu profit/tháng để fund product

Nếu Service margin = 25% → cần Service revenue ≥ 780 triệu/tháng
Nếu Service margin = 30% → cần Service revenue ≥ 650 triệu/tháng

Runway = (Cash reserves + Projected service profit) / Product burn rate
Target: Runway ≥ 12 tháng trước khi product cần self-sustain
```

### 5.3 Key Milestones & Go/No-Go Gates

| Milestone | Timeline | Go/No-Go Criteria |
|-----------|----------|-------------------|
| **Product bet selected** | Month 0 | Leadership aligned, ICP defined |
| **MVP built** | Month 3 | Core features working, usable |
| **First 3 pilots** | Month 6 | 3 khách dùng thử, có feedback |
| **First paying customer** | Month 9 | ≥ 1 khách trả tiền (không phải miễn phí) |
| **Product-Market Fit signal** | Month 12 | ≥ 5 paying customers, NPS > 30, churn < 10%/month |
| **BU viability** | Month 18 | Revenue cover ≥ 50% product team cost |
| **BU independent** | Month 24-36 | Product BU profitable, own P&L |

**Go/No-Go tại Month 12:**
```
GO nếu:
✅ ≥ 5 paying customers
✅ Positive NPS (customers recommend)
✅ Monthly churn < 10%
✅ Clear path to cover product team cost in 12 months
✅ Service arm vẫn healthy

NO-GO nếu:
❌ < 3 paying customers sau 12 tháng
❌ Khách pilot churn hết
❌ Service arm bị ảnh hưởng nghiêm trọng
❌ No clear differentiation vs competitors

→ Nếu NO-GO: Kill product bet, harvest learnings, chọn bet mới
```

---

## Phần 6: Rủi Ro & Cách Giảm Thiểu

### 6.1 Top Risks

| Risk | Xác suất | Impact | Mitigation |
|------|---------|--------|------------|
| Service revenue giảm khi CEO focus sang product | Cao | Cao | Tuyển BD Manager sớm, CEO chuyển dần |
| Product không tìm được PMF | Trung bình | Cao | Lean approach, pilot sớm, kill fast rule |
| Team bị kéo qua lại giữa service & product | Cao | Trung bình | Tách team rõ ràng, không share developer |
| Cash flow đứt khi cả 2 arm chưa stable | Trung bình | Rất cao | Runway ≥ 12 tháng, never invest > service profit |
| CEO không buông được service sales | Cao | Cao | Coaching, milestones rõ ràng, accountability |
| Chọn sai product bet | Trung bình | Trung bình | Data-driven selection, 6-month gate |

### 6.2 "Golden Rules" Cho Quá Trình Chuyển Đổi

```
1. KHÔNG BAO GIỜ đầu tư vào product nhiều hơn monthly profit của service
2. KHÔNG BAO GIỜ pull product developers sang service project (ngoại trừ 
   emergency có thể mất khách hàng lớn)
3. LUÔN có 6 tháng runway cho product team
4. KILL product bet nếu không đạt Go/No-Go gate
5. CEO PHẢI có succession plan cho sales trong 12 tháng đầu
```

---

## Phần 7: Case Studies — Công Ty Nhỏ VN Chuyển Từ Service Sang Product

### Case Study 1: Base.vn
- **Từ:** Agency làm web/app theo đơn
- **Sang:** Platform quản trị doanh nghiệp (SaaS)
- **Cách làm:** Nhận ra nhiều khách cần cùng loại tool → productize → SaaS
- **Kết quả:** Trở thành 1 trong top workplace platform VN
- **Bài học:** Quan sát pattern từ service projects → tìm common need

### Case Study 2: Palexy (Analytics cho retail)
- **Từ:** Làm project AI/analytics cho retailers
- **Sang:** SaaS platform phân tích hành vi khách hàng trong store
- **Cách làm:** 1 project thành công → standardize → bán cho retailers khác
- **Bài học:** 1 custom project có thể trở thành product nếu market đủ lớn

### Case Study 3: KMS Technology → QASymphony
- **Từ:** Outsourcing company
- **Sang:** Build QASymphony (test management platform) song song
- **Cách làm:** Service fund product, tách BU riêng, cuối cùng sell cho Tricentis
- **Bài học:** Hybrid model works, nhưng cần tách biệt rõ ràng

---

## Deliverables Sau Module 1

| # | Deliverable | Owner | Status |
|---|------------|-------|--------|
| 1 | Bài chẩn đoán 10 câu (completed) | Leadership | □ |
| 2 | Business Model Canvas — Hiện tại (completed) | CEO + Team | □ |
| 3 | Product Spin-off Assessment (scored) | CEO + PM | □ |
| 4 | Product bet đầu tiên được chọn | CEO | □ |
| 5 | Service domain focus xác định | CEO + BD | □ |
| 6 | Financial model & runway calculation | CEO + Finance | □ |
| 7 | CEO transition plan (sales → product) | CEO | □ |
| 8 | Business Model Canvas — Mục tiêu Year 3 | Leadership | □ |
| 9 | Go/No-Go milestones agreed | Leadership | □ |

---

## Kết Nối Sang Module 2

Khi đã có:
- ✅ Product bet được chọn
- ✅ Service domain focus xác định
- ✅ Hybrid model agreed

→ Module 2 sẽ thiết kế chi tiết:
- Portfolio service nào giữ, bỏ, phát triển thêm (align với domain focus)
- Product roadmap và MVP scope cho product bet
- Pricing strategy cho cả service (nâng margin) và product (SaaS/subscription)
