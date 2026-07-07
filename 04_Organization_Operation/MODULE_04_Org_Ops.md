# Module 4: Cấu Trúc Organization & Operation

## Mục Tiêu Module

Thiết kế cấu trúc tổ chức và mô hình vận hành phù hợp với mô hình kinh doanh mới, portfolio mới, và BD framework đã xây dựng ở 3 module trước.

---

## Phần 1: Đánh Giá Tổ Chức Hiện Tại

### 1.1 Org Structure Audit

**Workshop Activity 1:** Vẽ lại org chart hiện tại và trả lời:

| Câu hỏi | Đánh giá hiện tại |
|---------|-------------------|
| Cấu trúc theo function hay project/product? | |
| Bao nhiêu tầng quản lý từ CEO đến developer? | |
| Span of control trung bình? | |
| Ai own P&L cho từng service line? | |
| BD/Sales report cho ai? | |
| Quyết định technical architecture ai quyết? | |
| HR, Finance, Admin tập trung hay phân tán? | |
| Cross-functional collaboration thế nào? | |

### 1.2 Org Maturity Assessment

Đánh giá 6 chiều:

```
         Strategy Alignment
              5
             /|\
            / | \
     People  4|  \  Process
       \   / 3|   \ /
        \ /  2|   / \
         X  1 |  /   X
        / \   | /   / \
       /   \  |/   /   \
  Culture    Technology   Governance
```

| Chiều | 1-Adhoc | 2-Defined | 3-Managed | 4-Optimized | 5-Innovative |
|-------|---------|-----------|-----------|-------------|--------------|
| Strategy | Không rõ | Có nhưng không follow | Follow nhưng chưa measure | Measured & adjusted | Data-driven, adaptive |
| People | Hire-fire | Role defined | Career path | Performance culture | Learning org |
| Process | Mỗi project khác nhau | Template có | Consistent follow | Continuous improve | Automated |
| Technology | Basic tools | Standard stack | Integrated | Optimized | Leading edge |
| Culture | Survival | Task-focused | Team-oriented | Innovation-friendly | Purpose-driven |
| Governance | Founder decides all | Some delegation | Clear RACI | Metrics-driven | Autonomous teams |

---

## Phần 2: Thiết Kế Org Structure Mới

### 2.1 Org Models cho IT Services Company

**Model A: Functional Structure**
```
CEO
├── VP Engineering / Delivery
│   ├── Department A (e.g., Web/Mobile)
│   ├── Department B (e.g., Embedded/IoT)
│   └── Department C (e.g., QA/Testing)
├── VP Business Development
│   ├── Market A (Japan)
│   └── Market B (US/EU)
├── VP Operations / COO
│   ├── HR
│   ├── Finance
│   └── Admin/IT
└── VP Product (nếu có)
```
- **Ưu:** Chuyên môn hóa, career path rõ
- **Nhược:** Silo, chậm cross-functional

**Model B: Matrix Structure**
```
CEO
├── Function Heads (People & Capability)
│   ├── Engineering
│   ├── Design
│   └── QA
├── Business Unit Heads (P&L ownership)
│   ├── BU1: Industry Vertical A
│   ├── BU2: Industry Vertical B
│   └── BU3: Product
└── Shared Services
    ├── HR, Finance, Legal
    └── IT, Admin
```
- **Ưu:** Cân bằng chuyên môn + business focus
- **Nhược:** Phức tạp, dual reporting

**Model C: Business Unit Structure**
```
CEO
├── BU1: [Domain/Vertical A] (full P&L)
│   ├── BD/Sales
│   ├── Delivery
│   └── Pre-sales
├── BU2: [Domain/Vertical B] (full P&L)
│   ├── BD/Sales
│   ├── Delivery
│   └── Pre-sales
├── BU3: Product Division
│   ├── Product Management
│   ├── Engineering
│   └── Growth
└── Corporate Services
    ├── HR, Finance, Legal
    ├── Technology Office (CTO)
    └── Strategy & PMO
```
- **Ưu:** Accountability rõ, nhanh, domain focus
- **Nhược:** Duplicate resources, khó share

