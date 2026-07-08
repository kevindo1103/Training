## Mục đích

- Hiểu MVP scoping: build ít nhất có thể để validate core hypothesis.
- Nắm Experiment Canvas: hypothesis → experiment → metric → timeline.
- Thiết kế MVP cho 1-2 ý tưởng đã pass screening.

**Tại sao:** MVP không phải "version 1" — mà là artifact nhỏ nhất để test hypothesis. Scoping đúng tiết kiệm hàng tháng effort.

**Output:** MVP Scope + Brand Name + Experiment Canvas.

---

## MVP không phải "Version 1 thiếu tính năng"

Hiểu sai phổ biến:

| Hiểu sai | Hiểu đúng |
|----------|-----------|
| MVP = v1 với ít features | MVP = artifact nhỏ nhất để test hypothesis |
| MVP phải là phần mềm | MVP có thể là landing page, demo, concierge |
| MVP phải hoàn chỉnh UX | MVP chỉ cần đủ để khách hiểu và phản hồi |
| MVP build xong thì xong | MVP là bước đầu của loop — iterate dựa trên data |

---

## MVP Scoping Rules

### Rule 1: Tối đa 3 core features

Nhiều hơn 3 features → quá lâu để build, khó xác định feature nào tạo giá trị thật.

**Ví dụ HotelOps:**
1. Booking management (core)
2. Digital check-in (differentiator)
3. Revenue dashboard (value proof)

**KHÔNG bao gồm trong MVP:**
- Multi-property support
- AI pricing optimization
- Integration với 10 PMS khác
→ Build sau nếu hypothesis validated.

### Rule 2: Timeline ≤ 6 tuần

Nếu mất hơn 6 tuần để build MVP → scope quá lớn, cắt thêm.

### Rule 3: Budget rõ ràng

Biết trước tốn bao nhiêu → dễ commit/kill. Không có budget rõ = scope creep.

---

## Experiment Canvas

Cho mỗi MVP, thiết kế experiment:

| Phần | Câu hỏi | Ví dụ |
|------|---------|-------|
| **Hypothesis** | Tin gì? | "Khách sạn 3-4 sao sẵn sàng trả 2M/tháng cho hệ thống quản lý tích hợp" |
| **Experiment type** | Test thế nào? | Pilot with real customer |
| **Success metric** | Đo bằng gì? | ≥3 khách sạn dùng thử, ≥1 trả tiền |
| **Timeline** | Bao lâu? | 4 tuần pilot |
| **Budget** | Tốn bao nhiêu? | 50 triệu VND |

### Các loại experiment

| Loại | Mô tả | Phù hợp khi |
|------|--------|------------|
| Landing page test | Trang web + đo sign-ups | Validate demand tổng quát |
| Concierge MVP | Phục vụ bằng tay | Validate workflow + willingness to pay |
| Wizard of Oz | UI tự động, backend manual | Validate UX + adoption |
| Prototype + user test | Demo interactable | Validate usability + feature fit |
| Pilot with real customer | MVP thật với khách thật | Validate full hypothesis |

---

## Brand cho sản phẩm mới

Áp dụng brand architecture đã chọn ở Unit 3:

**Endorsed format:** `[Tên sản phẩm] by Dolphin Technology`

Cần xác định:
- **Brand name:** Ngắn gọn, gợi chức năng
- **Tagline:** 1 câu mô tả giá trị
- **Positioning statement:** "Cho [target], [product] là [category] giúp [benefit] khác biệt bởi [differentiator]"

Naming từ sớm quan trọng vì:
1. Khách hàng pilot cần gọi tên sản phẩm
2. Quá trình đặt tên buộc team rõ ràng about positioning
3. Brand consistency từ đầu → dễ build recognition sau
