# Dolphin Training Portal — Claude Code Context

*Cairn framework v0.7 · Last updated: 2026-07-07*

> Master config cho mọi Claude Code session trong project này.

---

## Project Identity

- **Product:** Dolphin Technology Training Portal
- **Mô tả:** Interactive pre-class workshop portal cho Dolphin Technology (công ty phần mềm ~50 người, VN). Participant tự hoàn thành activities trước workshop; facilitator dashboard tổng hợp kết quả.
- **Context:** Dolphin đang chuyển từ custom software studio → Service-Funded Product Company. Portal phục vụ chương trình đào tạo 5 module cho leadership team (CEO, CTO, PM, BD).
- **Stack:** HTML/CSS/JS + Tailwind CSS · localStorage (MVP) → backend API (production) · Static hosting (Vercel/Netlify/GitHub Pages)
- **Environments:** Production (static hosting TBD) · Local dev (`live-server` / `npx serve`)
- **Phase hiện tại:** Module 1 implementation

---

## Docs Ownership Protocol (BẮT BUỘC)

**Toàn bộ `docs/` + root `*.md` do MỘT session docs-editor duy nhất quản lý** — branch `claude/edit-git-docs-<id>`.

### Mọi session KHÁC (không phải docs-editor)

- **KHÔNG sửa trực tiếp** root `*.md` (README, CLAUDE.md, module files trong `01_*/` … `05_*/`).
  - Ngoại lệ: thêm ghi chú vận hành vào `CLAUDE.md` (bug pattern, fix mới).
- Sau bất kỳ thay đổi nào ảnh hưởng tới **content rule, UI spec, config schema, deploy info, known bug** → comment vào GitHub issue DOCS_INBOX (xem link trong repo) theo template:

  ```
  ### <YYYY-MM-DD> — <session / branch>
  - **PR / trigger:** #<số PR> → `<base branch>`
  - **Đã đụng:** <file / area>
  - **Thay đổi:** <tóm tắt>
  - **Docs cần cập nhật:** <CLAUDE.md §x / README / module file / "chưa rõ">
  - **Ambiguity / cần Kevin xác nhận:** <nếu có, hoặc "none">
  ```

- **Post-merge rule (BẮT BUỘC):** PR merge vào `main` → MUST comment vào DOCS_INBOX issue trong vòng 24h.
- Không tự resolve ambiguity về nội dung Dolphin — nêu trong comment để docs-editor xử lý.

### Session docs-editor

- Fold report vào canonical docs theo cascade: **CLAUDE.md → Module .md files → README**.
- Cập nhật version + changelog entry ở file bị ảnh hưởng.
- **Trước `git commit`** docs lớn: invoke skill `/doc-fold-reflection`.
- **Weekly Review:** mỗi đầu session → check report chưa xử lý, cross-check con số critical (bảng §Các Con Số Quan Trọng).

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
- **Participant UI** — Mobile-first, self-serve. Mở link → tự hoàn thành, không cần facilitator.
- **Facilitator Dashboard** — Desktop-first. Gap analysis, response comparison, aggregate scores, export report.

---

## Content Source of Truth

⚠️ **QUAN TRỌNG — đọc kỹ trước khi code bất kỳ content nào:**

| Loại | Source đúng | Source SAI |
|------|-------------|------------|
| Nội dung (câu hỏi, label, hướng dẫn) | `01_Business_Model/MODULE_01_Business_Model.md` (và module tương ứng) | `design_v2/*.html` — placeholder nhiều chỗ sai |
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

Theo `design_v2/DESIGN.md` — **đọc file đó trước khi implement UI mới**.

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
        └── main.css                                ← Tailwind build output
