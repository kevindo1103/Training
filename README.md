# Dolphin Technology — Training Portal

## Dự án là gì?

Interactive training portal cho Dolphin Technology (~50 người, công ty phần mềm VN) đang chuyển đổi từ **"xưởng code theo đơn đặt hàng"** sang **"công ty có sản phẩm riêng"** (Service-Funded Product Company).

Portal phục vụ chương trình đào tạo 5 module cho leadership team (CEO, CTO, PM, BD). Mỗi module có workshop activities mà participant tự hoàn thành trước buổi workshop (pre-class), facilitator sau đó tổng hợp & so sánh kết quả.

## Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────┐
│                   TRAINING PORTAL                       │
│                                                         │
│  ┌──────────────────┐     ┌──────────────────────────┐  │
│  │  Participant UI  │     │   Facilitator Dashboard   │  │
│  │  (mobile-first)  │     │     (desktop-first)       │  │
│  │                  │     │                           │  │
│  │  • Self-serve    │     │  • Gap analysis           │  │
│  │  • Pre-class     │     │  • Response comparison    │  │
│  │  • Per-field     │     │  • Aggregate scores       │  │
│  │    guidance      │     │  • Export reports          │  │
│  └────────┬─────────┘     └─────────┬─────────────────┘  │
│           │                         │                    │
│           └────────┬────────────────┘                    │
│                    ▼                                     │
│          ┌─────────────────┐                             │
│          │  2-Layer Engine  │                             │
│          │                 │                             │
│          │  Shell (reusable)│ ← Activity renderer,       │
│          │  + Config JSON  │   session mgmt, data store  │
│          │  (per module)   │                             │
│          └─────────────────┘                             │
└─────────────────────────────────────────────────────────┘
```

**2-Layer Architecture:**
- **Shell** — Reusable platform: session management, activity renderer, data collector, dashboard. Xây 1 lần, dùng cho tất cả modules.
- **Config JSON** — Nội dung riêng cho mỗi module: câu hỏi, tiêu chí, sản phẩm, scoring weights. Thay config = thay workshop.

**3 loại Activity Type (MVP):**
- `survey` — Câu hỏi + thang điểm 1-5 (dùng cho Diagnostic)
- `matrix` — Items × Criteria với trọng số (dùng cho Product Scoring)
- `form` — Text/number inputs (dùng cho BMC, Financial Model)

## Module 1 — Tái cấu trúc Mô hình Kinh doanh (đang build)

6 activities theo thứ tự:

| # | Activity | Type | Mô tả |
|---|----------|------|-------|
| 1 | Chẩn đoán mô hình hiện tại | `survey` | 10 câu diagnostic, thang 1-5. Tổng 0-50, threshold: ≤15 ổn / 16-30 cần chuyển đổi / 31-50 khẩn cấp |
| 2 | BMC hiện tại | `form` | 9 ô Business Model Canvas + 4 câu thảo luận. Điền theo THỰC TẾ |
| 3 | BMC mục tiêu Year 3 | `form` | 9 ô BMC target + Resource Allocation Roadmap (85:15 → 70:30 → 50:50) |
| 4 | Product Scoring Matrix | `matrix` | 4 sản phẩm × 7 tiêu chí có trọng số. Auto-rank |
| 5 | Invest / Watch / Kill | `form` | Phân loại 4 sản phẩm. Constraint: chỉ INVEST 1 sản phẩm |
| 6 | Financial Model | `form` | Input tài chính hiện tại + Year 1 + Year 3 targets. Auto-compute profit, budget, runway |

**4 sản phẩm được đánh giá:**
- VB Điện tử (Vietlot) — Document management
- IPTV Khách sạn — Hospitality entertainment system
- Event/Ticket — Event management platform
- CMS/Tòa soạn — Digital newsroom CMS

**7 tiêu chí scoring (có trọng số):**
Market size (20%), Recurring potential (20%), Reusability (15%), Competitive gap (15%), Domain expertise (10%), Sales không qua CEO (10%), Margin potential (10%)

## Cấu trúc thư mục

```
Training/
├── README.md                          ← File này
├── CLAUDE.md                          ← Project instructions cho AI assistant
├── 00_PROJECT_OVERVIEW.md             ← Tổng quan chương trình 5 modules
│
├── 01_Business_Model/
│   └── MODULE_01_Business_Model.md    ← Content source (đã Dolphin-specific)
├── 02_Product_Service_Portfolio/
│   └── MODULE_02_Portfolio.md
├── 03_Business_Development/
│   └── MODULE_03_BD_Framework.md
├── 04_Organization_Operation/
│   └── MODULE_04_Org_Ops.md
├── 05_Product_Development_Lifecycle/
│   └── MODULE_05_PDLC.md
│
├── design_v2/                         ← Design system + UI mockups (latest)
│   ├── DESIGN.md                      ← Design tokens, typography, layout specs
│   ├── 01_welcome_intro.html          ← Welcome / hero screen
│   ├── 02_diagnostic_assessment.html  ← Activity 1: Diagnostic survey
│   ├── 03_target_canvas_resource_allocation.html  ← Activity 3: Target BMC
│   ├── 04_product_scoring_matrix.html ← Activity 4: Product scoring
│   └── 05_portfolio_decision_financial.html       ← Activities 5-6
│
├── design_system.html                 ← Design system v1 (reference only)
└── module1_participant_mockup.html    ← Participant flow mockup v1 (reference)
```

## Design System

Design spec nằm ở `design_v2/DESIGN.md`. Key decisions:

- **Fonts:** Manrope (headlines) + Hanken Grotesk (body/UI)
- **Colors:** MD3-inspired token system. Primary teal `#00685f`, surface `#F5F5F4`
- **Layout:** Desktop sidebar + 1100px learning column. Mobile: sidebar collapse, single column
- **Framework:** Tailwind CSS
- **Style:** Corporate Modern / Minimalist — expansive whitespace, soft shadows, tonal layers

