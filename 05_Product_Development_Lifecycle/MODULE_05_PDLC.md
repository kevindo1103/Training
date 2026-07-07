# Module 5: Điều Chỉnh Product Development Life Cycle

## Mục Tiêu Module

Thiết kế PDLC phù hợp với từng loại hình dịch vụ/sản phẩm trong portfolio mới. Đảm bảo quy trình phát triển support được cả service delivery (cho khách hàng) và product development (sản phẩm riêng).

---

## Phần 1: Đánh Giá PDLC Hiện Tại

### 1.1 Current State Assessment

**Workshop Activity 1:** Đánh giá quy trình hiện tại

| Dimension | Câu hỏi | Current State |
|-----------|---------|---------------|
| Methodology | Waterfall? Agile? Hybrid? Tùy project? | |
| Requirements | Ai viết requirements? Bao chi tiết? | |
| Design/Architecture | Có review? Ai quyết technology stack? | |
| Development | Coding standards? Code review? CI/CD? | |
| Testing | Unit test? Integration? Automation? | |
| Deployment | Manual? Automated? Frequency? | |
| Monitoring | Production monitoring? Incident response? | |
| Documentation | Có standard? Có maintain? | |
| Estimation | Dựa vào gì? Accuracy rate? | |

### 1.2 Pain Points phổ biến ở IT Services VN

```
□ Estimation sai → overrun budget/timeline
□ Requirements thay đổi liên tục → scope creep
□ Thiếu architecture review → technical debt tích tụ
□ Không có CI/CD → deploy rủi ro cao
□ Test coverage thấp → bugs ở production
□ Knowledge silos → key person dependency
□ Thiếu documentation → khó maintain, khó onboard
□ Không có retrospective → lặp lại sai lầm
□ Communication gap với khách hàng → misalignment
□ Không track metrics → không biết đang improve hay không
```

**Workshop Activity 2:** Check những items áp dụng cho Dolphin.

---

## Phần 2: PDLC Framework cho Từng Service Type

### 2.1 Framework Selection Guide

| Service Type | Recommended Methodology | Reason |
|-------------|------------------------|--------|
| Staff Augmentation | Follow client's process | Client owns methodology |
| Project-based (clear scope) | Agile (Scrum) | Iterative, transparent |
| Project-based (unclear scope) | Agile (Kanban) | Flexible, continuous flow |
| Managed Services | ITIL + Kanban | SLA-driven, predictable |
| Product Development | Scrum + Product Discovery | Build-measure-learn |
| Consulting / Advisory | Design Thinking | Problem-first approach |
| Migration / Modernization | Hybrid (plan + iterate) | Need upfront planning + flexibility |

### 2.2 PDLC cho Service Projects (Agile-based)

```
┌─────────────────────────────────────────────────────────┐
│                  PROJECT LIFECYCLE                       │
│                                                          │
│  INITIATION    PLANNING     EXECUTION     CLOSURE       │
│  (Week 0)     (Week 1-2)   (Sprints)     (Final)       │
│                                                          │
│  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐    │
│  │Kickoff │   │Backlog │   │Sprint  │   │Handover│    │
│  │& Setup │──▶│Refine- │──▶│Cycles  │──▶│& Close │    │
│  │        │   │ment    │   │(2 wks) │   │        │    │
│  └────────┘   └────────┘   └────────┘   └────────┘    │
│                                                          │
│  Activities:   Activities:   Activities:   Activities:   │
│  • Contract    • User Story  • Sprint Plan • Final test  │
│    review       mapping     • Daily Standup• UAT         │
│  • Team setup  • Tech arch  • Development  • Knowledge   │
│  • Env setup    review      • Code review    transfer    │
│  • Access &    • Sprint 0   • Testing      • Documentation│
│    tools       • Definition • Sprint Review• Retrospective│
│  • KT from      of Done    • Sprint Retro • Sign-off    │
│    client      • Risk plan  • Demo to client             │
└─────────────────────────────────────────────────────────┘
```

**Quality Gates:**

| Gate | When | Who Approves | Criteria |
|------|------|-------------|----------|
| G0: Project Start | After kickoff | PM + Client | Scope clear, team ready, env ready |
| G1: Architecture | End of Sprint 0 | Tech Lead + Architect | Architecture reviewed, NFRs defined |
| G2: Sprint Review | End of each sprint | PM + Client PO | Acceptance criteria met, no critical bugs |
| G3: Release Ready | Before deployment | QA Lead + PM | Test passed, performance OK, security checked |
| G4: Go Live | Deployment | PM + Client | Production checklist complete |
| G5: Project Close | After stabilization | PM + Delivery Mgr | All deliverables accepted, KT done |

