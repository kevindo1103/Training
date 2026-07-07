# Dolphin Training Portal — Claude Code Context

*Cairn framework v0.7 · Last updated: 2026-07-07*

> Master config cho mọi Claude Code session trong project này.

---

## Project Identity

- **Product:** Dolphin Technology Training Portal
- **Mô tả:** Interactive pre-class workshop portal cho Dolphin Technology (công ty phần mềm ~50 người, VN). Participant tự hoàn thành activities trước workshop; facilitator dashboard tổng hợp + so sánh kết quả.
- **Context:** Dolphin đang chuyển từ custom software studio → Service-Funded Product Company. Portal phục vụ chương trình đào tạo 5 module cho leadership team (CEO, CTO, PM, BD).
- **Stack:** FastAPI + SQLAlchemy + SQLite (backend) · HTML/CSS/JS + Tailwind CSS (frontend) · Static hosting (Vercel/Netlify/GitHub Pages) + VPS cho backend
- **Environments:** Production (TBD) · Staging (TBD) · Local dev (`uvicorn` + `live-server`)
- **Phase hiện tại:** Module 1 implementation

---

## Docs Ownership Protocol (BẮT BUỘC)

**Toàn bộ root `*.md` + module files do MỘT session docs-editor duy nhất quản lý** — branch `claude/edit-git-docs-<id>`.

### Mọi session KHÁC (không phải docs-editor)

- **KHÔNG sửa trực tiếp** root `*.md` (README, CLAUDE.md, `0N_*/MODULE_*.md`).
  - Ngoại lệ: thêm ghi chú vận hành vào `CLAUDE.md` (bug pattern, fix mới).
