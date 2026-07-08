export const MODULE_CONFIG = {
  id: "module1",
  title: "Module 1: Tái Cấu Trúc Mô Hình Kinh Doanh",
  subtitle: "Restructuring Business Model",
  description:
    "Chẩn đoán mô hình kinh doanh hiện tại của Dolphin, thiết kế mô hình mục tiêu Service-Funded Product Company, và chọn sản phẩm đầu tiên để đầu tư.",
  estimatedTime: "25-30 phút",

  products: [
    {
      id: "vb_dien_tu",
      name: "VB Điện tử (Vietlot)",
      icon: "description",
      category: "Document Management",
    },
    {
      id: "iptv_khach_san",
      name: "IPTV Khách sạn",
      icon: "hotel",
      category: "Hospitality Entertainment",
    },
    {
      id: "event_ticket",
      name: "Event/Ticket",
      icon: "confirmation_number",
      category: "Event Management",
    },
    {
      id: "cms_toa_soan",
      name: "CMS/Tòa soạn",
      icon: "newspaper",
      category: "Digital Newsroom CMS",
    },
  ],

  scoringCriteria: [
    {
      id: "market_size",
      label: "Market size",
      weight: 0.2,
      description: "Số lượng khách hàng tiềm năng tại VN",
    },
    {
      id: "recurring_potential",
      label: "Recurring potential",
      weight: 0.2,
      description: "Khách hàng có trả phí định kỳ hàng tháng/năm không?",
    },
    {
      id: "reusability",
      label: "Reusability",
      weight: 0.15,
      description:
        "Bao nhiêu phần trăm mã nguồn có thể dùng lại cho khách hàng khác?",
    },
    {
      id: "competitive_gap",
      label: "Competitive gap",
      weight: 0.15,
      description: "Mức độ cạnh tranh trên thị trường hiện tại",
    },
    {
      id: "domain_expertise",
      label: "Domain expertise",
      weight: 0.1,
      description:
        "Mức độ hiểu biết chuyên sâu của Dolphin trong lĩnh vực này",
    },
    {
      id: "sales_without_ceo",
      label: "Sales không qua CEO",
      weight: 0.1,
      description: "Khả năng bán hàng mà không phụ thuộc vào CEO",
    },
    {
      id: "margin_potential",
      label: "Margin potential",
      weight: 0.1,
      description: "Mức giá khách hàng sẵn sàng chi trả",
    },
  ],

  resourceAllocation: [
    { year: 1, service: 85, product: 15 },
    { year: 2, service: 70, product: 30 },
    { year: 3, service: 50, product: 50 },
  ],

  activities: [
    {
      id: "activity_1",
      title: "Chẩn đoán mô hình hiện tại",
      type: "survey",
      icon: "analytics",
      estimatedTime: "5 phút",
      intro: {
        purpose:
          "Đánh giá mức độ phụ thuộc của Dolphin vào mô hình Custom Software Studio hiện tại và xác định mức độ cấp thiết cần chuyển đổi.",
        instructions:
          "Đọc từng phát biểu và chấm điểm từ 1 (Không đúng) đến 5 (Hoàn toàn đúng) theo thực tế tại Dolphin.",
        example:
          "Nếu doanh thu Dolphin phụ thuộc rất nhiều vào CEO tìm thương vụ, chấm 4 hoặc 5. Nếu đã có kênh bán hàng khác, chấm 1 hoặc 2.",
      },
      scale: {
        min: 1,
        max: 5,
        minLabel: "Không đúng",
        maxLabel: "Hoàn toàn đúng",
      },
      questions: [
        {
          id: "q1",
          text: "Doanh thu phụ thuộc vào khả năng tìm thương vụ của CEO",
          helper:
            "Nếu CEO không chủ động tìm khách, pipeline có bị trống không?",
        },
        {
          id: "q2",
          text: "Nếu CEO vắng mặt, phần lớn pipeline bán hàng bị đình trệ",
          helper:
            "Hãy tưởng tượng CEO nghỉ 6 tháng — pipeline sẽ ra sao?",
        },
        {
          id: "q3",
          text: "Đội ngũ nhàn rỗi trong khoảng trống giữa hai dự án (bench time cao)",
          helper:
            "Có bao nhiêu người ngồi chờ dự án mới trong quý vừa rồi?",
        },
        {
          id: "q4",
          text: "Mỗi dự án mới phải tìm hiểu lĩnh vực mới từ đầu",
          helper:
            "Dự án gần nhất đội ngũ mất bao lâu để hiểu lĩnh vực khách hàng?",
        },
        {
          id: "q5",
          text: "Khó định giá vì mỗi dự án hoàn toàn khác nhau",
          helper:
            "Bao nhiêu phần trăm dự án bị lệch ước tính hơn 30% so với thực tế?",
        },
        {
          id: "q6",
          text: "Không có sản phẩm nào tiếp tục tạo doanh thu sau khi bàn giao",
          helper:
            "Sau khi bàn giao xong, Dolphin có còn nhận được doanh thu từ sản phẩm đó không?",
        },
        {
          id: "q7",
          text: "Khách hàng ít quay lại (dự án chỉ thực hiện một lần)",
          helper:
            "Trong 5 năm qua, bao nhiêu phần trăm khách hàng quay lại đặt dự án mới?",
        },
        {
          id: "q8",
          text: "Khó tuyển dụng vì không có thương hiệu chuyên sâu trong ngành nào cụ thể",
          helper:
            "Khi tuyển dụng, Dolphin giới thiệu mình là công ty chuyên về lĩnh vực gì?",
        },
        {
          id: "q9",
          text: "Biên lợi nhuận bị ép vì không có đòn bẩy (tài sản trí tuệ, nền tảng tái sử dụng)",
          helper:
            "Khách hàng có hay so sánh giá với đối thủ và ép giá không?",
        },
        {
          id: "q10",
          text: "Doanh thu không thể dự báo quá 3–6 tháng",
          helper:
            "Hiện tại Dolphin có thể dự báo doanh thu được bao xa?",
        },
      ],
      scoring: {
        totalMin: 10,
        totalMax: 50,
        thresholds: [
          {
            min: 0,
            max: 15,
            level: "success",
            label: "Tình hình chưa nghiêm trọng",
            description:
              "Tối ưu hóa mô hình hiện tại",
          },
          {
            min: 16,
            max: 30,
            level: "warning",
            label: "Cần chuyển đổi có kế hoạch trong 1–2 năm tới",
            description:
              "Mô hình hiện tại đang bộc lộ điểm yếu, cần lên kế hoạch chuyển đổi",
          },
          {
            min: 31,
            max: 50,
            level: "error",
            label: "Cần chuyển đổi khẩn cấp",
            description:
              "Mô hình hiện tại không bền vững, cần hành động ngay",
          },
        ],
      },
    },

    {
      id: "activity_2",
      title: "Business Model Canvas — Hiện tại",
      type: "form",
      icon: "architecture",
      layout: "bmc_grid",
      estimatedTime: "5-7 phút",
      intro: {
        purpose:
          "Vẽ lại toàn cảnh mô hình kinh doanh hiện tại của Dolphin để thấy rõ điểm mạnh, điểm yếu và sự phụ thuộc.",
        instructions:
          "Điền từng ô canvas theo THỰC TẾ hiện tại — không phải mong muốn. Trả lời trung thực giúp xác định đúng vấn đề cần giải quyết.",
        example:
          "Ô Đối tác chính: ghi tên các đối tác thực sự đang hợp tác, không phải đối tác mong muốn.",
      },
      fields: [
        {
          id: "key_partners",
          label: "Đối tác chính",
          type: "textarea",
          section: "bmc",
          explanation: "Ai là đối tác quan trọng giúp Dolphin vận hành?",
          placeholder:
            "Vd: Khách hàng giới thiệu qua CEO, đối tác công nghệ, nhà cung cấp cloud...",
          helper:
            "Liệt kê các đối tác, nhà cung cấp, và mối quan hệ kinh doanh quan trọng nhất.",
        },
        {
          id: "key_activities",
          label: "Hoạt động chính",
          type: "textarea",
          section: "bmc",
          explanation:
            "Hoạt động chính nào tạo ra giá trị cho khách hàng?",
          placeholder:
            "Vd: Phân tích yêu cầu khách hàng, phát triển phần mềm theo đơn, bàn giao & bảo trì...",
          helper:
            "Những công việc cốt lõi Dolphin phải làm hàng ngày để giao hàng cho khách.",
        },
        {
          id: "value_proposition",
          label: "Giá trị cung cấp",
          type: "textarea",
          section: "bmc",
          explanation:
            "Tại sao khách hàng chọn Dolphin thay vì đối thủ?",
          placeholder:
            'Vd: "Chúng tôi phát triển phần mềm theo yêu cầu của quý khách", giá cạnh tranh, đội ngũ VN linh hoạt...',
          helper:
            "Giá trị độc đáo mà Dolphin mang lại — viết như đang giải thích cho khách hàng.",
        },
        {
          id: "key_resources",
          label: "Nguồn lực chính",
          type: "textarea",
          section: "bmc",
          explanation:
            "Tài sản và nguồn lực quan trọng nhất của Dolphin?",
          placeholder:
            "Vd: ~50 kỹ sư, mạng lưới quan hệ của CEO, kinh nghiệm nhiều lĩnh vực, mã nguồn từ các dự án cũ...",
          helper:
            "Con người, tài sản trí tuệ, mối quan hệ, tài chính — thứ gì không thể thiếu?",
        },
        {
          id: "customer_relationships",
          label: "Quan hệ khách hàng",
          type: "textarea",
          section: "bmc",
          explanation:
            "Dolphin duy trì quan hệ với khách hàng như thế nào?",
          placeholder:
            "Vd: Quan hệ cá nhân của CEO, theo dự án (đa số kết thúc sau bàn giao)...",
          helper:
            "Kiểu quan hệ nào? Dài hạn hay ngắn hạn? Chủ động hay bị động?",
        },
        {
          id: "channels",
          label: "Kênh phân phối",
          type: "textarea",
          section: "bmc",
          explanation:
            "Dolphin tiếp cận khách hàng qua kênh nào?",
          placeholder:
            "Vd: Mạng lưới quan hệ cá nhân của CEO (chính), giới thiệu từ khách cũ...",
          helper:
            "Liệt kê tất cả cách Dolphin tìm và tiếp cận khách hàng mới.",
        },
        {
          id: "customer_segments",
          label: "Phân khúc khách hàng",
          type: "textarea",
          section: "bmc",
          explanation: "Ai là khách hàng của Dolphin?",
          placeholder:
            "Vd: Vietlot (xổ số), khách sạn (hospitality), sự kiện/giải trí, báo chí/truyền thông...",
          helper:
            "Nhóm khách hàng nào đang trả tiền cho Dolphin? Ngành nào nhiều nhất?",
        },
        {
          id: "cost_structure",
          label: "Cơ cấu chi phí",
          type: "textarea",
          section: "bmc",
          explanation: "Chi phí lớn nhất của Dolphin là gì?",
          placeholder:
            "Vd: Lương (~70-80% tổng chi phí), văn phòng, hạ tầng/cloud, thời gian bán hàng của CEO...",
          helper:
            "Ước tính tỷ lệ phần trăm từng khoản chi phí chính.",
        },
        {
          id: "revenue_streams",
          label: "Nguồn doanh thu",
          type: "textarea",
          section: "bmc",
          explanation: "Dolphin kiếm tiền từ đâu?",
          placeholder:
            "Vd: Phí dự án (fixed/T&M), hợp đồng bảo trì, doanh thu định kỳ = ?%...",
          helper:
            "Liệt kê nguồn thu và ước tính phần trăm mỗi nguồn trên tổng doanh thu.",
        },
      ],
      discussionQuestions: [
        {
          id: "disc_1",
          text: "Nếu CEO nghỉ 6 tháng, công ty có tìm được thương vụ mới không?",
          type: "textarea",
          placeholder:
            "Suy nghĩ thật: ai sẽ thay CEO tìm khách? Pipeline hiện tại đủ bao lâu?",
          helper:
            "Câu hỏi này giúp đánh giá mức độ phụ thuộc vào CEO trong bán hàng.",
        },
        {
          id: "disc_2",
          text: "Trong 5 năm qua, có bao nhiêu khách hàng quay lại hợp tác?",
          type: "textarea",
          placeholder:
            "Ước tính số khách cũ quay lại đặt dự án mới hoặc mua thêm dịch vụ.",
          helper:
            "Tỷ lệ khách quay lại cho thấy mức độ gắn bó với dịch vụ của Dolphin.",
        },
        {
          id: "disc_3",
          text: "Có sản phẩm nào đang tạo doanh thu mà không cần Dolphin tiếp tục phát triển thêm?",
          type: "textarea",
          placeholder:
            "Liệt kê sản phẩm nào đang chạy và tạo doanh thu mà không cần phát triển thêm.",
          helper:
            "Đây là dấu hiệu sớm của tiềm năng sản phẩm — nếu có, đó là tín hiệu tốt.",
        },
        {
          id: "disc_4",
          text: "Doanh thu từ bảo trì/hỗ trợ kỹ thuật chiếm bao nhiêu phần trăm tổng doanh thu?",
          type: "textarea",
          placeholder:
            "Ước tính phần trăm doanh thu đến từ bảo trì/hỗ trợ so với phí dự án.",
          helper:
            "Doanh thu bảo trì/hỗ trợ là dạng gần nhất với doanh thu định kỳ.",
        },
      ],
    },

    {
      id: "activity_3",
      title: "Business Model Canvas — Mục tiêu Năm 3",
      type: "form",
      icon: "target",
      layout: "bmc_grid",
      estimatedTime: "5-7 phút",
      intro: {
        purpose:
          "Thiết kế mô hình kinh doanh mục tiêu cho Dolphin sau 3 năm chuyển đổi sang Service-Funded Product Company.",
        instructions:
          "Điền từng ô canvas theo MỤC TIÊU Năm 3 — Dolphin muốn trông như thế nào sau 3 năm? Tham khảo lộ trình phân bổ nguồn lực bên dưới.",
        example:
          "Ô Giá trị cung cấp nên có 2 phần: Mảng dịch vụ (đối tác công nghệ hiểu sâu lĩnh vực) và Mảng sản phẩm (giải pháp sẵn dùng, đã kiểm chứng).",
      },
      fields: [
        {
          id: "target_key_partners",
          label: "Đối tác chính",
          type: "textarea",
          section: "bmc",
          explanation:
            "Đối tác nào cần cho mô hình kết hợp Dịch vụ + Sản phẩm?",
          placeholder:
            "Vd: Đối tác phân phối sản phẩm, đối tác trong lĩnh vực mục tiêu, đối tác công nghệ (cloud, API)...",
          helper:
            "Nghĩ cả đối tác cho mảng dịch vụ lẫn mảng sản phẩm.",
        },
        {
          id: "target_key_activities",
          label: "Hoạt động chính",
          type: "textarea",
          section: "bmc",
          explanation:
            "Hoạt động chính nào cần thêm so với hiện tại?",
          placeholder:
            "Vd: DỊCH VỤ: Phát triển phần mềm trong lĩnh vực mục tiêu. SẢN PHẨM: Phát triển & mở rộng sản phẩm riêng. Kinh doanh & tiếp thị cho cả 2 mảng...",
          helper:
            "Tách rõ hoạt động cho mảng dịch vụ và mảng sản phẩm.",
        },
        {
          id: "target_value_proposition",
          label: "Giá trị cung cấp",
          type: "textarea",
          section: "bmc",
          explanation:
            "Giá trị Dolphin mang lại thay đổi thế nào sau 3 năm?",
          placeholder:
            'Vd: DỊCH VỤ: "Đối tác công nghệ hiểu sâu [lĩnh vực]". SẢN PHẨM: "Giải pháp [lĩnh vực] sẵn dùng, đã kiểm chứng"...',
          helper:
            "Năm 3: Dolphin không còn là 'xưởng code mọi thứ' mà là chuyên gia trong lĩnh vực đã chọn.",
        },
        {
          id: "target_key_resources",
          label: "Nguồn lực chính",
          type: "textarea",
          section: "bmc",
          explanation:
            "Nguồn lực nào cần xây dựng thêm trong 3 năm?",
          placeholder:
            "Vd: Chuyên gia lĩnh vực, tài sản trí tuệ (IP), nền tảng/thành phần tái sử dụng, đội ngũ kinh doanh (không chỉ CEO)...",
          helper:
            "So sánh với hiện tại — thiếu gì? Cần xây dựng gì mới?",
        },
        {
          id: "target_customer_relationships",
          label: "Quan hệ khách hàng",
          type: "textarea",
          section: "bmc",
          explanation:
            "Quan hệ khách hàng thay đổi thế nào với mô hình kết hợp?",
          placeholder:
            "Vd: DỊCH VỤ: Đối tác dài hạn. SẢN PHẨM: Tự phục vụ + hỗ trợ kỹ thuật. Cộng đồng người dùng...",
          helper:
            "Khách hàng sản phẩm cần kiểu quan hệ khác khách hàng dịch vụ.",
        },
        {
          id: "target_channels",
          label: "Kênh phân phối",
          type: "textarea",
          section: "bmc",
          explanation:
            "Kênh tiếp cận khách hàng cần mở rộng thế nào?",
          placeholder:
            "Vd: Trưởng phòng KD (dịch vụ), website tự phục vụ (sản phẩm), tiếp thị nội dung, sự kiện ngành...",
          helper:
            "Năm 3: CEO không còn là kênh chính — cần kênh nào thay thế?",
        },
        {
          id: "target_customer_segments",
          label: "Phân khúc khách hàng",
          type: "textarea",
          section: "bmc",
          explanation:
            "Khách hàng mục tiêu có thay đổi khi tập trung lĩnh vực?",
          placeholder:
            "Vd: DỊCH VỤ: Doanh nghiệp trong lĩnh vực mục tiêu cần giải pháp tùy chỉnh. SẢN PHẨM: SMEs cần giải pháp sẵn dùng...",
          helper:
            "Tập trung hẹp hơn nhưng sâu hơn — chất lượng quan trọng hơn số lượng.",
        },
        {
          id: "target_cost_structure",
          label: "Cơ cấu chi phí",
          type: "textarea",
          section: "bmc",
          explanation:
            "Cơ cấu chi phí thay đổi thế nào?",
          placeholder:
            "Vd: Lương (giảm tỷ trọng xuống 60%), đầu tư R&D (15-20%), kinh doanh & tiếp thị (10-15%), hạ tầng cloud cho sản phẩm...",
          helper:
            "Thêm chi phí R&D và tiếp thị — nhưng tổng biên lợi nhuận nên cải thiện.",
        },
        {
          id: "target_revenue_streams",
          label: "Nguồn doanh thu",
          type: "textarea",
          section: "bmc",
          explanation:
            "Doanh thu từ đâu sau 3 năm?",
          placeholder:
            "Vd: Phí dịch vụ (~50%), bản quyền sản phẩm/SaaS (~30%), bảo trì & hỗ trợ (20%)...",
          helper:
            "Mục tiêu Năm 3: doanh thu sản phẩm chiếm ≥ 30% tổng doanh thu.",
        },
      ],
      roadmap: {
        title: "Lộ trình phân bổ nguồn lực",
        description:
          "Tỷ lệ phân bổ nguồn lực giữa mảng dịch vụ và mảng sản phẩm trong 3 năm:",
        items: [
          {
            year: 1,
            service: 85,
            product: 15,
            label: "Năm 1: Dịch vụ 85% / Sản phẩm 15%",
          },
          {
            year: 2,
            service: 70,
            product: 30,
            label: "Năm 2: Dịch vụ 70% / Sản phẩm 30%",
          },
          {
            year: 3,
            service: 50,
            product: 50,
            label: "Năm 3: Dịch vụ 50% / Sản phẩm 50%",
          },
        ],
      },
    },

    {
      id: "activity_4",
      title: "Product Scoring Matrix",
      type: "matrix",
      icon: "grid_view",
      estimatedTime: "5 phút",
      intro: {
        purpose:
          "Đánh giá 4 sản phẩm Dolphin đã triển khai theo 7 tiêu chí có trọng số để xác định sản phẩm nào có tiềm năng spin-off cao nhất.",
        instructions:
          "Chấm điểm từ 1 (thấp) đến 5 (cao) cho mỗi sản phẩm theo từng tiêu chí. Hệ thống sẽ tự tính điểm có trọng số và xếp hạng.",
        example:
          "IPTV Khách sạn — Market size: nếu có hàng trăm khách sạn 3–5 sao tại VN chưa có hệ thống giải trí → chấm 4-5.",
      },
      scale: {
        min: 1,
        max: 5,
        minLabel: "Thấp",
        maxLabel: "Cao",
      },
      computed: {
        weightedScore: "Σ(score_i × weight_i) cho mỗi sản phẩm",
        autoRank: true,
        rankDirection: "descending",
      },
    },

    {
      id: "activity_5",
      title: "Invest / Watch / Kill",
      type: "form",
      icon: "category",
      estimatedTime: "3 phút",
      intro: {
        purpose:
          "Phân loại 4 sản phẩm vào 3 nhóm quyết định: INVEST (đầu tư phát triển), WATCH (theo dõi thêm), hoặc KILL (không đầu tư).",
        instructions:
          "Dựa trên kết quả chấm điểm ở Activity 4, chọn 1 trong 3 hành động cho mỗi sản phẩm. Lưu ý: chỉ được chọn đúng 1 sản phẩm INVEST.",
        example:
          "Sản phẩm có điểm trọng số cao nhất thường là ứng viên INVEST. Sản phẩm điểm thấp hoặc không đạt tiêu chí loại trước → KILL.",
      },
      decisions: [
        {
          value: "INVEST",
          label: "INVEST",
          description:
            "Đầu tư 15-20% nguồn lực, phát triển MVP, tìm Product-Market Fit",
          color: "success",
        },
        {
          value: "WATCH",
          label: "WATCH",
          description:
            "Thử nghiệm nhỏ, kiểm chứng thêm trước khi quyết định đầu tư",
          color: "warning",
        },
        {
          value: "KILL",
          label: "KILL",
          description:
            "Không đầu tư, không phù hợp để spin-off",
          color: "error",
        },
      ],
      validation: {
        rule: "exactly_one_value",
        field: "INVEST",
        errorMessage: "Chỉ được chọn đúng 1 sản phẩm INVEST",
      },
    },

    {
      id: "activity_6",
      title: "Financial Model",
      type: "form",
      icon: "account_balance",
      estimatedTime: "5-7 phút",
      intro: {
        purpose:
          "Ước tính mô hình tài chính cho mô hình kết hợp để xác định runway và tính khả thi của việc tài trợ đội sản phẩm từ lợi nhuận mảng dịch vụ.",
        instructions:
          "Điền số liệu tài chính hiện tại và mục tiêu Năm 1, Năm 3. Các ô tính toán sẽ tự động cập nhật.",
        example:
          "Doanh thu hiện tại: nếu Dolphin đang đạt ~10 tỷ/năm, nhập 10. Nhân sự ~50 người → nhập 50.",
      },
      sections: [
        {
          id: "current",
          title: "Hiện tại",
          fields: [
            {
              id: "current_revenue",
              label: "Doanh thu",
              type: "number",
              unit: "tỷ VND/năm",
              explanation: "Tổng doanh thu hàng năm của Dolphin",
              placeholder: "Vd: 10",
              helper: "Lấy số liệu từ báo cáo tài chính năm gần nhất.",
            },
            {
              id: "current_margin",
              label: "Biên lợi nhuận gộp",
              type: "number",
              unit: "%",
              explanation:
                "Tỷ suất lợi nhuận gộp trên doanh thu",
              placeholder: "Vd: 25",
              helper:
                "Biên lợi nhuận gộp = (Doanh thu - Giá vốn) / Doanh thu × 100.",
            },
            {
              id: "current_team_size",
              label: "Quy mô nhân sự",
              type: "number",
              unit: "người",
              explanation: "Tổng số nhân sự hiện tại",
              placeholder: "Vd: 50",
              helper: "Tính cả full-time và part-time (quy đổi FTE).",
            },
            {
              id: "current_revenue_per_head",
              label: "Doanh thu trên đầu người",
              type: "number",
              unit: "triệu VND/tháng",
              computed: "revenue * 1000 / team_size / 12",
              readonly: true,
              explanation:
                "Doanh thu bình quân mỗi người mỗi tháng",
              helper:
                "Tự động tính: Doanh thu × 1000 / Quy mô nhân sự / 12.",
            },
            {
              id: "current_recurring",
              label: "Doanh thu định kỳ",
              type: "number",
              unit: "%",
              explanation:
                "Phần trăm doanh thu đến từ hợp đồng định kỳ (bảo trì, hỗ trợ, thuê bao)",
              placeholder: "Vd: 5",
              helper:
                "Bao gồm hợp đồng bảo trì, hỗ trợ kỹ thuật, và bất kỳ nguồn thu lặp lại nào.",
            },
          ],
        },
        {
          id: "year1",
          title: "Mục tiêu Năm 1",
          fields: [
            {
              id: "y1_service_revenue",
              label: "Doanh thu dịch vụ",
              type: "number",
              unit: "tỷ VND/năm",
              explanation:
                "Doanh thu mục tiêu từ mảng dịch vụ (duy trì hoặc tăng nhẹ)",
              placeholder: "Vd: 10",
              helper:
                "Mảng dịch vụ vẫn là ưu tiên cash flow — không nên giảm so với hiện tại.",
            },
            {
              id: "y1_product_investment",
              label: "Đầu tư cho sản phẩm",
              type: "number",
              unit: "tỷ VND/năm",
              explanation:
                "Số tiền đầu tư cho mảng sản phẩm (từ lợi nhuận mảng dịch vụ)",
              placeholder: "Vd: 1",
              helper:
                "Không được vượt quá lợi nhuận mảng dịch vụ — đây là nguyên tắc sống còn.",
            },
            {
              id: "y1_product_revenue",
              label: "Doanh thu sản phẩm",
              type: "number",
              unit: "triệu VND/năm",
              explanation:
                "Doanh thu kỳ vọng từ sản phẩm (bắt đầu từ quy mô nhỏ)",
              placeholder: "Vd: 100",
              helper:
                "Năm 1 doanh thu sản phẩm thường rất nhỏ — đang trong giai đoạn thử nghiệm.",
            },
            {
              id: "y1_team_service",
              label: "Nhân sự dịch vụ",
              type: "number",
              unit: "người",
              explanation: "Số người phân bổ cho mảng dịch vụ",
              placeholder: "Vd: 42",
              helper:
                "Khoảng 85% tổng nhân sự (theo lộ trình phân bổ Năm 1).",
            },
            {
              id: "y1_team_product",
              label: "Nhân sự sản phẩm",
              type: "number",
              unit: "người",
              explanation: "Số người phân bổ cho mảng sản phẩm",
              placeholder: "Vd: 5",
              helper:
                "Khoảng 15% tổng nhân sự. Tách rõ — không bị điều chuyển sang dịch vụ.",
            },
            {
              id: "y1_team_shared",
              label: "Nhân sự dùng chung",
              type: "number",
              unit: "người",
              explanation:
                "Số người dùng chung (quản lý, nhân sự, vận hành)",
              placeholder: "Vd: 3",
              helper: "Các vị trí hỗ trợ chung cho cả 2 mảng.",
            },
            {
              id: "y1_avg_salary",
              label: "Lương trung bình đội sản phẩm",
              type: "number",
              unit: "triệu VND/tháng",
              explanation:
                "Lương trung bình của thành viên đội sản phẩm",
              placeholder: "Vd: 25",
              helper: "Bao gồm lương gross, chưa tính chi phí quản lý.",
            },
            {
              id: "y1_burn_rate",
              label: "Chi phí đội sản phẩm hàng tháng",
              type: "number",
              unit: "triệu VND/tháng",
              computed: "team_product * avg_salary * 1.3",
              readonly: true,
              explanation:
                "Chi phí hàng tháng cho đội sản phẩm (lương × 1,3 chi phí quản lý)",
              helper:
                "Tự động tính: Nhân sự sản phẩm × Lương TB × 1,3 (bao gồm văn phòng, hạ tầng, phúc lợi).",
            },
            {
              id: "y1_service_profit_needed",
              label: "Lợi nhuận dịch vụ cần thiết",
              type: "number",
              unit: "triệu VND/tháng",
              computed: "burn_rate * 1.2",
              readonly: true,
              explanation:
                "Mảng dịch vụ cần tạo bao nhiêu lợi nhuận/tháng để tài trợ sản phẩm + 20% dự phòng",
              helper:
                "Tự động tính: Chi phí đội sản phẩm × 1,2 (dự phòng 20% cho rủi ro).",
            },
          ],
        },
        {
          id: "year3",
          title: "Mục tiêu Năm 3",
          fields: [
            {
              id: "y3_service_revenue",
              label: "Doanh thu dịch vụ",
              type: "number",
              unit: "tỷ VND/năm",
              explanation: "Doanh thu mảng dịch vụ Năm 3",
              placeholder: "Vd: 8",
              helper:
                "Mảng dịch vụ có thể giảm tỷ trọng nhưng tổng số không nên giảm mạnh.",
            },
            {
              id: "y3_product_revenue",
              label: "Doanh thu sản phẩm",
              type: "number",
              unit: "tỷ VND/năm",
              explanation:
                "Doanh thu mảng sản phẩm Năm 3 (mục tiêu ≥ 30% tổng)",
              placeholder: "Vd: 4",
              helper:
                "Mục tiêu: doanh thu sản phẩm chiếm ≥ 30% tổng doanh thu.",
            },
            {
              id: "y3_blended_margin",
              label: "Biên lợi nhuận tổng hợp",
              type: "number",
              unit: "%",
              explanation:
                "Tỷ suất lợi nhuận gộp kết hợp cả dịch vụ + sản phẩm",
              placeholder: "Vd: 35",
              helper:
                "Mục tiêu: tăng 10 điểm phần trăm so với hiện tại (biên sản phẩm thường cao hơn dịch vụ).",
            },
            {
              id: "y3_team_service",
              label: "Nhân sự dịch vụ",
              type: "number",
              unit: "người",
              explanation: "Số người mảng dịch vụ Năm 3",
              placeholder: "Vd: 25",
              helper:
                "Khoảng 50% tổng nhân sự (theo lộ trình phân bổ Năm 3).",
            },
            {
              id: "y3_team_product",
              label: "Nhân sự sản phẩm",
              type: "number",
              unit: "người",
              explanation: "Số người mảng sản phẩm Năm 3",
              placeholder: "Vd: 20",
              helper:
                "Khoảng 50% tổng nhân sự — mảng sản phẩm đã lớn đáng kể.",
            },
            {
              id: "y3_team_shared",
              label: "Nhân sự dùng chung",
              type: "number",
              unit: "người",
              explanation:
                "Số người dùng chung (quản lý, nhân sự, vận hành)",
              placeholder: "Vd: 5",
              helper:
                "Có thể tăng nhẹ do tổ chức phức tạp hơn.",
            },
            {
              id: "y3_cash_reserves",
              label: "Tiền mặt dự trữ dự kiến",
              type: "number",
              unit: "tỷ VND",
              explanation:
                "Tiền mặt dự trữ ước tính tại Năm 3",
              placeholder: "Vd: 2",
              helper:
                "Bao gồm lợi nhuận giữ lại và bất kỳ nguồn vốn nào khác.",
            },
            {
              id: "y3_projected_monthly_profit",
              label: "Lợi nhuận hàng tháng dự kiến",
              type: "number",
              unit: "triệu VND/tháng",
              explanation:
                "Lợi nhuận hàng tháng dự kiến từ cả 2 mảng",
              placeholder: "Vd: 300",
              helper:
                "Ước tính dựa trên doanh thu và biên lợi nhuận mục tiêu ở trên.",
            },
            {
              id: "y3_runway",
              label: "Runway",
              type: "number",
              unit: "tháng",
              computed:
                "(cash_reserves * 1000 + projected_monthly_profit) / burn_rate",
              readonly: true,
              explanation:
                "Bao lâu Dolphin có thể tài trợ sản phẩm nếu dịch vụ ngừng tăng trưởng",
              helper:
                "Tự động tính: (Tiền mặt dự trữ + Lợi nhuận dự kiến) / Chi phí đội sản phẩm. Mục tiêu ≥ 12 tháng.",
            },
          ],
        },
      ],
    },
  ],
};
