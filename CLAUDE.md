# Dolphin Training Portal — Claude Code Context

*Cairn framework v0.7 · Last updated: 2026-07-07*

> Master config cho mọi Claude Code session trong project này.

---

## Project Identity

- **Product:** Dolphin Technology Training Portal
- **Mô tả:** Interactive pre-class workshop portal cho Dolphin Technology (công ty phần mềm ~50 người, VN). Participant tự hoàn thành activities trước workshop; facilitator dashboard tổng hợp kết quả.
- **Context:** Dolphin đang chuyển từ custom software studio → Service-Funded Product Company. Portal phục vụ chương trình đào tạo 5 module cho leadership team (CEO, CTO, PM, BD).
- **Stack:** HTML/CSS/JS + Tailwind CSS · localStorage (MVP) → backend API (production) · Static hosting (Vercel/Netlify/GitHub Pages)
- **Phase hiện tại:** Module 1 implementation

---

## Architecture

**2-Layer:**
- **Shell** — Reusable platform: session management, activity renderer, data collector, facilitator dashboard. Build once, dùng cho tất cả 5 modules.
- **Config JSON** — Nội dung riêng cho mỗi module: questions, criteria, products, scoring weights. Swap config = swap workshop.

**3 Activity Types (MVP):**
- `survey` — Câu hỏi + thang điểm 1–5 (Diagnostic)
- `matrix` — Items × Criteria with weights (Product Scoring)
- `form` — Text/number inputs (BMC, Financial Model)

**2 Views:**
- **Participant UI** — Mobile-first, self-serve. Mở link → tự hoàn thành, không cần facilitator hướng dẫn.
- **Facilitator Dashboard** — Desktop-first. Gap analysis, response comparison, aggregate scores, export report.

---

## Content Source of Truth

⚠️ **QUAN TRỌNG — đọc kỹ trước khi code bất kỳ content nào:**

| Loại | Source đúng | Source SAI |
|------|-------------|------------|
| Nội dung (câu hỏi, label, hướng dẫn) | `01_Business_Model/MODULE_01_Business_Model.md` (và các module tương ứng) | `design_v2/*.html` — placeholder nhiều chỗ sai |
| Design tokens, typography, layout, components | `design_v2/DESIGN.md` | — |

HTML mockups trong `design_v2/` là **visual reference chỉ cho layout/style** — KHÔNG copy content từ đó.

---

## Các Con Số Quan Trọng (dễ nhầm)

| Mục | Giá trị đúng | Hay bị sai thành |
|-----|--------------|-----------------|
| Resource Allocation Year 1 | Service **85%** / Product **15%** | 80:20 |
| Resource Allocation Year 2 | Service **70%** / Product **30%** | 50:50 |
| Resource Allocation Year 3 | Service **50%** / Product **50%** | 20:80 |
| Diagnostic threshold "ổn" | **0–15** | — |
| Diagnostic threshold "cần chuyển đổi" | **16–30** | — |
| Diagnostic threshold "khẩn cấp" | **31–50** | — |
| Số sản phẩm đánh giá | **4** | 3 |
| Số tiêu chí scoring | **7** (có trọng số) | — |
| Constraint INVEST | Chỉ được **1** sản phẩm | — |

---

## Module 1 — 6 Activities

Sidebar phải hiển thị **"6 Activities"** — KHÔNG phải "6 Phases" hay "6 Steps".

| # | Activity | Type | Ghi chú |
|---|----------|------|---------|
| 1 | Chẩn đoán mô hình hiện tại | `survey` | 10 câu, thang 1–5. Tổng 0–50. |
| 2 | Business Model Canvas — Hiện tại | `form` | 9 ô BMC + 4 câu thảo luận. Điền theo THỰC TẾ. |
| 3 | Business Model Canvas — Mục tiêu Year 3 | `form` | 9 ô BMC target + Resource Allocation Roadmap (85:15 → 70:30 → 50:50) |
| 4 | Product Scoring Matrix | `matrix` | 4 sản phẩm × 7 tiêu chí. Auto-rank. |
| 5 | Invest / Watch / Kill | `form` | Phân loại 4 sản phẩm. Constraint: chỉ INVEST 1. |
| 6 | Financial Model | `form` | Input tài chính hiện tại + Year 1 + Year 3. Auto-compute profit/budget/runway. |

---

## 4 Sản Phẩm (luôn dùng tên này)

1. **VB Điện tử (Vietlot)** — Document management
2. **IPTV Khách sạn** — Hospitality entertainment system
3. **Event/Ticket** — Event management platform
4. **CMS/Tòa soạn** — Digital newsroom CMS

---

## 7 Tiêu Chí Scoring

| # | Tiêu chí | Trọng số |
|---|----------|---------|
| 1 | Market size | 20% |
| 2 | Recurring potential | 20% |
| 3 | Reusability | 15% |
| 4 | Competitive gap | 15% |
| 5 | Domain expertise | 10% |
| 6 | Sales không qua CEO | 10% |
| 7 | Margin potential | 10% |

