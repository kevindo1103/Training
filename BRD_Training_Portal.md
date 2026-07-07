# Business Requirements Document (BRD)
# Dolphin Technology Training Portal

**Version:** 1.0  
**Ngày:** 07/07/2026  
**Author:** Kevin Do — Product Manager  
**Audience:** Product & Dev team, Content team  
**Status:** Draft

---

## 1. Executive summary

Dolphin Technology (~50 người, VN) đang chuyển đổi từ custom software studio sang **Service-Funded Product Company**. Để hỗ trợ quá trình này, công ty cần một chương trình đào tạo 5 module cho leadership team (CEO, CTO, PM, BD).

**Training Portal** là công cụ interactive cho phép participant tự hoàn thành workshop activities trước buổi đào tạo (pre-class), và facilitator tổng hợp kết quả để dẫn dắt workshop hiệu quả hơn.

Project chia làm **2 workstream độc lập**:

| Workstream | Owner | Deliverable |
|---|---|---|
| **WS1 — Product & Dev** | Dev team | Web portal (participant UI + facilitator dashboard) |
| **WS2 — Content** | Content team | Nội dung đào tạo 5 modules (câu hỏi, framework, case study) |

**Phasing:** MVP ship Module 1 trước → mở rộng Module 2–5 sau khi validate.

---

## 2. Problem statement

### Vấn đề hiện tại

Chương trình đào tạo Dolphin hiện chạy offline — facilitator trình bày, leadership team thảo luận tại chỗ. Cách này có 3 vấn đề:

1. **Không có pre-work** — Participant đến workshop mà chưa suy nghĩ trước, thảo luận bề mặt, không đi sâu được.
2. **Facilitator không có data** — Không biết trước participant nghĩ gì, không thể chuẩn bị gap analysis hay so sánh quan điểm.
3. **Kết quả không lưu trữ** — Sau workshop, insight bị mất, không track được tiến trình qua các module.

### Bài toán cần giải

> Làm sao để leadership team tự chuẩn bị sâu trước workshop, facilitator có data để dẫn dắt thảo luận có chất lượng, và kết quả được lưu trữ có hệ thống?

---

## 3. Product vision

**For** leadership team của Dolphin Technology  
**Who** cần hoàn thành workshop activities trước buổi đào tạo  
**The** Training Portal **is a** web-based interactive assessment tool  
**That** cho phép participant tự điền survey, canvas, scoring matrix và financial model trên điện thoại; facilitator xem tổng hợp kết quả trên dashboard  
**Unlike** Google Forms hoặc slide deck truyền thống  
**Our product** cung cấp micro-guidance cho từng field, auto-save, tự động tính toán scoring/financial, và gap analysis giữa các participant.

---

## 4. Users & stakeholders

### 4.1 Primary users

| User | Mô tả | Device | Frequency |
|---|---|---|---|
| **Participant** | Leadership team Dolphin (CEO, CTO, PM, BD). ~4–8 người/session. Không có tech background. | Mobile (chính), laptop (phụ) | 1 lần/module, tự làm trước workshop |
| **Facilitator** | Người dẫn workshop. Cần xem tổng hợp kết quả trước buổi. | Desktop/laptop | Trước và trong workshop |

### 4.2 Stakeholders

| Stakeholder | Interest |
|---|---|
| CEO Dolphin | Approve chương trình, tham gia với tư cách participant |
| Kevin (PM) | Product owner, define requirements, QA content |
| Dev team | Build portal |
| Content team | Viết nội dung module |

---

## 5. Scope & phasing

### Phase 1 — MVP (Module 1 only)

**Goal:** Ship Module 1 "Tái cấu trúc Mô hình Kinh doanh", validate flow với real users, thu thập feedback.

**In-scope:**
- Participant UI — 6 activities, mobile-first, self-serve
- Facilitator dashboard — view aggregate results, gap analysis
- Auto-save (localStorage)
- Dark/light mode
- Static hosting (no backend)

**Out-of-scope (Phase 1):**
- Module 2–5 content
- User authentication / login
- Backend API / database
- Multi-session tracking
- Export to PDF/Excel
- Notification system
- Admin panel

### Phase 2 — Expand (Module 2–5)

**Goal:** Swap config JSON cho từng module, không thay đổi shell code.

**In-scope:**
- Config JSON cho Module 2 (Portfolio), 3 (BD Framework), 4 (Org & Ops), 5 (PDLC)
- Cross-module progress tracking
- Backend API + database (thay localStorage)
- User authentication (simple, có thể dùng invite link + code)
- Export reports (PDF/Excel)

