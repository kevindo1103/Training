# [BUG] Module 2 Lecture Content — Sai Source + Thiếu Nội Dung

**Labels:** `for:training-content` · `bug` · `content` · `priority:high`
**Assignee:** Training_Content session
**Ref:** Staging screenshot 2026-07-09, Unit 2 "Portfolio Inventory & Classification"

---

## Mô tả

Lecture content Module 2 trên staging (`staging.dolphin.iceflow.cloud/?module=2`) có 2 vấn đề nghiêm trọng:

### 1. Sai source — đang dùng file cũ

Content trên staging lấy từ `02_Product_Service_Portfolio/MODULE_02_Portfolio.md` (bản academic gốc).

**Source đúng:** `Module2_Dolphin_Technology.docx` v3.0 (41 trang, Course Format, 2026-07-09).

Bằng chứng sai source:
- Hiển thị "Staff Augmentation" — Dolphin không làm staff aug (CEO đã reject hướng outsourcing, ref Module 1 Bối Cảnh)
- Hiển thị "Consulting & Advisory", "AI/ML Solutions", "Cloud Migration & DevOps" — generic categories không relevant Dolphin
- Không có tên 4 sản phẩm thật (VB Điện tử, IPTV Khách sạn, Event/Ticket, CMS/Tòa soạn)

> Vi phạm CLAUDE.md anti-pattern: "generic placeholder không relevant Dolphin → Dolphin-specific hoặc flag [NEEDS_INFO]"

### 2. Lecture content bị strip thành bullet list

Docx v3 Unit 2 Lecture ("Service Typology & Portfolio Analysis") có:
- Paragraphs giải thích framework + tại sao phân loại quan trọng
- Bảng Service Typology (loại dịch vụ × đặc điểm × ví dụ Dolphin)
- Classification framework (Core / Value-Add / Emerging) với định nghĩa từng loại
- Strategic role: cash engine vs margin lever vs growth bet
- Ví dụ Dolphin-specific cho mỗi category

Trên staging chỉ còn:
- 3 bullet mục đích
- Flat list tên service types (không context, không giải thích, không bảng)
- 3 action items cuối

→ Participant đọc không hiểu tại sao thông tin này quan trọng, không có framework để phân loại.

## Ảnh hưởng

- **Tất cả 11 units** có thể bị ảnh hưởng (nếu cùng approach copy content)
- Participant không thể tự học — vi phạm UX requirement "Self-serve" (CLAUDE.md §UX #1)
- Quiz questions sẽ không match lecture content → participant fail quiz vì chưa được dạy

## Cách fix

1. **Source:** Chỉ dùng `Module2_Dolphin_Technology.docx` v3.0 — file nằm tại root `D:\Dolphin_Technology_Training\`
2. **Content:** Copy TOÀN BỘ lecture sections từ docx, bao gồm:
   - Paragraphs giải thích (không strip thành bullet)
   - Tables (giữ nguyên structure)
   - Definition boxes (term + definition)
   - Ví dụ và comparison
3. **Verify:** Sau fix, cross-check mỗi unit: lecture content trên platform phải match docx section `N.2 Lecture`
4. **Render:** Nếu lecture renderer chưa hỗ trợ tables/definitions → escalate issue `for:training-frontend` để add rich content types

## Checklist verify (sau fix)

- [ ] Unit 1: Lecture match docx "1.2 Lecture: Mô hình SFPC"
- [ ] Unit 2: Lecture match docx "2.2 Lecture: Service Typology" — NO "Staff Augmentation"
- [ ] Unit 3: Lecture match docx "3.2 Lecture: Brand Architecture cho IT Company"
- [ ] Unit 4: Lecture match docx "4.2 Lecture: Spin-off & BU Independence"
- [ ] Unit 5: Lecture match docx "5.2 Lecture: Ma Trận 2 Trục"
- [ ] Unit 6: Lecture match docx "6.2 Lecture: Sprint Planning & Decision Framework"
- [ ] Unit 7: Lecture match docx "7.2 Lecture: Lean Startup cho Công ty Dịch vụ"
- [ ] Unit 8: Lecture match docx "8.2 Lecture: MVP Scope & Experiment Design"
- [ ] Unit 9: Lecture match docx "9.2 Lecture: Kill Discipline & Innovation Accounting"
- [ ] Unit 10: Lecture match docx "10.2 Lecture: Pricing Strategy cho IT Company"
- [ ] Unit 11: Lecture match docx "11.2 Lecture: Portfolio Governance & Three Horizons"
- [ ] Không còn "Staff Augmentation", "Consulting & Advisory", "AI/ML Solutions" (generic terms từ bản cũ)
- [ ] 4 tên sản phẩm thật xuất hiện đúng: VB Điện tử (Vietlot), IPTV Khách sạn, Event/Ticket, CMS/Tòa soạn

## References

- Source of truth: `Module2_Dolphin_Technology.docx` v3.0 (root folder)
- Implementation guide: `docs/MODULE2_IMPLEMENTATION_GUIDE.md` v2 (§2.14 Lecture Content format)
- CLAUDE.md §Content Source of Truth, §Known Content Errors, §Anti-Patterns