**Model D: Hybrid (Phổ biến nhất cho company 100-500 người)**
```
CEO
├── CTO / VP Engineering
│   ├── Tech Leads by skill (pools)
│   └── Architecture & Innovation
├── Delivery / Operations
│   ├── Project/Program Managers
│   ├── Delivery Teams (cross-functional)
│   └── Quality Assurance
├── Business Development
│   ├── Sales by Market
│   ├── Pre-sales / Solutions
│   └── Marketing
├── People & Culture (HR)
│   ├── Talent Acquisition
│   ├── L&D
│   └── People Operations
└── Finance & Admin
```
- **Ưu:** Linh hoạt, phù hợp giai đoạn chuyển đổi
- **Nhược:** Cần strong PMO

### 2.2 Chọn Org Model

**Workshop Activity 2:** Decision matrix

| Tiêu chí | Weight | Model A | Model B | Model C | Model D |
|----------|--------|---------|---------|---------|---------|
| Phù hợp business model mới | 25% | | | | |
| Khả năng scale | 20% | | | | |
| Dễ chuyển đổi từ hiện tại | 20% | | | | |
| Accountability rõ ràng | 15% | | | | |
| Employee experience | 10% | | | | |
| Cost hiệu quả | 10% | | | | |

### 2.3 Key Roles Definition

**Roles mới hoặc cần redefined:**

| Role | Responsibility | Reports to | KPIs |
|------|---------------|------------|------|
| **Head of Delivery** | Quality, timeline, profitability | CEO/COO | Margin, on-time, CSAT |
| **Solution Architect** | Technical presales, architecture | CTO | Win rate, solution quality |
| **Account Manager** | Client relationship, growth | VP BD | NRR, account revenue |
| **Engineering Manager** | Team capability, staffing | CTO | Utilization, retention, quality |
| **PMO Lead** | Process, reporting, resource planning | COO | Project health, forecast accuracy |
| **Domain Expert** | Industry knowledge, thought leadership | BU Head | Content output, deal support |

---

## Phần 3: Operating Model

### 3.1 Core Processes

**5 quy trình cốt lõi cần chuẩn hóa:**

```
1. SELL (BD → Contract)
   Trigger: Lead → Output: Signed contract
   Owner: VP BD
   SLA: Response to lead < 24h, Proposal < 5 business days

2. STAFF (Resource Allocation)
   Trigger: Signed contract → Output: Team assigned
   Owner: PMO / Resource Manager
   SLA: Team ready within 2 weeks of signing

3. DELIVER (Project Execution)
   Trigger: Team assigned → Output: Deliverables accepted
   Owner: Delivery Manager
   SLA: Per project SLA

4. GROW (Account Expansion)
   Trigger: 3 months into delivery → Output: Upsell/cross-sell
   Owner: Account Manager
   SLA: QBR every quarter

5. SUPPORT (People & Ops)
   Trigger: Ongoing → Output: Enabled teams
   Owner: HR + Finance + Admin
   SLA: Hiring < 30 days, Onboarding < 5 days
```

### 3.2 RACI Matrix

**Workshop Activity 3:** Hoàn thành RACI cho key decisions

| Decision/Activity | CEO | CTO | VP BD | Delivery Mgr | PM | Engineering Mgr | HR |
|-------------------|-----|-----|-------|-------------|----|-----------------|----|
| New service launch | A | C | R | C | I | C | I |
| Pricing decision | A | C | R | C | I | I | I |
| Technology stack selection | I | A | I | C | I | R | I |
| Hiring (technical) | I | A | I | C | I | R | C |
| Project escalation | I | C | I | A | R | C | I |
| Client contract negotiation | A | C | R | C | I | I | I |
| Training & development | I | C | I | I | I | C | A/R |
| Resource allocation | I | C | C | C | I | R | I |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

### 3.3 Meeting Cadence

| Meeting | Frequency | Attendees | Duration | Purpose |
|---------|-----------|-----------|----------|---------|
| Leadership standup | Daily | C-level + VPs | 15 min | Blockers & priorities |
| Pipeline review | Weekly | BD + Pre-sales | 60 min | Pipeline health & actions |
| Delivery review | Weekly | Delivery + PMs | 60 min | Project health |
| All-hands | Monthly | Everyone | 60 min | Company updates, wins, learnings |
| Strategy review | Quarterly | Leadership | Half day | OKR progress, strategy adjust |
| Board/Advisory | Quarterly | CEO + Board | 2-3 hours | Performance & direction |

### 3.4 Resource Management Model