### 2.3 PDLC cho Product Development (Internal Products)

```
┌─────────────────────────────────────────────────────────┐
│               PRODUCT DEVELOPMENT LIFECYCLE              │
│                                                          │
│  DISCOVER      DEFINE       BUILD        LAUNCH         │
│  (2-4 weeks)   (2 weeks)    (Sprints)    (Ongoing)     │
│                                                          │
│  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐    │
│  │Problem │   │Solution│   │Iterative│  │GTM &   │    │
│  │Space   │──▶│Design  │──▶│Build   │──▶│Growth  │    │
│  │Research│   │& MVP   │   │& Test  │   │        │    │
│  └────────┘   └────────┘   └────────┘   └────────┘    │
│                                                          │
│  • User research• PRD/Spec  • 2-week    • Beta launch  │
│  • Market       • UX design   sprints   • Feedback     │
│    analysis    • Tech design• CI/CD       loops         │
│  • Competitor  • MVP scope  • User      • Metrics      │
│    analysis    • Success      testing     tracking      │
│  • Opportunity   metrics    • Iterate   • Scale        │
│    sizing                                               │
└─────────────────────────────────────────────────────────┘
```

**Product Review Cadence:**

| Review | Frequency | Attendees | Focus |
|--------|-----------|-----------|-------|
| Sprint Review | Bi-weekly | Product team | What we built |
| Product Review | Monthly | Product + Leadership | Metrics, direction |
| Strategy Review | Quarterly | Leadership + Stakeholders | Vision, roadmap, pivot? |

---

## Phần 3: Engineering Practices

### 3.1 Development Standards

**Code Quality:**
```
1. Code Review
   • Every PR reviewed by ≥ 1 peer
   • Checklist: functionality, readability, security, performance
   • Max review time: 24 hours

2. Coding Standards
   • Language-specific style guides (documented)
   • Linting & formatting automated (pre-commit hooks)
   • Naming conventions documented

3. Version Control
   • Git flow or trunk-based (choose per team)
   • Meaningful commit messages
   • Branch naming convention
   • PR template with context
```

**Testing Strategy:**
```
Testing Pyramid:

        /\
       /  \     E2E Tests (10%)
      /    \    → Critical user journeys only
     /──────\
    /        \  Integration Tests (20%)
   /          \ → API contracts, service interactions
  /────────────\
 /              \ Unit Tests (70%)
/________________\→ Business logic, utilities, edge cases

Targets:
• Code coverage: ≥ 70% (new code: ≥ 80%)
• Critical path: 100% covered
• Automated regression suite
• Performance tests for critical APIs
```

**CI/CD Pipeline:**
```
Code Push → Lint → Build → Unit Test → Integration Test
    ↓
Code Review → Merge → Build → Full Test Suite
    ↓
Staging Deploy → Smoke Test → Manual QA (if needed)
    ↓
Production Deploy (automated or manual gate)
    ↓
Monitoring & Alerts
```

### 3.2 Architecture Governance

| Decision | Process | Documentation |
|----------|---------|---------------|
| Technology stack (new project) | ADR + CTO approval | Architecture Decision Record |
| New library/framework | Tech Lead review | ADR |
| Database design | Architect review | ER diagram + rationale |
| API design | API review (team) | OpenAPI spec |
| Security-sensitive changes | Security review | Threat model |
| Infrastructure changes | Ops review | Infrastructure-as-Code |

**ADR (Architecture Decision Record) Template:**
```
# ADR-XXX: [Title]
Status: [Proposed | Accepted | Deprecated | Superseded]
Date: YYYY-MM-DD

## Context
What is the issue?

## Decision
What did we decide?

## Consequences
What are the trade-offs?
```

---

## Phần 4: Estimation & Planning

### 4.1 Estimation Framework

**Three-Point Estimation:**
```
Estimate = (Optimistic + 4×Most Likely + Pessimistic) / 6

Example:
Task: Build user authentication module
Optimistic: 3 days
Most Likely: 5 days
Pessimistic: 10 days
Estimate = (3 + 20 + 10) / 6 = 5.5 days → round to 6 days
```

**Story Point Reference:**
| Points | Complexity | Example |
|--------|-----------|---------|
| 1 | Trivial | Config change, copy update |
| 2 | Simple | Simple CRUD endpoint |
| 3 | Medium | Feature with business logic |
| 5 | Complex | Integration with external service |
| 8 | Very Complex | New module with multiple components |
| 13 | Epic-level | Break down further |

### 4.2 Project Planning Checklist