### Phase 3 — Scale (future)

**Goal:** Mở rộng ngoài Dolphin nếu model thành công.

**In-scope:**
- Multi-tenant (nhiều công ty dùng chung portal)
- Custom branding per tenant
- Admin panel tạo/quản lý module
- Analytics dashboard

---

## 6. Workstream 1 — Product & Dev

### 6.1 Architecture

**2-Layer Architecture:**

```
┌─────────────────────────────────────────┐
│              Training Portal            │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │            SHELL                │   │
│   │  (build 1 lần, dùng cho 5 modules)  │
│   │                                 │   │
│   │  • Session management           │   │
│   │  • Activity renderer            │   │
│   │  • Data collector & storage     │   │
│   │  • Navigation & progress        │   │
│   │  • Facilitator dashboard        │   │
│   └──────────────┬──────────────────┘   │
│                  │ loads                 │
│   ┌──────────────▼──────────────────┐   │
│   │         CONFIG JSON             │   │
│   │  (swap = swap workshop)         │   │
│   │                                 │   │
│   │  • Questions & labels           │   │
│   │  • Scoring criteria & weights   │   │
│   │  • Products list                │   │
│   │  • Thresholds & rules           │   │
│   │  • Intro content per activity   │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Lý do chọn architecture này:** Module 2–5 có cùng activity types (survey, form, matrix). Shell render activity theo type, config JSON cung cấp nội dung. Thêm module = thêm 1 file config, không sửa shell.

### 6.2 Tech stack

| Layer | Technology | Lý do |
|---|---|---|
| Frontend | HTML/CSS/JS (vanilla) | Lightweight, no build step, dễ deploy static |
| Styling | Tailwind CSS | Consistent với design system, utility-first |
| Data (Phase 1) | localStorage | MVP, không cần backend |
| Data (Phase 2) | Backend API + DB | Multi-user, persistent |
| Hosting | Vercel / Netlify / GitHub Pages | Free tier, auto-deploy from git |
| Fonts | Google Fonts (Manrope + Hanken Grotesk) | Theo design system |

### 6.3 Three activity types

Shell cần render 3 loại activity. Mỗi loại có behavior riêng:

**Type 1: `survey`**
- Input: Câu hỏi + thang điểm 1–5 (pill selector)
- Output: Tổng điểm, phân loại theo threshold
- Dùng cho: Activity 1 (Diagnostic)
- Auto-compute: tổng điểm + threshold band

**Type 2: `form`**
- Input: Mix text area, number input, text input
- Output: Dữ liệu dạng key-value
- Dùng cho: Activity 2 (BMC hiện tại), Activity 3 (BMC mục tiêu), Activity 5 (Invest/Watch/Kill), Activity 6 (Financial Model)
- Auto-compute: Financial Model cần auto-calculate profit, budget, runway

**Type 3: `matrix`**
- Input: Items (rows) × Criteria (columns), mỗi ô chấm 1–5
- Output: Weighted score per item, auto-rank
- Dùng cho: Activity 4 (Product Scoring Matrix)
- Auto-compute: weighted score = Σ(score × weight), sort descending

### 6.4 Module 1 — functional requirements

#### 6.4.1 Participant UI

**FR-01: Activity flow**
- 6 activities theo thứ tự cố định
- Mỗi activity có 2 screens: Intro → Do
- Intro screen hiển thị: mục đích, cách làm, ví dụ cụ thể (Dolphin-specific), thời gian ước tính
- Sidebar hiển thị "6 Activities" (KHÔNG phải "6 Phases" hay "6 Steps")
- Progress indicator: hiển thị rõ đang ở activity nào / tổng 6

**FR-02: Activity 1 — Chẩn đoán mô hình hiện tại** (`survey`)
- 10 câu hỏi (nội dung lấy từ MODULE_01_Business_Model.md §1.2)
- Thang điểm 1–5 cho mỗi câu
- Auto-compute tổng (range 0–50)
- Hiển thị kết quả với threshold:
  - 0–15: "Tình hình chưa nghiêm trọng" (green)
  - 16–30: "Cần chuyển đổi có kế hoạch" (amber)
  - 31–50: "Cần chuyển đổi khẩn cấp" (red)

**FR-03: Activity 2 — BMC hiện tại** (`form`)
- 9 ô Business Model Canvas (Key Partners, Key Activities, Value Proposition, Key Resources, Customer Relationships, Channels, Customer Segments, Cost Structure, Revenue Streams)
- 4 câu hỏi thảo luận (text area)
- Participant điền theo THỰC TẾ hiện tại của Dolphin
- Mỗi ô có placeholder Dolphin-specific (ví dụ: Key Partners → "Khách hàng giới thiệu bởi CEO, đối tác tech...")

**FR-04: Activity 3 — BMC mục tiêu Year 3** (`form`)
- 9 ô BMC target (cùng layout với Activity 2, nhưng điền MỤC TIÊU)
- Resource Allocation Roadmap:
  - Year 1: Service **85%** / Product **15%**
  - Year 2: Service **70%** / Product **30%**
  - Year 3: Service **50%** / Product **50%**
- Roadmap hiển thị dạng visual (bar hoặc slider), read-only hoặc interactive

**FR-05: Activity 4 — Product Scoring Matrix** (`matrix`)
- 4 sản phẩm (rows):
  1. VB Điện tử (Vietlot)
  2. IPTV Khách sạn
  3. Event/Ticket
  4. CMS/Tòa soạn
- 7 tiêu chí (columns) với trọng số:
  1. Market size — 20%
  2. Recurring potential — 20%
  3. Reusability — 15%
  4. Competitive gap — 15%
  5. Domain expertise — 10%
  6. Sales không qua CEO — 10%
  7. Margin potential — 10%
- Mỗi ô chấm 1–5
- Auto-compute weighted score per product
- Auto-rank (hiển thị thứ tự từ cao → thấp)

**FR-06: Activity 5 — Invest / Watch / Kill** (`form`)
- Phân loại 4 sản phẩm vào 3 category: INVEST, WATCH, KILL
- **Constraint:** Chỉ được chọn **1** sản phẩm INVEST
- UI enforce constraint (nếu chọn 2 INVEST → warning/block)
- Mỗi quyết định kèm text area giải thích lý do

**FR-07: Activity 6 — Financial Model** (`form`)
- 3 sections: Hiện tại, Year 1 Target, Year 3 Target
- Input fields:
  - Revenue (tỷ VND/năm)
  - Gross margin (%)
  - Team size
  - Revenue per head (triệu VND/tháng)
  - Recurring revenue (%)
  - Service/Product split
  - Product team cost
- Auto-compute:
  - Monthly profit
  - Product team burn rate
  - Runway (tháng)
  - Service revenue cần thiết để fund product

**FR-08: Per-field micro-guidance**
- Mỗi input field PHẢI có:
  - Label (tên field)
  - Explanation (1–2 câu giải thích field này là gì, tại sao quan trọng)
  - Placeholder (Dolphin-specific example, không generic)
  - Helper text (gợi ý cách điền)

**FR-09: Auto-save**
- Save dữ liệu vào localStorage mỗi khi user thay đổi input
- Debounce 500ms–1s
- Visual feedback: toast "Đã lưu" xuất hiện 2s rồi tự ẩn
- Khi reload page → restore toàn bộ dữ liệu đã điền

**FR-10: Navigation**
- Sidebar (desktop) / hamburger menu (mobile) liệt kê 6 activities
- Click activity → jump tới activity đó
- Nút "Tiếp tục" ở cuối mỗi activity → chuyển sang activity tiếp theo
- Nút "Quay lại" → về activity trước
- Cho phép nhảy qua lại tự do (không lock sequence)

**FR-11: Summary screen**
- Sau Activity 6, hiển thị tóm tắt kết quả:
  - Diagnostic score + threshold
  - Product ranking từ scoring matrix
  - Invest/Watch/Kill decisions
  - Key financial numbers

#### 6.4.2 Facilitator dashboard

**FR-12: Data aggregation**
- Import data từ nhiều participant (Phase 1: manual import via JSON/file; Phase 2: auto via API)
- Hiển thị số lượng participant đã hoàn thành

**FR-13: Gap analysis**
- Với Activity 1 (Diagnostic): hiển thị spread giữa participant (ai chấm cao, ai chấm thấp cho cùng câu hỏi)
- Highlight câu hỏi có variance cao → điểm cần thảo luận

**FR-14: Response comparison**
- Với Activity 4 (Product Scoring): so sánh ranking giữa participant
- Highlight sản phẩm có disagreement cao

**FR-15: Aggregate scores**
- Average score per question/product/criteria
- Median và standard deviation

**FR-16: Export (Phase 2)**
- Export report dạng PDF hoặc Excel
- Dữ liệu raw + visualizations

### 6.5 Non-functional requirements

| # | Requirement | Spec |
|---|---|---|
| NFR-01 | Mobile-first | Layout responsive, touch-friendly (min tap target 44px) |
| NFR-02 | Performance | First contentful paint < 2s trên 4G |
| NFR-03 | Offline tolerance | Dữ liệu lưu localStorage, không mất khi mất mạng |
| NFR-04 | Dark/light mode | Auto-detect via `prefers-color-scheme`, manual toggle |
| NFR-05 | Accessibility | WCAG 2.1 AA: contrast ratio, ARIA labels, keyboard navigation |
| NFR-06 | Language | Toàn bộ UI tiếng Việt |
| NFR-07 | Browser support | Chrome, Safari, Firefox (2 versions gần nhất) |
| NFR-08 | No backend (Phase 1) | Static files only, deployable trên GitHub Pages |

### 6.6 Design system

Theo `design_v2/DESIGN.md`. Key specs:

- **Fonts:** Manrope (headlines, weight 600–800) + Hanken Grotesk (body, weight 400–500)
- **Primary color:** `#00685f` (teal)
- **Surface:** `#F5F5F4` (off-white, "premium paper" feel)
- **Layout:** Sidebar + centered 1100px learning column (desktop), single column (mobile)
- **Cards:** White background, border-radius 1rem, shadow `0 4px 20px rgba(0,0,0,0.04)`, min 32px padding
- **Style:** Corporate Modern / Minimalist — expansive whitespace, no heavy borders

