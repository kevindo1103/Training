# Module 2: Tái Cấu Trúc Product/Service Portfolio

## Mục Tiêu Module

Đánh giá toàn bộ portfolio hiện tại, xác định dịch vụ/sản phẩm nào nên giữ-phát triển-loại bỏ, và thiết kế portfolio mới align với mô hình kinh doanh đã xác định ở Module 1.

---

## Phần 1: Mapping Portfolio Hiện Tại

### 1.1 Service/Product Inventory

**Workshop Activity 1:** Liệt kê tất cả dịch vụ/sản phẩm hiện tại

Cho mỗi item, thu thập:

| Thông tin | Mô tả |
|-----------|-------|
| Tên dịch vụ/sản phẩm | |
| Mô tả ngắn | Làm gì, cho ai |
| Revenue contribution | % tổng doanh thu |
| Gross margin | % |
| Số khách hàng | |
| Growth trend | Tăng / Ổn định / Giảm |
| Headcount allocated | |
| Competitive position | Mạnh / Trung bình / Yếu |
| Strategic fit (vs Module 1) | Cao / Trung bình / Thấp |

### 1.2 Portfolio Classification

Phân loại dịch vụ theo **Service Typology cho IT Company:**

```
┌─────────────────────────────────────────────────┐
│ CORE SERVICES (Doanh thu chính)                 │
│ • Custom Software Development                    │
│ • Staff Augmentation                             │
│ • System Integration                             │
│ • Maintenance & Support                          │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ VALUE-ADD SERVICES (Margin cao hơn)             │
│ • Consulting & Advisory                          │
│ • Architecture & Design                          │
│ • Quality Assurance / Testing-as-a-Service       │
│ • Cloud Migration & DevOps                       │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ EMERGING / PRODUCT (Future growth)              │
│ • SaaS Products                                  │
│ • IP / Reusable Components                       │
│ • AI/ML Solutions                                │
│ • Industry-specific Platforms                    │
└─────────────────────────────────────────────────┘
```

---

## Phần 2: Phân Tích Portfolio

### 2.1 BCG Matrix cho Services

**Workshop Activity 2:** Plot từng dịch vụ lên BCG Matrix

```
           Market Growth (High)
                  │
    QUESTION      │     STARS
    MARKS         │
    ──────────────┼──────────────
    DOGS          │     CASH
                  │     COWS
                  │
           Market Growth (Low)
                  
    Relative Market Share →
    (Low)                    (High)
```

**Hướng dẫn đánh giá:**
- **Stars:** Revenue tăng nhanh, market position mạnh → Đầu tư thêm
- **Cash Cows:** Revenue ổn định, margin tốt → Duy trì, optimize
- **Question Marks:** Thị trường hấp dẫn nhưng chưa có position → Quyết định đầu tư hoặc bỏ
- **Dogs:** Revenue giảm, position yếu → Cân nhắc loại bỏ

### 2.2 GE/McKinsey Matrix (Chi tiết hơn BCG)

**Workshop Activity 3:** Đánh giá từng service/product theo 2 trục

**Trục 1: Industry Attractiveness (1-5)**
- Market size & growth rate
- Competitive intensity
- Margin potential
- Technology stability
- Entry barriers

**Trục 2: Competitive Strength (1-5)**
- Market share / position
- Brand & reputation in segment
- Technical capability
- Cost structure
- Customer relationships

```
         Industry Attractiveness
         High    Medium    Low
        ┌────────┬────────┬────────┐
High    │INVEST  │INVEST  │PROTECT │
        │/GROW   │/GROW   │        │  Competitive
        ├────────┼────────┼────────┤  Strength
Medium  │INVEST  │SELECTIVE│HARVEST │
        │/GROW   │        │        │
        ├────────┼────────┼────────┤
Low     │SELECTIVE│HARVEST│DIVEST  │
        │        │        │        │
        └────────┴────────┴────────┘
```

### 2.3 Margin-Revenue Analysis

**Workshop Activity 4:** Plot services trên Revenue vs Margin chart

```
    Gross Margin (%)
    50% ┤
        │   ○ Consulting    ○ AI/ML Solutions
    40% ┤
        │
    30% ┤       ○ Managed Services
        │
    20% ┤   ○ Project Dev        ○ Staff Aug (large vol)
        │
    10% ┤
        │
     0% ┼────────────────────────────────────
        0    5M   10M   15M   20M   25M   30M
                    Revenue (VND)
                    
    Bubble size = Headcount
```

Mục tiêu: Di chuyển portfolio lên-trên-phải (higher margin, higher revenue).

---

## Phần 3: Thiết Kế Portfolio Mới

### 3.1 Portfolio Strategy Framework

**Tiếp cận "Three Horizons":**

```
Horizon 1: Optimize & Defend (Now)
├── Tối ưu service hiện tại đang profitable
├── Loại bỏ/merge services không hiệu quả
├── Tăng margin qua automation, reuse, process improvement
└── Timeline: 0-12 tháng

Horizon 2: Build & Grow (Next)
├── Phát triển value-add services mới
├── Thêm domain expertise vào offerings
├── Pilot outcome-based service models
└── Timeline: 6-24 tháng

Horizon 3: Create & Incubate (Future)
├── R&D sản phẩm/platform riêng
├── Explore new business models (SaaS, platform)
├── Build IP portfolio
└── Timeline: 12-36 tháng
```