```
□ Requirements documented and approved
□ Architecture designed and reviewed
□ Technology stack confirmed
□ Team identified and available
□ Environment setup complete
□ CI/CD pipeline configured
□ Communication plan agreed
□ Risk register created
□ Definition of Done agreed
□ Sprint cadence and ceremonies defined
□ Reporting format agreed with client
□ Escalation process defined
```

---

## Phần 5: Metrics & Continuous Improvement

### 5.1 Engineering Metrics (DORA + thêm)

| Metric | Definition | Target | Tool |
|--------|-----------|--------|------|
| **Deployment Frequency** | How often code deploys to production | Weekly+ | CI/CD tool |
| **Lead Time for Changes** | Commit to production | < 1 week | Git + CI/CD |
| **Change Failure Rate** | % deployments causing failure | < 15% | Incident tracker |
| **MTTR** | Mean time to restore service | < 1 hour | Monitoring |
| **Code Coverage** | % code covered by tests | ≥ 70% | Test tool |
| **PR Review Time** | Time from PR open to merge | < 24 hours | Git platform |
| **Defect Escape Rate** | Bugs found in prod vs pre-prod | Decreasing | Bug tracker |
| **Velocity** | Story points completed per sprint | Stable/increasing | Project tool |

### 5.2 Retrospective Framework

**Sau mỗi Sprint / mỗi Project:**

```
Format: Start - Stop - Continue

START doing:
• What should we begin doing that we haven't tried?

STOP doing:
• What is not working and we should drop?

CONTINUE doing:
• What is working well and we should keep?

Action Items:
• Max 3 concrete actions
• Assign owner + deadline
• Review in next retro
```

### 5.3 Knowledge Management

```
1. Project Wiki (per project)
   • Architecture overview
   • Setup guide
   • Key decisions log
   • Runbook (for ops)

2. Company Knowledge Base
   • Technology standards
   • Reusable components library
   • Lessons learned database
   • Onboarding guides

3. Community of Practice (CoP)
   • Monthly tech talks
   • Technology-specific groups
   • Code kata / hackathon quarterly
   • External conference participation
```

---

## Phần 6: Transition Plan cho PDLC Mới

### 6.1 Implementation Roadmap

```
Month 1-2: Foundation
├── Document current processes (as-is)
├── Define target processes (to-be) per service type
├── Select & set up tools (Jira, Git, CI/CD)
└── Train team leads on new framework

Month 3-4: Pilot
├── Apply new PDLC on 2-3 projects (mix of types)
├── Weekly retrospective to adjust
├── Collect metrics baseline
└── Document lessons learned

Month 5-6: Rollout
├── Extend to all new projects
├── Existing projects transition at natural breakpoints
├── Establish CoP and knowledge sharing
└── First quarterly engineering review

Month 7-12: Optimize
├── Analyze metrics trends
├── Identify and address bottlenecks
├── Automate manual processes
└── Refine estimation accuracy
```

### 6.2 Change Management

| Resistance | Root Cause | Mitigation |
|-----------|-----------|------------|
| "Quá nhiều process" | Fear of bureaucracy | Show lightweight version, prove it saves time |
| "Đang chạy project, không có thời gian" | Competing priorities | Pilot on new projects first |
| "Agile không phù hợp khách hàng X" | Client constraints | Adapt methodology, keep core principles |
| "Tool mới khó dùng" | Learning curve | Training + buddy system |
| "Metrics để theo dõi, không để help" | Trust issue | Transparent about purpose, team-level not individual |

---

## Deliverables Sau Module 5

1. ✅ Current PDLC assessment
2. ✅ PDLC framework cho từng service type
3. ✅ Engineering standards documentation
4. ✅ Quality gates definition
5. ✅ Estimation framework
6. ✅ Metrics dashboard setup
7. ✅ PDLC implementation roadmap
8. ✅ Change management plan

---

## Tổng Kết: Liên Kết 5 Module

```
Module 1 (Business Model)
    → Xác định HƯỚNG ĐI: Dolphin muốn trở thành gì?
    
Module 2 (Portfolio)
    → Xác định SẢN PHẨM: Bán gì để đạt hướng đi đó?
    
Module 3 (BD Framework)
    → Xác định CÁCH BÁN: Đưa sản phẩm ra thị trường thế nào?
    
Module 4 (Org & Ops)
    → Xác định TỔ CHỨC: Cần tổ chức con người thế nào?
    
Module 5 (PDLC)
    → Xác định CÁCH LÀM: Quy trình phát triển sản phẩm/dịch vụ
    
Tất cả cùng hướng tới: Dolphin Technology chuyển đổi thành công
từ [mô hình hiện tại] sang [mô hình mục tiêu] trong 3 năm.
```