### 6.7 File structure (target)

```
portal/
├── index.html                    ← Participant entry point
├── facilitator/
│   └── index.html                ← Facilitator dashboard
├── js/
│   ├── shell.js                  ← Activity renderer, session mgmt, data store
│   └── modules/
│       ├── module1.config.js     ← Config JSON for Module 1
│       ├── module2.config.js     ← (Phase 2)
│       └── ...
└── css/
    └── (Tailwind hoặc custom CSS)
```

---

## 7. Workstream 2 — Content

### 7.1 Scope

Content team chịu trách nhiệm tạo **nội dung đào tạo** cho từng module. Nội dung này sẽ được Dev team encode vào config JSON.

### 7.2 Content deliverables per module

Mỗi module cần deliver:

| Deliverable | Mô tả | Format |
|---|---|---|
| Activity definitions | Danh sách activities, type (survey/form/matrix), thứ tự | Markdown → JSON |
| Questions & labels | Câu hỏi, label, explanation, placeholder, helper text | Markdown → JSON |
| Scoring rules | Thresholds, weights, formulas, constraints | Markdown → JSON |
| Intro content | Mỗi activity: mục đích, cách làm, ví dụ, thời gian ước tính | Markdown → JSON |
| Case studies | Ví dụ thực tế VN, relevant cho Dolphin | Markdown |
| Framework diagrams | Canvas, matrix, model descriptions | Text + visual specs |
| Discussion questions | Câu hỏi cho facilitator dùng trong workshop | Markdown |