### 3.2 Service Design Canvas (cho mỗi dịch vụ mới)

Cho mỗi dịch vụ/sản phẩm mới trong portfolio, thiết kế:

```
┌─────────────────────────────────────────────────────┐
│ SERVICE NAME: _____________________________          │
├──────────────────────┬──────────────────────────────┤
│ Target Customer      │ Value Proposition            │
│ • Segment:           │ • Problem solved:            │
│ • Industry:          │ • Key differentiator:        │
│ • Size:              │ • Why Dolphin?               │
│ • Geography:         │                              │
├──────────────────────┼──────────────────────────────┤
│ Delivery Model       │ Revenue Model                │
│ • Onshore/Offshore:  │ • Pricing: T&M/Fixed/Sub?    │
│ • Team size:         │ • Target margin:             │
│ • Duration:          │ • Revenue potential (Y1/Y3): │
│ • Tools/Platform:    │ • Upsell path:               │
├──────────────────────┼──────────────────────────────┤
│ Required Capabilities│ Go-to-Market                 │
│ • Skills needed:     │ • Sales channel:             │
│ • Tools/Tech:        │ • Marketing approach:        │
│ • Certification:     │ • First target customers:    │
│ • Training needs:    │ • Partnership needed?        │
├──────────────────────┴──────────────────────────────┤
│ Dependencies & Risks                                 │
│ • Investment needed:                                 │
│ • Key risks:                                        │
│ • Dependencies on other services:                   │
└─────────────────────────────────────────────────────┘
```

### 3.3 Portfolio Rationalization Decisions

**Workshop Activity 5:** Quyết định cho từng service/product hiện tại

| Service | Decision | Action | Timeline | Owner |
|---------|----------|--------|----------|-------|
| Service A | **INVEST** | Tăng team, thêm domain focus | Q1-Q2 | |
| Service B | **MAINTAIN** | Giữ nguyên, optimize margin | Ongoing | |
| Service C | **TRANSFORM** | Đổi delivery model, thêm IP | Q2-Q4 | |
| Service D | **HARVEST** | Giảm dần đầu tư, maximize cash | Q1-Q3 | |
| Service E | **SUNSET** | Phase out trong 6 tháng | Q3-Q4 | |

---

## Phần 4: Pricing Strategy

### 4.1 Pricing Models cho IT Services

| Model | Mô tả | Phù hợp khi | Margin tiềm năng |
|-------|--------|-------------|------------------|
| **Time & Material** | Charge theo giờ/ngày | Scope không rõ, khách muốn flexible | 20-30% |
| **Fixed Price** | Giá cố định cho project | Scope rõ ràng, Dolphin có kinh nghiệm | 25-40% |
| **Retainer** | Phí cố định hàng tháng | Ongoing support, team dedication | 25-35% |
| **Managed Service** | SLA-based, outcome defined | Mature service, predictable delivery | 30-45% |
| **Value-based** | Pricing theo giá trị business | Consulting, unique IP, high expertise | 40-60% |
| **Revenue Share** | % revenue của khách hàng | Co-creation, product partnership | Variable (high risk/reward) |
| **Subscription** | SaaS pricing cho products | Sản phẩm riêng | 60-80% |

### 4.2 Pricing Migration Path

```
Current State:        Target State (3 năm):
T&M: 70%            → T&M: 30%
Fixed Price: 25%     → Fixed Price: 20%
Other: 5%            → Managed/Value: 30%
                     → Subscription/Product: 20%
```

---

## Phần 5: Portfolio Roadmap

### 5.1 90-Day Quick Wins
1. Xác định 2-3 services có thể tăng margin ngay (automation, reuse)
2. Merge/eliminate overlapping services
3. Create service catalog chuẩn hóa
4. Define pricing tiers cho top services

### 5.2 Year 1 Targets
1. Launch 1-2 value-add services mới
2. Pilot outcome-based pricing với 1 khách hàng
3. Begin IP development cho 1 domain focus
4. Giảm customer concentration (top 3 < 50%)

### 5.3 Year 3 Vision
1. Product/IP revenue ≥ 20% tổng doanh thu
2. Average margin tăng 10+ percentage points
3. Clear positioning trong 2 industry verticals
4. Reusable platform/components cho 3+ clients

---

## Deliverables Sau Module 2

1. ✅ Service/Product Inventory hoàn chỉnh
2. ✅ BCG/GE Matrix cho portfolio hiện tại
3. ✅ Portfolio Rationalization decisions
4. ✅ Service Design Canvas cho mỗi service mới
5. ✅ Pricing strategy và migration plan
6. ✅ Portfolio Roadmap (90 days / Year 1 / Year 3)

---

## Kết Nối Sang Module 3

Portfolio mới sẽ là input cho Module 3 để xây dựng:
- BD strategy cho từng service/product
- Target customer profiles
- Sales process và channels phù hợp với từng offering