---

## Design System

Theo `design_v2/DESIGN.md` — đọc file đó trước khi implement UI mới.

- **Fonts:** Manrope (headlines) + Hanken Grotesk (body/UI)
- **Colors:** MD3-inspired token system · Primary teal `#00685f` · Surface `#F5F5F4`
- **Layout:** Desktop = sidebar + 1100px learning column · Mobile = sidebar collapse, single column
- **Framework:** Tailwind CSS
- **Style:** Corporate Modern / Minimalist — expansive whitespace, soft shadows (`0 4px 20px rgba(0,0,0,0.04)`)

---

## UX Requirements (BẮT BUỘC)

| # | Yêu cầu | Chi tiết |
|---|---------|---------|
| 1 | **Self-serve** | Participant mở link và tự hoàn thành — không cần facilitator hướng dẫn |
| 2 | **Per-field micro-guidance** | Mỗi input: label + explanation + Dolphin-specific placeholder + helper text |
| 3 | **Auto-save** | localStorage với debounce, toast "Đã lưu" |
| 4 | **Mobile-first** | Participant chủ yếu làm trên điện thoại |
| 5 | **Dark/light mode** | Auto-detect qua `prefers-color-scheme` |
| 6 | **Intro per activity** | Màn intro: mục đích, cách làm, ví dụ, thời gian ước tính |
| 7 | **Progress indicator** | Hiển thị rõ đang ở activity nào / tổng bao nhiêu |

---

## File Structure

```
training/
├── CLAUDE.md                                        ← File này
├── README.md
├── 00_PROJECT_OVERVIEW.md
│
├── 01_Business_Model/
│   └── MODULE_01_Business_Model.md                 ← CONTENT SOURCE ✓
├── 02_Product_Service_Portfolio/
│   └── MODULE_02_Portfolio.md
├── 03_Business_Development/
│   └── MODULE_03_BD_Framework.md
├── 04_Organization_Operation/
│   └── MODULE_04_Org_Ops.md
├── 05_Product_Development_Lifecycle/
│   └── MODULE_05_PDLC.md
│
├── design_v2/
│   ├── DESIGN.md                                   ← DESIGN TOKENS ✓
│   ├── 01_welcome_intro.html                       ← Visual mockup (content = placeholder)
│   ├── 02_diagnostic_assessment.html
│   ├── 03_target_canvas_resource_allocation.html
│   ├── 04_product_scoring_matrix.html
│   └── 05_portfolio_decision_financial.html
│
└── portal/                                         ← Web app (build target)
    ├── index.html                                  ← Participant entry
    ├── facilitator/
    │   └── index.html                              ← Facilitator dashboard
    ├── js/
    │   ├── shell.js                                ← Activity renderer, session mgmt, data store
    │   └── modules/
    │       └── module1.config.js                   ← Config JSON for Module 1
    └── css/
```

---

## Known Content Errors in Mockups

Không copy content từ `design_v2/*.html`. Các lỗi đã biết:

| File | Lỗi đã biết |
|------|------------|
| `02_diagnostic_assessment.html` | 10 câu diagnostic dùng câu generic — không phải Dolphin-specific |
| `03_target_canvas_*.html` | Resource Allocation Year 3 ghi `20:80` — đúng là `50:50` |
| Sidebar (tất cả screens) | Hiển thị "6 Phases" — phải là "6 Activities" |
| `04_product_scoring_matrix.html` | Dùng "Product Alpha/Beta/Gamma" — phải dùng tên thật (xem §4 Sản Phẩm) |

---

## Session Topology

| # | Role | Branch | Scope |
|---|------|--------|-------|
| 1 | **Training_Docs** (docs-editor) | `claude/edit-git-docs-<id>` | Root `*.md`, content review, cross-module consistency |
| 2 | **Training_Frontend** | `claude/feat-frontend-<desc>` | `portal/**` — Shell, activity renderers, facilitator dashboard |
| 3 | **Training_Content** | `claude/feat-content-m<N>-<desc>` | Config JSON — `portal/js/modules/*.config.js` |

### Quy tắc cross-session

- **Content JSON** phải lấy data từ `MODULE_0N_*.md` — KHÔNG tự đặt số liệu hay câu hỏi
- **Đọc `design_v2/DESIGN.md`** trước khi implement bất kỳ component UI mới nào
- **Placeholder phải Dolphin-specific** — không dùng generic example
- **Số liệu critical** (Resource Allocation ratios, diagnostic thresholds, product names) → xem bảng §Các Con Số Quan Trọng trong file này, không tự suy

---

## Anti-Patterns

- Copy content từ HTML mockups → lấy từ `.md` source files
- Generic example không relevant Dolphin → Dolphin-specific hoặc flag `[NEEDS_INFO]`
- Hardcode số liệu → pull từ config JS
- Thêm module mới trước khi Module 1 ship → vi phạm M1→M2 dependency

---

*Dolphin Technology Training Portal · Cairn v0.7*