### 7.3 Module 1 content status

| Deliverable | Status | Source file |
|---|---|---|
| 10 câu diagnostic | ✅ Done | `MODULE_01_Business_Model.md` §1.2 |
| BMC fields (hiện tại + mục tiêu) | ✅ Done | `MODULE_01_Business_Model.md` §1.3, §2.4 |
| 4 sản phẩm + mô tả | ✅ Done | `MODULE_01_Business_Model.md` §3.3 |
| 7 tiêu chí + trọng số | ✅ Done | `MODULE_01_Business_Model.md` §3.1 |
| Invest/Watch/Kill framework | ✅ Done | `MODULE_01_Business_Model.md` §3.4 |
| Financial model structure | ✅ Done | `MODULE_01_Business_Model.md` §5.1 |
| Case studies (Base.vn, Palexy, KMS) | ✅ Done | `MODULE_01_Business_Model.md` §7 |
| Micro-guidance (placeholders, helpers) | ⚠️ Partial | Cần viết thêm cho từng field |

### 7.4 Module 2–5 content status

| Module | Source file | Status |
|---|---|---|
| M2 — Portfolio | `MODULE_02_Portfolio.md` | ⚠️ Generic, cần Dolphin-specific rewrite |
| M3 — BD Framework | `MODULE_03_BD_Framework.md` | ⚠️ Generic, cần Dolphin-specific rewrite |
| M4 — Org & Ops | `MODULE_04_Org_Ops.md` | ⚠️ Generic, cần Dolphin-specific rewrite |
| M5 — PDLC | `MODULE_05_PDLC.md` | ⚠️ Generic, cần Dolphin-specific rewrite |