```

---

## Session Topology

3 sessions độc lập, mỗi session sở hữu scope riêng — không cross-edit.

### Pair table

| # | Role | Branch | Scope |
|---|------|--------|-------|
| 1 | **Training_Docs** (docs-editor) | `claude/edit-git-docs-<id>` *(long-lived)* | Root `*.md` + `0N_*/MODULE_*.md` — canonical owner. KHÔNG sửa `portal/`. |
| 2 | **Training_Frontend** | `claude/feat-frontend-<desc>` | `portal/**` trừ config JSON — Shell, renderers, facilitator dashboard, CSS. |
| 3 | **Training_Content** | `claude/feat-content-m<N>-<desc>` | `portal/js/modules/*.config.js` — Config JSON per module. KHÔNG sửa `shell.js`. |

### Lead/Dev workflow (BẮT BUỘC)

| Vai trò | Trách nhiệm |
|---------|-------------|
| **Claude Code (lead)** | Plan task → assign cho Windsurf (qua user). Review Windsurf PR trước merge. Ghi DOCS_INBOX sau merge nếu chạm content rule / schema / UI spec. **KHÔNG tự implement code** — exception: hotfix khẩn cấp + Kevin đồng ý. |
| **Windsurf (dev)** | Code feature/fix theo task assignment. Push branch `windsurf/...`. Mở PR với lead listed reviewer. **KHÔNG tự merge.** **KHÔNG sửa DOCS_INBOX trực tiếp** — báo lead biết để lead ghi. Local preview với `live-server` hoặc `npx serve portal/` TRƯỚC khi push. |

### Branch naming

**Pattern:** `claude/<type>-<scope>-<short-desc>`

- **type:** `feat` · `fix` · `chore` · `docs` · `hotfix`
- **scope:** `frontend` · `content` · `shell` · `config` · `facilitator` · `deploy`
- **Windsurf:** `windsurf/<type>-<scope>-<short-desc>`
- **Long-lived:** `main`, `claude/edit-git-docs-<id>`

Ví dụ: `claude/feat-frontend-diagnostic-survey`, `windsurf/feat-config-m1-scoring-matrix`

### Cross-session communication

GitHub Issues + labels — sessions tự đọc inbox khi spawn.

- Lead giao task cho Windsurf: issue `from:<lead>` + `for:<dev>` + `task-assignment` + `status:planned`. Body PHẢI có `## Plan` (1-5 dòng).
- Spec conflict → Kevin: `for:pm` + `spec-conflict`
- Blocker: `blocker:human-needed` (cần Kevin) vs `blocker:waiting-dependency` (track only)
- **Bước 0 kickoff:** list issues `label:for:<my-role> state:open`
- **BẮT BUỘC tạo issue khi:** Kevin yêu cầu thay đổi code, lead giao task Windsurf, nội dung Dolphin cần xác nhận.
- **KHÔNG cần issue khi:** hỏi logic read-only, check design token.

### INC-01 prevention

- Trước push, Windsurf `git fetch` + `git log <file> --oneline -10` xem lead có chạm file mình đụng không.
- Trùng file → escalate Kevin, KHÔNG tự merge.
- **Training_Content KHÔNG sửa `shell.js`** — nếu cần Shell feature mới → tạo issue `for:training-frontend`.
- **Training_Frontend KHÔNG sửa config JS** — nếu cần content mới → tạo issue `for:training-content`.

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

## Deploy

**MVP: static files — KHÔNG cần build step.**

- Mọi file trong `portal/` chạy trực tiếp trên browser.
- Tailwind: dùng CDN Play (`<script src="https://cdn.tailwindcss.com">`) cho development. Production → build với `tailwindcss` CLI nếu cần tree-shake.
- **Deploy lên Vercel/Netlify:** push lên `main` → auto-deploy. Root directory = `portal/`.
- GitHub Pages: `Settings → Pages → Source: main branch, /portal folder`.
- **KHÔNG** commit build artifacts (`dist/`, `node_modules/`) — chỉ commit source.
- Participant URL: `https://<host>/index.html`
- Facilitator URL: `https://<host>/facilitator/index.html`

### Local development

```bash
# Cài live-server (một lần)
npm install -g live-server

# Chạy từ thư mục portal/
live-server portal/
# → mở http://localhost:8080
```

---

## Bug Fix Protocol

1. **Reproduce** trên local (`live-server`) hoặc staging URL trước khi code.
2. **Locate root cause** — đọc config JS trước, sau đó shell.js. Không fix symptom.
3. **Check impact scope** — thay đổi schema config → kiểm tra tất cả activity types dùng nó.
4. **Fix & verify locally** — test trên mobile Chrome devtools (responsive mode) + desktop.
5. **Deploy** qua git push → auto-deploy (Vercel/Netlify) hoặc GitHub Pages.
6. **Confirm** trên production URL.

### Common Bug Patterns

| Pattern | Triệu chứng | Fix |
|---------|-------------|-----|
| Copy content từ HTML mockup | Số liệu sai (Year 3 = 20:80, tên generic) | Lấy từ `MODULE_01_Business_Model.md` |
| localStorage key collision giữa modules | Module 2 ghi đè data Module 1 | Namespace key: `dolphin-m1-activity-1` |
| `prefers-color-scheme` không apply | Dark mode bị bỏ qua | Dùng CSS media query, không JS toggle |
| Auto-save debounce quá thấp | Lag khi user gõ nhanh | Debounce ≥ 500ms |
| Score tính sai do weight | Tổng không = 100% | Verify 7 criteria weights sum = 100% |
| Sidebar label "Phases" | UX sai về mặt ngữ nghĩa | Đổi thành "Activities" toàn bộ |

---

## Security Rules

- localStorage chỉ lưu workshop data — KHÔNG lưu thông tin cá nhân nhạy cảm (lương, HR data).
- Facilitator dashboard PHẢI có auth gate nếu data participant là confidential (MVP: có thể dùng simple password).
- KHÔNG commit participant data thật vào repo.
- KHÔNG embed API keys trong frontend JS — dùng environment variable qua hosting platform.

---

## Anti-Patterns

- Copy content từ HTML mockups → lấy từ `.md` source files
- Generic placeholder không relevant Dolphin → Dolphin-specific hoặc flag `[NEEDS_INFO]`
- Hardcode số liệu trong JS → pull từ config object
- Training_Content tự sửa `shell.js` → scope violation
- Training_Frontend tự đặt nội dung câu hỏi → scope violation
- Thêm Module 2 trước khi Module 1 complete → vi phạm M1→M2 dependency

---

*Dolphin Technology Training Portal · Cairn v0.7*