- Sau bất kỳ thay đổi nào ảnh hưởng tới **content rule, API contract, schema, UI spec, deploy info, known bug** → comment vào GitHub issue **DOCS_INBOX [#10](https://github.com/kevindo1103/Training/issues/10)** theo template:

  ```
  ### <YYYY-MM-DD> — <session / branch>
  - **PR / trigger:** #<số PR> → `<base branch>`
  - **Đã đụng:** <file / area>
  - **Thay đổi:** <tóm tắt>
  - **Docs cần cập nhật:** <CLAUDE.md §x / README / module file / "chưa rõ">
  - **Ambiguity / cần Kevin xác nhận:** <nếu có, hoặc "none">
  ```

- **Post-merge rule (BẮT BUỘC):** PR merge vào `main` → MUST comment vào DOCS_INBOX issue #10 trong vòng 24h.
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

**3 Activity Types:**
- `survey` — Câu hỏi + thang điểm 1–5 (Diagnostic)
- `matrix` — Items × Criteria with weights (Product Scoring)
- `form` — Text/number inputs (BMC, Financial Model)

**2 Views:**
- **Participant UI** — Mobile-first, self-serve. Mở link → tự hoàn thành, không cần facilitator.
- **Facilitator Dashboard** — Desktop-first. Gap analysis, response comparison, aggregate scores, export report.

**Data persistence:**
- Frontend gọi REST API → backend lưu vào SQLite per-tenant (1 DB per cohort/workshop run).
- `localStorage` chỉ dùng làm draft buffer (auto-save UI) — submit thật thì gọi API.

---

## Content Source of Truth

⚠️ **QUAN TRỌNG — đọc kỹ trước khi code bất kỳ content nào:**

| Loại | Source đúng | Source SAI |
|------|-------------|------------|
| Nội dung (câu hỏi, label, hướng dẫn) | `01_Business_Model/MODULE_01_Business_Model.md` (và module tương ứng) | `design_v2/*.html` — placeholder nhiều chỗ sai |
| Design tokens, typography, layout, components | `design_v2/DESIGN.md` | — |
| API contract | `docs/openapi.json` (auto-generated, luôn current) | — |

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
| 3 | **Auto-save draft** | localStorage với debounce, toast "Đã lưu nháp" — submit thật gọi API |
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
├── backend/                                        ← FastAPI app
│   ├── main.py
│   ├── core/
│   │   └── config.py
│   ├── modules/
│   │   ├── sessions/                               ← Session mgmt, participant auth
│   │   ├── responses/                              ← Activity response storage
│   │   └── facilitator/                            ← Aggregate, export endpoints
│   ├── alembic/
│   ├── requirements.txt
│   └── .env.example
│
├── portal/                                         ← Frontend (static)
│   ├── index.html                                  ← Participant entry
│   ├── facilitator/
│   │   └── index.html                              ← Facilitator dashboard
│   ├── js/
│   │   ├── shell.js                                ← Activity renderer, session mgmt, API client
│   │   └── modules/
│   │       └── module1.config.js                   ← Config JSON for Module 1
│   └── css/
│       └── main.css
│
└── docs/
    └── openapi.json                                ← Auto-generated API contract
```

---

## Session Topology

7 sessions độc lập, mỗi session sở hữu scope riêng — không cross-edit.

### Pair table

| # | Role | Middle Dev | Branch | Scope |
|---|------|------------|--------|-------|
| 1 | **Training_Docs** (docs-editor) | — *(single-owner)* | `claude/edit-git-docs-<id>` *(long-lived)* | Root `*.md` + `0N_*/MODULE_*.md` — canonical owner. Fold DOCS_INBOX. KHÔNG sửa `portal/` hoặc `backend/`. |
| 2 | **Training_Backend** | **Windsurf_Backend** | `claude/feat-backend-<desc>` | `backend/**` — FastAPI routes, schemas, models, alembic. Schema change → regen `docs/openapi.json`. |
| 3 | **Training_Frontend** | **Windsurf_Frontend** | `claude/feat-frontend-<desc>` | `portal/**` trừ config JSON — Shell (`shell.js`), activity renderers, facilitator UI, CSS. |
| 4 | **Training_Content** | — *(single-owner)* | `claude/feat-content-m<N>-<desc>` | `portal/js/modules/*.config.js` — Config JSON per module. Source từ `MODULE_0N_*.md`. KHÔNG sửa `shell.js`. |
| 5 | **Training_Infra** | — *(single-owner)* | `claude/infra-<desc>` | Deploy config: `vercel.json` / `netlify.toml` / `.github/workflows/**`. CI/CD, hosting, domain. KHÔNG sửa source code. |
| 6 | **Training_QC** | **Windsurf_QC** | `claude/test-<desc>` | `tests/**` — participant flow e2e, API integration tests, cross-browser, mobile responsive, scoring logic. |
| 7 | **Training_Designer** | — *(single-owner)* | `claude/design-<desc>` | `design_v2/` — cập nhật mockup HTML + `DESIGN.md`. KHÔNG sửa `portal/` code — nếu design decision ảnh hưởng spec → report DOCS_INBOX. |

### Lead/Dev workflow (BẮT BUỘC)

| Vai trò | Trách nhiệm |
|---------|-------------|
| **Claude Code (lead)** | Plan task → assign cho Windsurf (qua user). Review Windsurf PR trước merge. Ghi DOCS_INBOX sau merge nếu chạm API contract / schema / UI spec. **KHÔNG tự implement code** — exception: hotfix khẩn cấp + Kevin đồng ý. |
| **Windsurf (dev)** | Code feature/fix theo task assignment. Push branch `windsurf/...`. Mở PR với lead listed reviewer. **KHÔNG tự merge.** **KHÔNG sửa DOCS_INBOX trực tiếp.** Backend: chạy `uvicorn` verify local TRƯỚC khi push. Frontend: `live-server` verify local TRƯỚC khi push. |

### Branch naming

**Pattern:** `claude/<type>-<scope>-<short-desc>`

- **type:** `feat` · `fix` · `chore` · `docs` · `infra` · `test` · `hotfix`
- **scope:** `backend` · `frontend` · `content` · `shell` · `config` · `facilitator` · `infra` · `qc`
- **Windsurf:** `windsurf/<type>-<scope>-<short-desc>`
- **Long-lived:** `main`, `staging`, `claude/edit-git-docs-<id>`

Ví dụ: `claude/feat-backend-response-api`, `windsurf/feat-frontend-diagnostic-survey`

### Cross-session communication

GitHub Issues + labels — sessions tự đọc inbox khi spawn.

- Lead giao task cho Windsurf: issue `from:<lead>` + `for:<dev>` + `task-assignment` + `status:planned`. Body PHẢI có `## Plan` (1-5 dòng).
- **Backend schema change** → Training_Backend lead MUST comment DOCS_INBOX #10 để Frontend biết. Tránh field-name mismatch bug.
- Spec conflict → Kevin: `for:pm` + `spec-conflict`
- Blocker: `blocker:human-needed` (cần Kevin) vs `blocker:waiting-dependency` (track only)
- **Bước 0 kickoff:** list issues `label:for:<my-role> state:open`
- **BẮT BUỘC tạo issue khi:** Kevin yêu cầu thay đổi code, lead giao task Windsurf, API contract thay đổi, nội dung Dolphin cần xác nhận.
- **KHÔNG cần issue khi:** hỏi logic read-only, check design token.

### INC-01 prevention

- Trước push, Windsurf `git fetch` + `git log <file> --oneline -10` xem lead có chạm file mình đụng không.
- Trùng file → escalate Kevin, KHÔNG tự merge.
- **Infra-only files** (`.github/workflows/**`, `vercel.json`, `netlify.toml`): **CHỈ Training_Infra được sửa.** Session khác cần CI/deploy fix → relay issue `label:for:training-infra`.
- **Training_Content KHÔNG sửa `shell.js`** — cần Shell feature mới → issue `for:training-frontend`.
- **Training_Frontend KHÔNG sửa `backend/`** — cần endpoint mới → issue `for:training-backend`.
- **Training_Backend KHÔNG sửa `portal/`** — chỉ cung cấp API contract qua `docs/openapi.json`.
- **Training_Designer KHÔNG sửa `portal/` source** — design decision → report DOCS_INBOX.

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

## Backend Structure

- New features → `backend/modules/{domain}/` (models, schemas, service, router)
- Shared infra → `backend/core/` only
- Per-cohort isolation: mỗi workshop run dùng `session_id` riêng — không mix data giữa các cohort
- **Schema/router thay đổi → MUST regen openapi:** `python scripts/regen_openapi.py` → commit `docs/openapi.json` cùng PR

---

## Deploy

### Branch flow

| Branch | Role | Auto-deploy |
|--------|------|-------------|
| `main` | Production canonical | Frontend → Vercel/Netlify · Backend → VPS (systemd) |
| `staging` | Pre-prod test | Staging stack |
| `claude/<type>-…` | Feature/fix | Không auto-deploy — merge qua PR → staging → main |

### Frontend (static)

- Push `main` → Vercel/Netlify auto-deploy `portal/` directory.
- Tailwind: CDN Play trong dev. Production → build với `tailwindcss` CLI.
- **KHÔNG** commit build artifacts (`dist/`, `node_modules/`).

### Backend (FastAPI)

- Deploy qua GitHub Actions CI/CD — **KHÔNG SSH/SFTP trực tiếp** (bypass quality gate).
- Migration: `alembic upgrade head` **chỉ** chạy qua deploy workflow — không chạy thủ công trên VPS.

### Local development

```bash
# Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# → http://localhost:8000

# Frontend (terminal khác)
npm install -g live-server
live-server portal/ --port 8080
# → http://localhost:8080 (proxy /api → localhost:8000)
```

---

## Bug Fix Protocol

1. **Reproduce** trên local hoặc staging trước khi code.
2. **Locate root cause** — backend: đọc `service.py` → `schemas.py` → `models.py`. Frontend: kiểm tra API field name, hook placement.
3. **Check impact scope** — thay đổi Pydantic schema → kiểm tra tất cả endpoint dùng schema đó + regen `openapi.json`.
4. **Fix & verify locally** — test trên mobile Chrome devtools (responsive) + desktop.
5. **Deploy** qua git push → CI/CD.
6. **Confirm** trên staging/production.

### Common Bug Patterns

| Pattern | Triệu chứng | Fix |
|---------|-------------|-----|
| Copy content từ HTML mockup | Số liệu sai (Year 3 = 20:80, tên generic) | Lấy từ `MODULE_01_Business_Model.md` |
| localStorage draft key collision | Module 2 ghi đè draft Module 1 | Namespace key: `dolphin-m<N>-activity-<id>-draft` |
| `prefers-color-scheme` không apply | Dark mode bị bỏ qua | CSS media query, không JS toggle |
| Auto-save debounce quá thấp | Lag khi user gõ nhanh | Debounce ≥ 500ms |
| Score tính sai do weight | Tổng không = 100% | Verify 7 criteria weights sum = 100% |
| Sidebar label "Phases" | UX sai ngữ nghĩa | Đổi thành "Activities" toàn bộ |
| Wrong API field name | `undefined` trong UI | Đọc `docs/openapi.json` → đúng field name |
| Frontend gọi `/api/api/endpoint` | 404 double prefix | Path không có prefix `/api/` nếu baseURL đã có |
| Alembic chạy sai DB | Staging không được migrate | Prefix `ENV=staging alembic upgrade head` |

---

## Security Rules

- JWT `Depends(get_current_user)` bắt buộc trên mọi endpoint write data.
- Facilitator dashboard: auth gate riêng (facilitator role) — participant KHÔNG xem data người khác.
- KHÔNG log: passwords, JWT secrets, tokens.
- KHÔNG commit credentials — dùng `.env` + GitHub Secrets.
- SQL: chỉ ORM, không raw SQL với f-string.
- localStorage chỉ lưu draft data — KHÔNG lưu JWT token hoặc thông tin cá nhân nhạy cảm.

---

## Anti-Patterns

- Copy content từ HTML mockups → lấy từ `.md` source files
- Generic placeholder không relevant Dolphin → Dolphin-specific hoặc flag `[NEEDS_INFO]`
- Hardcode số liệu trong JS → pull từ config object
- Training_Frontend tự implement backend endpoint → scope violation, issue `for:training-backend`
- Training_Backend sửa `portal/` → scope violation
- Training_Content tự đặt nội dung câu hỏi → source từ `MODULE_0N_*.md`
- Thêm Module 2 trước khi Module 1 complete → vi phạm M1→M2 dependency
- SSH trực tiếp VPS để fix → bypass quality gate, dùng CI/CD

---

*Dolphin Technology Training Portal · Cairn v0.7*