### 7.5 Content guidelines

1. **Luôn Dolphin-specific** — Placeholder, ví dụ, case study phải liên quan trực tiếp đến Dolphin. Không dùng generic example.
2. **Ngôn ngữ: tiếng Việt** — Toàn bộ content facing participant phải bằng tiếng Việt. Thuật ngữ technical có thể giữ tiếng Anh nếu phổ biến (ví dụ: Business Model Canvas, SaaS).
3. **Micro-guidance pattern** — Mỗi input field deliver đủ 4 thành phần: label, explanation, placeholder, helper text.
4. **Source of truth** — File `MODULE_0N_*.md` là source of truth cho content. HTML mockups trong `design_v2/` chỉ là visual reference, KHÔNG lấy content từ đó.

### 7.6 Handoff: Content → Dev

Content team deliver nội dung dạng structured markdown. Dev team chuyển thành config JSON theo schema sau:

```json
{
  "moduleId": "module1",
  "title": "Tái Cấu Trúc Mô Hình Kinh Doanh",
  "activities": [
    {
      "id": "diagnostic",
      "type": "survey",
      "title": "Chẩn đoán mô hình hiện tại",
      "intro": {
        "purpose": "...",
        "howTo": "...",
        "example": "...",
        "estimatedTime": "10-15 phút"
      },
      "questions": [
        {
          "id": "q1",
          "text": "Doanh thu phụ thuộc vào khả năng tìm deal của CEO",
          "explanation": "...",
          "placeholder": "...",
          "helperText": "..."
        }
      ],
      "scoring": {
        "thresholds": [
          { "max": 15, "label": "Tình hình chưa nghiêm trọng", "color": "green" },
          { "max": 30, "label": "Cần chuyển đổi có kế hoạch", "color": "amber" },
          { "max": 50, "label": "Cần chuyển đổi khẩn cấp", "color": "red" }
        ]
      }
    }
  ]
}
```

---

## 8. Dependencies giữa 2 workstreams

```
Content team                          Dev team
────────────                          ────────────
M1 content (done) ──────────────────► Build shell + M1 config
                                      Build participant UI
                                      Build facilitator dashboard
                                           │
M2 content (in progress) ──────────► Tạo module2.config.js
M3 content ─────────────────────────► Tạo module3.config.js
M4 content ─────────────────────────► Tạo module4.config.js
M5 content ─────────────────────────► Tạo module5.config.js
```

**Critical path:** Dev team có thể bắt đầu build shell + Module 1 ngay vì content M1 đã sẵn sàng. Content team làm song song M2–5, deliver trước khi Phase 2 bắt đầu.

**Blocking dependency:** Dev team cần finalize config JSON schema trước khi Content team format nội dung. Schema cần agree trong tuần đầu tiên.

---

## 9. Success metrics

### Phase 1 (MVP)

| Metric | Target | Cách đo |
|---|---|---|
| Completion rate | ≥80% participant hoàn thành cả 6 activities | localStorage data |
| Time to complete | ≤45 phút cho toàn bộ Module 1 | Timestamp tracking |
| Facilitator usefulness | Facilitator đánh giá dashboard "useful" hoặc "very useful" | Post-workshop survey |
| Zero critical bugs | Không có bug gây mất data hoặc block flow | QA testing |

### Phase 2

| Metric | Target |
|---|---|
| Module 2–5 completion rate | ≥75% |
| Content rewrite done | 4/4 modules Dolphin-specific |
| Cross-module tracking | Participant thấy progress qua 5 modules |

---

## 10. Risks & mitigation

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| Content M1 có lỗi khi encode vào JSON | Data sai, mất trust | Medium | Cross-check mọi số liệu với MODULE_01 source |
| Participant không tự hoàn thành (drop off giữa chừng) | Workshop kém hiệu quả | Medium | UX micro-guidance, progress indicator, auto-save |
| localStorage bị xóa (user clear browser data) | Mất toàn bộ input | Medium | Warning message + optional manual export |
| Design mockups có content sai | Dev copy sai content | High | BRD + CLAUDE.md đã document rõ: luôn lấy content từ .md source |
| Shell không flexible đủ cho Module 2–5 | Phải refactor khi mở rộng | Low | Define 3 activity types rõ ràng, test với M2 content trước |

