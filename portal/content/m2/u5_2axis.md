## Mục đích

- Hiểu ma trận 2 trục: Internal Readiness × Market Opportunity.
- Plot 4 sản phẩm vào quadrant phù hợp.
- Chọn chiến lược testing cho từng sản phẩm dựa trên vị trí quadrant.

**Tại sao:** Scoring chỉ cho biết readiness tổng thể. 2-Axis testing tách riêng internal vs market để chọn chiến lược đúng.

**Output:** Quadrant placement + testing strategy cho mỗi sản phẩm.

---

## Ma trận 2 trục

Spin-off scoring ở Unit 4 cho 1 con số tổng thể. Nhưng 2 sản phẩm cùng điểm 3.5 có thể có profile rất khác:

- **SP A:** Internal Readiness cao (team sẵn sàng) nhưng Market thấp (chưa rõ demand)
- **SP B:** Internal thấp (team chưa có) nhưng Market cao (demand rõ ràng)

→ Chiến lược testing phải khác nhau.

---

## 2 Trục đánh giá

### Trục 1: Internal Readiness (1-5)

Đánh giá năng lực nội bộ:
- **Team:** Có product owner, developer, support chưa?
- **Tech:** Stack ổn định, maintainable, scalable?
- **Process:** Có CI/CD, QA, release process?
- **Brand:** Đã có tên, positioning, nhận diện?

### Trục 2: Market Opportunity (1-5)

Đánh giá cơ hội thị trường:
- **Demand:** Khách hàng có pain point thực sự?
- **Market size:** Thị trường đủ lớn cho growth?
- **Growth:** Thị trường đang tăng trưởng?
- **Competitive gap:** Đối thủ chưa giải quyết tốt?

---

## 4 Quadrants

```
    Market Opportunity (High)
         │
    BUILD│    AGGRESSIVE
    CAPABILITY   SCALE
    FIRST│
    ─────┼────────────
    DEPRI│    FIND
    ORITIZE    MARKET
         │
    Market Opportunity (Low)

    Internal Readiness →
    (Low)            (High)
```

### Quadrant 1: Aggressive Scale (Internal cao + Market cao)

Sản phẩm sẵn sàng cả nội bộ lẫn thị trường.

**Chiến lược:** Đầu tư mạnh, scale nhanh, tăng team, marketing push.

### Quadrant 2: Build Capability First (Internal thấp + Market cao)

Thị trường hấp dẫn nhưng Dolphin chưa sẵn sàng.

**Chiến lược:** Ưu tiên build team, upgrade tech stack, establish process — sau đó mới scale.

### Quadrant 3: Find Market (Internal cao + Market thấp)

Dolphin có năng lực nhưng chưa tìm được market fit.

**Chiến lược:** Validate demand, thử segments khác nhau, pivot positioning. Dùng Lean Startup methods (Unit 7-9).

### Quadrant 4: Deprioritize / Monitor (Internal thấp + Market thấp)

Cả internal lẫn market đều yếu.

**Chiến lược:** Không đầu tư thêm, monitor thị trường, đánh giá lại sau 6-12 tháng. Có thể sunset nếu không cải thiện.

---

## Áp dụng cho Dolphin

Với mỗi sản phẩm:

1. Chấm Internal Readiness (1-5) dựa trên đánh giá team, tech, process, brand
2. Chấm Market Opportunity (1-5) dựa trên demand, market size, growth, competitive gap
3. Plot vào quadrant tương ứng
4. Chọn chiến lược testing phù hợp
5. Lập hành động cụ thể trong 90 ngày

Kết quả 2-Axis bổ sung cho scoring Unit 4: giúp chọn **cách** test, không chỉ **nên** test hay không.
