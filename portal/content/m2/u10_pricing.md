## Mục đích

- Hiểu tại sao pricing là đòn bẩy lớn nhất cho margin (không cần thêm người).
- Nắm 6 pricing models và margin profile của mỗi model.
- Thiết kế pricing cho từng product + lộ trình migration từ T&M.

**Tại sao:** T&M có structural problem: team làm nhanh hơn = doanh thu thấp hơn. Chuyển sang subscription/value-based là cách decouple revenue khỏi headcount.

**Output:** Pricing Table per product + Migration Path + Revenue Projection.

---

## T&M Trap — Vấn đề cấu trúc

> **Time & Material:** Revenue = Giờ làm × Rate

**Vấn đề:** Team efficient hơn → ít giờ hơn → ít revenue hơn. Revenue gắn chặt với headcount.

Muốn tăng doanh thu? → Tuyển thêm người. Nhưng margin không tăng vì chi phí nhân sự tăng tương ứng.

→ **Cần chuyển sang model decouple revenue khỏi headcount.**

---

## Pricing là đòn bẩy lớn nhất

Ví dụ: Dolphin có dịch vụ margin 25%

| Hành động | Revenue | Cost | Margin | Profit change |
|-----------|---------|------|--------|--------------|
| Hiện tại | 100 | 75 | 25% | Baseline |
| Tăng giá 10% | 110 | 75 | 32% | **+40% profit** |
| Giảm chi phí 10% | 100 | 67.5 | 32.5% | +30% profit |
| Tăng volume 10% | 110 | 82.5 | 25% | +10% profit |

→ Tăng giá 10% tạo profit impact lớn nhất mà **không cần thêm người**.

---

## 6 Pricing Models cho IT Company

| Model | Mô tả | Phù hợp khi | Margin tiềm năng |
|-------|--------|-------------|------------------|
| **Time & Material** | Charge theo giờ/ngày | Scope không rõ, khách muốn flexible | 20-30% |
| **Fixed Price** | Giá cố định cho project | Scope rõ ràng, Dolphin có kinh nghiệm | 25-40% |
| **Retainer** | Phí cố định hàng tháng | Ongoing support, team dedication | 25-35% |
| **Managed Service** | SLA-based, outcome defined | Mature service, predictable delivery | 30-45% |
| **Value-based** | Pricing theo giá trị business | Consulting, unique IP, high expertise | 40-60% |
| **Subscription** | SaaS pricing cho products | Sản phẩm riêng | 60-80% |

### Tại sao Subscription margin cao nhất?

Chi phí phục vụ thêm 1 khách hàng gần bằng 0 (marginal cost thấp). Phần mềm build 1 lần → bán cho nhiều khách → margin tăng theo scale.

### Value-based Pricing

Tính giá theo giá trị mang lại cho khách, không theo giờ.

**Ví dụ:** Giải pháp số hóa tiết kiệm cho khách 500M/năm → charge 100M/năm → khách vui, Dolphin margin 60%+.

Yêu cầu: phải đo được ROI rõ ràng + expertise cao.

---

## Pricing Migration Path

```
Current State:           Target State (3 năm):
T&M: 70%              → T&M: 30%
Fixed Price: 25%       → Fixed Price: 20%
Other: 5%              → Managed/Value: 30%
                       → Subscription/Product: 20%
```

### Lộ trình migration

**Year 1:**
- Giữ T&M cho existing contracts
- Pilot managed service với 1-2 khách hàng
- Launch subscription pricing cho sản phẩm INVEST
- Target: T&M giảm từ 70% → 50%

**Year 2:**
- Convert T&M clients sang retainer/managed
- Scale subscription model
- Introduce value-based cho consulting
- Target: T&M giảm từ 50% → 35%

**Year 3:**
- T&M chỉ cho new/uncertain scope
- Managed + Value-based là main service model
- Subscription đóng góp 20%+ revenue
- Target: T&M = 30%, margin tổng thể tăng 10+ points