---

## 11. Known content errors in design mockups

⚠️ **QUAN TRỌNG — Dev team đọc kỹ:**

HTML mockups trong `design_v2/` là visual reference CHO LAYOUT ONLY. Nhiều chỗ content sai:

| File | Lỗi | Giá trị đúng |
|---|---|---|
| `02_diagnostic_assessment.html` | 10 câu diagnostic dùng câu generic | Lấy từ MODULE_01 §1.2 (Dolphin-specific) |
| `03_target_canvas_*.html` | Resource Allocation Y3 = 20:80 | **Y1: 85:15 · Y2: 70:30 · Y3: 50:50** |
| Sidebar (tất cả screens) | "6 Phases" | **"6 Activities"** |
| `04_product_scoring_matrix.html` | Dùng "Product Alpha/Beta/Gamma" | **VB Điện tử, IPTV Khách sạn, Event/Ticket, CMS/Tòa soạn** |
| `05_portfolio_decision_*.html` | Generic product names | Dùng 4 tên sản phẩm thật (xem trên) |

---

## 12. Timeline estimate

### Phase 1 — MVP Module 1

| Week | Dev team | Content team |
|---|---|---|
| W1 | Agree config JSON schema. Setup project, Tailwind, design tokens | Finalize M1 micro-guidance (placeholder + helper text cho mỗi field) |
| W2 | Build shell: activity renderer, navigation, progress, auto-save | Deliver M1 config content (structured markdown) |
| W3 | Build survey type + Activity 1. Build form type + Activity 2, 3 | Review dev output, fix content issues |
| W4 | Build matrix type + Activity 4. Build Activity 5 (I/W/K constraint) | Start M2 content Dolphin-specific rewrite |
| W5 | Build Activity 6 (financial auto-compute). Build summary screen | Continue M2 |
| W6 | Build facilitator dashboard (aggregate, gap analysis) | Continue M2 |
| W7 | QA, bug fixes, mobile testing, dark mode polish | M2 content ready for review |
| W8 | Deploy MVP. Facilitator walkthrough. Collect feedback | M2 content finalized |

### Phase 2 — Module 2–5

| Month | Dev team | Content team |
|---|---|---|
| M3 | Backend API + auth. Module 2 config integration | M3 + M4 content |
| M4 | Module 3 + 4 config integration. Export feature | M5 content |
| M5 | Module 5 integration. Cross-module progress. Polish | Final review all modules |

*Timeline là estimate, cần adjust theo team capacity thực tế.*

---

## 13. Open questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Config JSON schema — finalize trước khi code | Dev + PM | Open |
| 2 | Facilitator dashboard Phase 1: manual import hay real-time? | PM | Open |
| 3 | Hosting: GitHub Pages hay Vercel? | Dev | Open |
| 4 | Module 1 pilot: chạy thử với ai trước? Full leadership hay subset? | PM + CEO | Open |
| 5 | Dark mode: có cần cho Phase 1 hay defer? | PM | Open |

---

## Appendix A — Content source of truth reference

| Module | Source file |
|---|---|
| Module 1 | `01_Business_Model/MODULE_01_Business_Model.md` |
| Module 2 | `02_Product_Service_Portfolio/MODULE_02_Portfolio.md` |
| Module 3 | `03_Business_Development/MODULE_03_BD_Framework.md` |
| Module 4 | `04_Organization_Operation/MODULE_04_Org_Ops.md` |
| Module 5 | `05_Product_Development_Lifecycle/MODULE_05_PDLC.md` |
| Design | `design_v2/DESIGN.md` |

## Appendix B — Glossary

| Term | Meaning |
|---|---|
| Shell | Phần code reusable: activity renderer, navigation, data management |
| Config JSON | File chứa nội dung 1 module: câu hỏi, labels, scoring rules |
| Activity | 1 bài tập trong module (ví dụ: Diagnostic, BMC, Product Scoring) |
| Participant | Người làm bài (leadership team member) |
| Facilitator | Người dẫn workshop, dùng dashboard |
| BMC | Business Model Canvas |
| Gap analysis | So sánh câu trả lời giữa các participant để tìm điểm khác biệt |
| Micro-guidance | 4 thành phần hỗ trợ mỗi input: label, explanation, placeholder, helper |
| I/W/K | Invest / Watch / Kill — framework phân loại sản phẩm |
| Service-Funded Product Company | Mô hình dùng revenue từ service để fund phát triển product |

---

*Document version 1.0 — Draft for team review*