**Staffing Process:**
```
1. Demand Planning
   ├── BD forecast → expected headcount needs (3-6 months out)
   ├── Current project ramp-up/down schedule
   └── Technology/skill demand map

2. Supply Management
   ├── Current bench (available pool)
   ├── Planned hires (pipeline)
   ├── Contractor/partner capacity
   └── Skill inventory & gaps

3. Matching & Allocation
   ├── Skill fit score
   ├── Client preference
   ├── Career development goals
   └── Utilization targets (75-85%)

4. Monitoring
   ├── Utilization rate by team/individual
   ├── Bench rate (target < 10%)
   ├── Forecast accuracy
   └── Time-to-fill
```

---

## Phần 4: People & Culture

### 4.1 Career Framework cho IT Services Company

```
Individual Contributor Track          Management Track
─────────────────────────           ──────────────────
                                    
L6: Distinguished Engineer          VP / Director
L5: Principal Engineer              Senior Manager
L4: Senior Engineer                 Engineering Manager
L3: Engineer                        Team Lead
L2: Junior Engineer                 
L1: Intern / Fresher               

     ↕ Chuyển đổi giữa 2 track được
```

**Mỗi level cần define rõ:**
- Expectations (output & behavior)
- Skills & competencies
- Compensation band
- Promotion criteria

### 4.2 Performance Management

**OKR Framework (đề xuất):**

| Level | OKR Setting | Review Cycle | Calibration |
|-------|------------|-------------|-------------|
| Company | Quarterly, CEO leads | Monthly check-in | N/A |
| Department | Quarterly, VP leads | Bi-weekly check-in | Quarterly |
| Individual | Quarterly, Manager + IC | Weekly 1:1 | Quarterly |

### 4.3 Retention & Engagement

**Key levers cho IT services company VN:**

| Lever | Impact | Cost | Implementation |
|-------|--------|------|----------------|
| Competitive salary | High | High | Review bi-annually vs market |
| Clear career path | High | Low | Career framework + transparent promotion |
| Interesting projects | Very High | Low | Project rotation, client diversity |
| Learning & development | High | Medium | Training budget, certifications |
| Work-life balance | High | Low | Flexible hours, remote options |
| Recognition | Medium | Low | Monthly awards, public recognition |
| Company culture | High | Low | Team activities, values-driven |

---

## Phần 5: Governance & Metrics

### 5.1 Company Dashboard

| Category | Metric | Target | Review |
|----------|--------|--------|--------|
| **Financial** | Revenue growth YoY | 20%+ | Monthly |
| | Gross margin | 30%+ | Monthly |
| | Revenue per employee | Increasing | Quarterly |
| **Delivery** | On-time delivery rate | > 90% | Monthly |
| | Customer satisfaction (NPS) | > 40 | Quarterly |
| | Defect rate | Decreasing | Monthly |
| **People** | Employee turnover | < 15% | Monthly |
| | Utilization rate | 75-85% | Weekly |
| | Bench rate | < 10% | Weekly |
| | eNPS | > 30 | Quarterly |
| **BD** | Pipeline coverage | > 3x | Weekly |
| | Win rate | > 25% | Monthly |
| | New logos / quarter | 2-4 | Quarterly |
| **Growth** | Revenue from new services | Increasing | Quarterly |
| | IP/Product revenue % | Increasing | Quarterly |

### 5.2 Escalation Framework

```
Level 1: Project Level
├── PM handles
├── Timeline: resolve within 24h
└── Escalate if: budget impact, client dissatisfied, resource gap

Level 2: Department Level
├── Delivery Manager / Engineering Manager handles
├── Timeline: resolve within 48h
└── Escalate if: cross-department, client exec involved, financial impact > X

Level 3: Leadership Level
├── VP / C-level handles
├── Timeline: resolve within 1 week
└── Actions: war room, client exec call, recovery plan

Level 4: CEO Level
├── CEO direct involvement
├── When: existential risk, key account at risk, legal issue
└── Actions: personal intervention, board notification if needed
```

---

## Deliverables Sau Module 4

1. ✅ Current org structure audit
2. ✅ New org structure design (chosen model)
3. ✅ Key roles & responsibilities defined
4. ✅ RACI matrix cho core decisions
5. ✅ Operating model (5 core processes)
6. ✅ Meeting cadence & governance
7. ✅ Career framework draft
8. ✅ Company dashboard & KPIs

---

## Kết Nối Sang Module 5

Org & Ops structure mới cần PDLC phù hợp:
- Delivery methodology nào cho từng service type?
- Quality gates ở đâu trong quy trình?
- Cách integrate PDLC với BD → Staffing → Delivery flow
