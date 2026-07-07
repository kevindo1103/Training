// STUB CONFIG — chỉ dùng để test shell layout
// Sẽ được thay bằng module1.config.js từ issue #3
export const MODULE_STUB = {
  moduleId: "module1",
  moduleTitle: "MODULE 01",
  moduleSubtitle: "Mô Hình Kinh Doanh",
  activities: [
    {
      id: "activity_1",
      name: "Chẩn đoán mô hình hiện tại",
      type: "survey",
      icon: "vital_signs",
      intro: {
        purpose: "Đánh giá mức độ sẵn sàng chuyển từ custom software studio sang Service-Funded Product Company.",
        howTo: "Trả lời 10 câu hỏi theo thang điểm 1–5 dựa trên thực trạng của Dolphin.",
        example: "Nếu công ty vẫn phụ thuộc 90% doanh thu vào dịch vụ custom, đánh giá 'Cần chuyển đổi'.",
        estimatedTime: "8 phút",
      },
    },
    {
      id: "activity_2",
      name: "BMC — Hiện tại",
      type: "form",
      icon: "grid_view",
      intro: {
        purpose: "Vẽ lại Business Model Canvas của Dolphin như hiện tại, không như mong muốn.",
        howTo: "Điền 9 ô BMC và 4 câu thảo luận dựa trên thực tế hoạt động hiện tại.",
        example: "Khách hàng chính: Vietlot, khách sạn IPTV, đơn vị tổ chức sự kiện, tòa soạn báo.",
        estimatedTime: "15 phút",
      },
    },
    {
      id: "activity_3",
      name: "BMC — Mục tiêu Year 3",
      type: "form",
      icon: "target",
      intro: {
        purpose: "Xây dựng BMC mục tiêu năm thứ 3 và lộ trình phân bổ nguồn lực.",
        howTo: "Điền 9 ô BMC mục tiêu, sau đó đặt tỷ lệ Service/Product: 85:15 → 70:30 → 50:50.",
        example: "Năm 3: 50% nguồn lực cho product, 50% cho service.",
        estimatedTime: "15 phút",
      },
    },
    {
      id: "activity_4",
      name: "Product Scoring Matrix",
      type: "matrix",
      icon: "scoreboard",
      intro: {
        purpose: "Đánh giá 4 sản phẩm tiềm năng theo 7 tiêu chí có trọng số.",
        howTo: "Chấm điểm 1–5 cho từng sản phẩm × tiêu chí, hệ thống sẽ tự xếp hạng.",
        example: "VB Điện tử có tiềm năng recurring cao → có thể điểm cao ở tiêu chí Recurring potential.",
        estimatedTime: "20 phút",
      },
    },
    {
      id: "activity_5",
      name: "Invest / Watch / Kill",
      type: "form",
      icon: "category",
      intro: {
        purpose: "Phân loại 4 sản phẩm vào nhóm đầu tư, theo dõi hay dừng lại.",
        howTo: "Dựa trên kết quả Scoring Matrix, chọn INVEST 1 sản phẩm duy nhất, phân loại phần còn lại.",
        example: "Chỉ được chọn 1 sản phẩm INVEST; 3 sản phẩm còn lại đặt vào Watch hoặc Kill.",
        estimatedTime: "10 phút",
      },
    },
    {
      id: "activity_6",
      name: "Financial Model",
      type: "form",
      icon: "account_balance",
      intro: {
        purpose: "Ước tính tài chính hiện tại, năm 1 và năm 3 khi chuyển đổi mô hình.",
        howTo: "Nhập doanh thu, chi phí, margin và đầu tư product; hệ thống tự tính profit/runway.",
        example: "Nếu năm 1 đầu tư product 15% ngân sách, margin dự kiến thay đổi như thế nào?",
        estimatedTime: "15 phút",
      },
    },
  ],
};