⚠️ **Lưu ý cho dev:** Nội dung trong 5 HTML mockups (design_v2/) là PLACEHOLDER — nhiều chỗ sai so với tài liệu gốc. Khi code, phải lấy content từ `01_Business_Model/MODULE_01_Business_Model.md`, không copy từ mockup HTML. Cụ thể:
- 10 câu diagnostic trong mockup sai hoàn toàn (dùng câu generic thay vì câu Dolphin-specific)
- Resource Allocation Roadmap: mockup ghi Year 3 = 20:80, đúng là 50:50
- Sidebar hiển thị "6 Phases" — sai, phải là "6 Activities" của Module 1
- Một số screen dùng tên "Product Alpha/Beta/Gamma" thay vì tên thật

## Tech Stack (đề xuất)

- **Frontend:** HTML/CSS/JS standalone hoặc lightweight framework
- **Styling:** Tailwind CSS (theo design_v2)
- **Data persistence:** localStorage (MVP) → backend API (production)
- **Deployment:** Static hosting (Vercel/Netlify/GitHub Pages)

## Yêu cầu UX quan trọng

1. **Self-serve** — Participant mở link và tự hoàn thành, không cần facilitator hướng dẫn
2. **Per-field micro-guidance** — Mỗi input field có: label, explanation, Dolphin-specific placeholder, helper text
3. **Auto-save** — localStorage với debounce, toast "Đã lưu"
4. **Mobile-first** — Participant chủ yếu làm trên điện thoại
5. **Dark/light mode** — Auto-detect via `prefers-color-scheme`
6. **Intro per activity** — Mỗi activity có màn intro: mục đích, cách làm, ví dụ, thời gian ước tính
7. **Progress indicator** — Hiển thị rõ đang ở activity nào / tổng bao nhiêu
