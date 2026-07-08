const MODULE2_CONFIG = {
  id: "module2",
  format: "course",
  title: "Tái Cấu Trúc Product/Service Portfolio",
  subtitle: "Restructuring Product/Service Portfolio",
  description:
    "Khóa học 11 Units: Portfolio analysis, brand architecture, spin-off, lean startup, pricing, roadmap.",
  estimatedTime: "5-6 giờ",

  products: [
    { id: "vb_dien_tu", name: "VB Điện tử (Vietlot)", icon: "description" },
    { id: "iptv_khach_san", name: "IPTV Khách sạn", icon: "hotel" },
    { id: "event_ticket", name: "Event/Ticket", icon: "confirmation_number" },
    { id: "cms_toa_soan", name: "CMS/Tòa soạn", icon: "newspaper" },
  ],

  spinoffCriteria: [
    { id: "standalone_revenue", label: "Khả năng tạo doanh thu độc lập", weight: 0.20 },
    { id: "scalability", label: "Khả năng mở rộng", weight: 0.15 },
    { id: "operational_independence", label: "Vận hành độc lập", weight: 0.15 },
    { id: "customer_acquisition", label: "Thu hút khách hàng mới", weight: 0.15 },
    { id: "team_readiness", label: "Sẵn sàng của team", weight: 0.15 },
    { id: "brand_positioning", label: "Định vị thương hiệu", weight: 0.10 },
    { id: "financial_sustainability", label: "Bền vững tài chính", weight: 0.10 },
  ],

  resourceAllocation: [
    { year: "Year 1", service: 85, product: 15 },
    { year: "Year 2", service: 70, product: 30 },
    { year: "Year 3", service: 50, product: 50 },
  ],

  units: [
    {
      id: "u1_sfpc",
      unitNumber: 1,
      title: "Service-Funded Product Company (Recap Module 1)",
      icon: "school",
      branch: null,
      lecture: {
        contentPath: "/content/m2/u1_sfpc.md",
        estimatedTime: "15 phút",
      },
      quiz: {
        questions: [
          {
            id: "u1q1",
            text: "SFPC viết tắt của gì?",
            options: {
              A: "Software Firm Product Company",
              B: "Service-Funded Product Company",
              C: "Service-First Product Company",
              D: "Simple Flat Product Company",
            },
            correct: "B",
            explanation:
              "SFPC = Service-Funded Product Company — mô hình dùng dịch vụ (service) làm nguồn tiền để tài trợ phát triển sản phẩm (product).",
          },
          {
            id: "u1q2",
            text: "Resource Allocation Year 3 là bao nhiêu?",
            options: {
              A: "Service 85% / Product 15%",
              B: "Service 70% / Product 30%",
              C: "Service 50% / Product 50%",
              D: "Service 20% / Product 80%",
            },
            correct: "C",
            explanation:
              "Year 3: Service 50% / Product 50%. Lộ trình: 85:15 → 70:30 → 50:50.",
          },
          {
            id: "u1q3",
            text: "Module 1 constraint INVEST cho phép đầu tư bao nhiêu sản phẩm?",
            options: {
              A: "4 sản phẩm",
              B: "2 sản phẩm",
              C: "3 sản phẩm",
              D: "Chỉ 1 sản phẩm",
            },
            correct: "D",
            explanation:
              "Chỉ được chọn đúng 1 sản phẩm INVEST — tập trung nguồn lực, không dàn trải.",
          },
          {
            id: "u1q4",
            text: "Trong SFPC, vai trò của mảng dịch vụ (service arm) là gì?",
            options: {
              A: "Growth engine",
              B: "Cash engine — tài trợ cho product",
              C: "Innovation lab",
              D: "Marketing channel",
            },
            correct: "B",
            explanation:
              "Service arm = Cash engine: tạo doanh thu và lợi nhuận ngay để tài trợ cho product arm (growth engine).",
          },
          {
            id: "u1q5",
            text: "Tại sao không nên phát triển tất cả 4 sản phẩm cùng lúc?",
            options: {
              A: "Vì chỉ có 1 CEO",
              B: "Vì sẽ dàn trải nguồn lực quá mỏng",
              C: "Vì khách hàng sẽ nhầm lẫn",
              D: "Vì pháp luật không cho phép",
            },
            correct: "B",
            explanation:
              "Với quy mô ~50 người, dàn trải nguồn lực cho 4 sản phẩm = mỗi sản phẩm không đủ resource để đạt Product-Market Fit.",
          },
        ],
      },
      practice: null,
    },

    {
      id: "u2_inventory",
      unitNumber: 2,
      title: "Portfolio Inventory & Classification",
      icon: "inventory_2",
      branch: null,
      lecture: {
        contentPath: "/content/m2/u2_inventory.md",
        estimatedTime: "20 phút",
      },
      quiz: {
        questions: [
          {
            id: "u2q1",
            text: "Core Service trong IT company thường bao gồm gì?",
            options: {
              A: "Tư vấn chiến lược và coaching",
              B: "Phát triển phần mềm theo đơn và system integration",
              C: "Sản phẩm SaaS và AI/ML",
              D: "Marketing và branding",
            },
            correct: "B",
            explanation:
              "Core Services là nguồn doanh thu chính: Custom Software Development, Staff Augmentation, System Integration, Maintenance & Support.",
          },
          {
            id: "u2q2",
            text: "Mục đích của Portfolio Inventory là gì?",
            options: {
              A: "Tìm dịch vụ mới để phát triển",
              B: "Kiểm kê toàn bộ dịch vụ/sản phẩm hiện tại với metrics thực tế",
              C: "Đánh giá năng lực nhân sự",
              D: "Xây dựng thương hiệu công ty",
            },
            correct: "B",
            explanation:
              "Không thể tái cấu trúc portfolio nếu không biết chính xác hiện trạng. Inventory với metrics (revenue, margin, headcount, growth) là bước đầu tiên.",
          },
          {
            id: "u2q3",
            text: "Value-Add Services có đặc điểm gì khác Core Services?",
            options: {
              A: "Doanh thu cao hơn nhưng rủi ro thấp hơn",
              B: "Biên lợi nhuận cao hơn nhờ chuyên môn sâu",
              C: "Không cần nhân sự kỹ thuật",
              D: "Chỉ phục vụ khách hàng nước ngoài",
            },
            correct: "B",
            explanation:
              "Value-Add Services (consulting, architecture, QA-as-a-Service) có margin cao hơn vì đòi hỏi chuyên môn sâu, không dễ bị cạnh tranh về giá.",
          },
          {
            id: "u2q4",
            text: "Strategic Fit đánh giá điều gì?",
            options: {
              A: "Mức độ phù hợp với chiến lược đã xác định ở Module 1",
              B: "Khả năng tuyển dụng nhân sự",
              C: "Mức độ hài lòng của khách hàng",
              D: "Chi phí vận hành hàng tháng",
            },
            correct: "A",
            explanation:
              "Strategic Fit đánh giá mỗi dịch vụ/sản phẩm có phù hợp với mô hình SFPC và domain focus đã chọn ở Module 1 hay không.",
          },
          {
            id: "u2q5",
            text: "Growth trend 'Giảm' cho thấy điều gì về dịch vụ đó?",
            options: {
              A: "Cần đầu tư thêm ngay lập tức",
              B: "Có thể là ứng viên để harvest hoặc sunset",
              C: "Đang trong giai đoạn pilot bình thường",
              D: "Không có ý nghĩa gì đặc biệt",
            },
            correct: "B",
            explanation:
              "Dịch vụ có growth trend giảm cần đánh giá: nếu margin vẫn tốt → harvest (duy trì, tối ưu chi phí); nếu margin thấp → sunset (loại bỏ dần).",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Điền bảng Inventory",
        sections: [
          {
            id: "services",
            title: "Dịch vụ (Services)",
            description:
              "Liệt kê các dịch vụ custom development mà Dolphin đang cung cấp.",
            repeatable: true,
            fields: [
              { id: "service_name", label: "Tên dịch vụ", type: "text", placeholder: "Vd: Custom Software Development" },
              { id: "service_desc", label: "Mô tả ngắn", type: "textarea", placeholder: "Làm gì, cho ai?" },
              { id: "revenue_pct", label: "Revenue contribution (%)", type: "number", unit: "%", placeholder: "Vd: 40" },
              { id: "gross_margin", label: "Gross margin (%)", type: "number", unit: "%", placeholder: "Vd: 25" },
              { id: "num_clients", label: "Số khách hàng", type: "number", placeholder: "Vd: 8" },
              { id: "growth_trend", label: "Growth trend", type: "select", options: ["Tăng", "Ổn định", "Giảm"] },
              { id: "headcount", label: "Headcount allocated", type: "number", placeholder: "Vd: 20" },
              { id: "classification", label: "Phân loại", type: "select", options: ["Core Service", "Value-Add Service", "Emerging/Product"] },
            ],
          },
          {
            id: "products",
            title: "Sản phẩm (Products)",
            description: "Thông tin 4 sản phẩm đang có.",
            perProduct: true,
            fields: [
              { id: "prod_desc", label: "Mô tả ngắn", type: "textarea", placeholder: "Vd: Hệ thống quản lý văn bản số hóa cho cơ quan nhà nước" },
              { id: "prod_revenue_pct", label: "Revenue contribution (%)", type: "number", unit: "%", placeholder: "Vd: 15" },
              { id: "prod_margin", label: "Gross margin (%)", type: "number", unit: "%", placeholder: "Vd: 35" },
              { id: "prod_clients", label: "Số khách hàng", type: "number", placeholder: "Vd: 3" },
              { id: "prod_growth", label: "Growth trend", type: "select", options: ["Tăng", "Ổn định", "Giảm"] },
              { id: "prod_headcount", label: "Headcount allocated", type: "number", placeholder: "Vd: 5" },
              { id: "prod_competitive", label: "Competitive position", type: "select", options: ["Mạnh", "Trung bình", "Yếu"] },
              { id: "prod_strategic_fit", label: "Strategic fit (vs Module 1)", type: "select", options: ["Cao", "Trung bình", "Thấp"] },
            ],
          },
        ],
      },
    },

    {
      id: "u3_brand",
      unitNumber: 3,
      title: "Brand Architecture & Product Naming",
      icon: "branding_watermark",
      branch: null,
      lecture: {
        contentPath: "/content/m2/u3_brand.md",
        estimatedTime: "20 phút",
      },
      quiz: {
        questions: [
          {
            id: "u3q1",
            text: "Mô hình Branded House nghĩa là gì?",
            options: {
              A: "Mỗi sản phẩm có thương hiệu hoàn toàn độc lập",
              B: "Tất cả sản phẩm dùng chung tên công ty mẹ",
              C: "Sản phẩm được endorsed bởi công ty mẹ",
              D: "Mỗi sản phẩm được bán cho công ty khác",
            },
            correct: "B",
            explanation:
              "Branded House: tất cả sản phẩm mang tên công ty mẹ (vd: Google Maps, Google Drive). Lợi thế: leverage brand có sẵn. Nhược điểm: rủi ro liên đới.",
          },
          {
            id: "u3q2",
            text: "House of Brands phù hợp khi nào?",
            options: {
              A: "Khi công ty còn nhỏ và chưa có brand recognition",
              B: "Khi các sản phẩm phục vụ market segments rất khác nhau",
              C: "Khi muốn tiết kiệm chi phí marketing",
              D: "Khi CEO muốn kiểm soát tất cả",
            },
            correct: "B",
            explanation:
              "House of Brands (vd: P&G với Tide, Gillette) phù hợp khi sản phẩm phục vụ segments rất khác nhau. Nhưng đòi hỏi ngân sách marketing lớn — không phù hợp công ty 50 người.",
          },
          {
            id: "u3q3",
            text: "Endorsed Brands model là gì?",
            options: {
              A: "Công ty mẹ mua lại thương hiệu khác",
              B: "Sản phẩm có tên riêng nhưng kèm 'by [Company]'",
              C: "Sản phẩm chỉ bán qua đối tác",
              D: "Công ty đổi tên hoàn toàn",
            },
            correct: "B",
            explanation:
              "Endorsed Brands: sản phẩm có tên riêng + 'by Dolphin Technology'. Vd: DocFlow by Dolphin Technology. Balance giữa brand riêng và uy tín công ty mẹ.",
          },
          {
            id: "u3q4",
            text: "Tại sao Endorsed Brands được khuyến nghị cho Dolphin?",
            options: {
              A: "Vì Dolphin đã có brand recognition rất mạnh",
              B: "Vì mỗi sản phẩm cần tên riêng để differentiate, nhưng cần leverage uy tín Dolphin",
              C: "Vì pháp luật yêu cầu",
              D: "Vì giảm chi phí đăng ký thương hiệu",
            },
            correct: "B",
            explanation:
              "Với quy mô 50 người, Dolphin chưa đủ ngân sách build brand riêng cho mỗi sản phẩm. Endorsed model cho phép sản phẩm có identity riêng nhưng vẫn leverage uy tín Dolphin.",
          },
          {
            id: "u3q5",
            text: "Brand Positioning Statement nên bao gồm yếu tố nào?",
            options: {
              A: "Tên CEO, số nhân sự, địa chỉ văn phòng",
              B: "Target audience, category, benefit, differentiator",
              C: "Logo, màu sắc, font chữ, slogan",
              D: "Doanh thu, lợi nhuận, market share",
            },
            correct: "B",
            explanation:
              "Positioning Statement: 'Cho [target audience], [product] là [category] giúp [benefit] khác biệt bởi [differentiator].' — khung chuẩn để định vị thương hiệu.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Brand Workshop",
        sections: [
          {
            id: "company_brand",
            title: "Company Brand Foundation",
            fields: [
              {
                id: "positioning", label: "Brand Positioning", type: "textarea",
                explanation: "Dolphin Technology muốn được nhận diện là gì?",
                placeholder: "Vd: Công ty công nghệ chuyên xây dựng giải pháp số hóa cho doanh nghiệp Việt Nam",
              },
              {
                id: "personality", label: "Brand Personality", type: "textarea",
                explanation: "Nếu Dolphin là một người, tính cách như thế nào?",
                placeholder: "Vd: Chuyên nghiệp, đáng tin cậy, sáng tạo thực tế, gần gũi",
              },
              {
                id: "promise", label: "Brand Promise", type: "textarea",
                explanation: "Cam kết cốt lõi cho khách hàng.",
                placeholder: "Vd: Giải pháp công nghệ thực tế, triển khai nhanh, đồng hành lâu dài",
              },
              {
                id: "audience", label: "Target Audience", type: "textarea",
                placeholder: "Vd: Doanh nghiệp vừa và lớn tại VN cần số hóa quy trình vận hành",
              },
            ],
          },
          {
            id: "brand_architecture",
            title: "Brand Architecture Decision",
            fields: [
              {
                id: "architecture_choice",
                label: "Brand Architecture Model",
                type: "radio",
                options: [
                  { value: "endorsed", label: "Endorsed Brands (Khuyến nghị)", description: "[Tên SP] by Dolphin Technology" },
                  { value: "branded_house", label: "Branded House", description: "Dolphin [Tên SP]" },
                  { value: "house_of_brands", label: "House of Brands", description: "Tên SP hoàn toàn độc lập" },
                ],
              },
              { id: "architecture_reason", label: "Lý do chọn", type: "textarea", placeholder: "Tại sao model này phù hợp với Dolphin?" },
            ],
          },
          {
            id: "product_naming",
            title: "Product Naming",
            perProduct: true,
            fields: [
              { id: "proposed_name", label: "Tên đề xuất", type: "text", placeholder: "Vd: DocFlow, HotelVision, EventHub, NewsDesk" },
              { id: "proposed_tagline", label: "Tagline đề xuất", type: "text", placeholder: "Vd: Văn phòng số, không giấy tờ" },
            ],
          },
        ],
      },
    },

    {
      id: "u4_spinoff",
      unitNumber: 4,
      title: "Spin-off & BU Independence",
      icon: "analytics",
      branch: "A",
      lecture: {
        contentPath: "/content/m2/u4_spinoff.md",
        estimatedTime: "25 phút",
      },
      quiz: {
        questions: [
          {
            id: "u4q1",
            text: "Spin-off trong bối cảnh Dolphin nghĩa là gì?",
            options: {
              A: "Bán sản phẩm cho công ty khác",
              B: "Hình thành BU độc lập vẫn trong công ty, không phải pháp nhân riêng",
              C: "Thành lập công ty con mới",
              D: "Outsource phát triển sản phẩm cho đối tác",
            },
            correct: "B",
            explanation:
              "Spin-off ở đây = hình thành Business Unit (BU) độc lập trong Dolphin, có P&L riêng, team dedicated — không phải pháp nhân riêng.",
          },
          {
            id: "u4q2",
            text: "7 tiêu chí spin-off Module 2 khác Module 1 ở điểm nào?",
            options: {
              A: "Module 2 chỉ có 4 tiêu chí",
              B: "Module 2 đánh giá ở cấp business (standalone revenue, scalability), Module 1 ở cấp product (market size, recurring)",
              C: "Module 2 không dùng trọng số",
              D: "Hai module dùng cùng tiêu chí nhưng thang điểm khác",
            },
            correct: "B",
            explanation:
              "Module 1: 7 tiêu chí product-level (market size, recurring potential...). Module 2: 7 tiêu chí business-level (standalone revenue, scalability, operational independence...).",
          },
          {
            id: "u4q3",
            text: "Readiness band 'Sẵn sàng spin-off' tương ứng với khoảng điểm nào?",
            options: {
              A: "1.0 – 2.0",
              B: "2.0 – 3.0",
              C: "3.0 – 3.9",
              D: "4.0 – 5.0",
            },
            correct: "D",
            explanation:
              "4.0–5.0: Sẵn sàng spin-off → chuyển sang thiết kế testing strategy. 3.0–3.9: Có tiềm năng. Dưới 3.0: Chưa sẵn sàng.",
          },
          {
            id: "u4q4",
            text: "BU khác team bình thường ở điểm nào?",
            options: {
              A: "BU có nhiều người hơn",
              B: "BU có P&L riêng, team dedicated, và accountability rõ ràng",
              C: "BU chỉ dành cho sản phẩm phần mềm",
              D: "BU không cần product owner",
            },
            correct: "B",
            explanation:
              "BU = đơn vị kinh doanh có P&L riêng, team dedicated (không bị kéo sang project khác), product owner chịu trách nhiệm kết quả. Team bình thường chia sẻ resource và không có P&L riêng.",
          },
          {
            id: "u4q5",
            text: "Tiêu chí 'Operational Independence' đánh giá điều gì?",
            options: {
              A: "Sản phẩm có thể bán mà không cần CEO",
              B: "Sản phẩm có thể vận hành mà không phụ thuộc vào resource chung của công ty mẹ",
              C: "Sản phẩm có nhiều khách hàng quốc tế",
              D: "Sản phẩm có mã nguồn mở",
            },
            correct: "B",
            explanation:
              "Operational Independence: sản phẩm có thể vận hành (develop, deploy, support) mà không phụ thuộc vào infrastructure, tools, hay nhân sự chung của Dolphin.",
          },
        ],
      },
      practice: {
        type: "matrix",
        title: "Spin-off Scoring Matrix",
        scale: { min: 1, max: 5, minLabel: "Rất thấp", maxLabel: "Rất cao" },
        criteriaRef: "spinoffCriteria",
        computed: {
          weightedScore: true,
          autoRank: true,
          rankDirection: "descending",
        },
        readinessBands: [
          { range: [4.0, 5.0], label: "Sẵn sàng spin-off", action: "Chuyển sang Unit 5: thiết kế testing strategy" },
          { range: [3.0, 3.9], label: "Có tiềm năng", action: "Xác định gaps cần đóng trong 6-12 tháng" },
          { range: [0, 2.9], label: "Chưa sẵn sàng", action: "Giữ trong portfolio Dolphin, đánh giá lại sau 12 tháng" },
        ],
      },
    },

    {
      id: "u5_2axis",
      unitNumber: 5,
      title: "2-Axis Product Testing Strategy",
      icon: "grid_view",
      branch: "A",
      lecture: {
        contentPath: "/content/m2/u5_2axis.md",
        estimatedTime: "15 phút",
      },
      quiz: {
        questions: [
          {
            id: "u5q1",
            text: "Ma trận 2 trục đánh giá sản phẩm theo hai chiều nào?",
            options: {
              A: "Revenue × Margin",
              B: "Internal Readiness × Market Opportunity",
              C: "Team Size × Budget",
              D: "Time-to-Market × Complexity",
            },
            correct: "B",
            explanation:
              "2-Axis: Internal Readiness (team, tech, process) × Market Opportunity (demand, market size, growth). Tách rõ năng lực nội bộ và cơ hội thị trường.",
          },
          {
            id: "u5q2",
            text: "Quadrant 'Aggressive Scale' nghĩa là gì?",
            options: {
              A: "Internal thấp + Market thấp",
              B: "Internal thấp + Market cao",
              C: "Internal cao + Market cao",
              D: "Internal cao + Market thấp",
            },
            correct: "C",
            explanation:
              "Internal cao + Market cao = Aggressive Scale: sản phẩm sẵn sàng về nội bộ và thị trường hấp dẫn → đầu tư mạnh, scale nhanh.",
          },
          {
            id: "u5q3",
            text: "Khi Internal Readiness thấp nhưng Market Opportunity cao, chiến lược là gì?",
            options: {
              A: "Deprioritize",
              B: "Aggressive Scale",
              C: "Build Capability First",
              D: "Find Market",
            },
            correct: "C",
            explanation:
              "Build Capability First: thị trường hấp dẫn nhưng Dolphin chưa sẵn sàng → ưu tiên xây dựng năng lực (team, tech) trước khi scale.",
          },
          {
            id: "u5q4",
            text: "Chiến lược 'Find Market' áp dụng khi nào?",
            options: {
              A: "Khi Dolphin mạnh nhưng thị trường chưa rõ ràng",
              B: "Khi cả internal và market đều yếu",
              C: "Khi sản phẩm đã có nhiều khách hàng",
              D: "Khi cần tuyển thêm nhân sự",
            },
            correct: "A",
            explanation:
              "Internal cao + Market thấp = Find Market: Dolphin có năng lực nhưng chưa tìm được market fit → cần validate demand, tìm segment phù hợp.",
          },
          {
            id: "u5q5",
            text: "Tại sao 2-Axis testing bổ sung cho scoring ở Unit 4?",
            options: {
              A: "Vì scoring không chính xác",
              B: "Vì scoring cho điểm tổng thể, 2-Axis tách riêng internal vs market để chọn chiến lược cụ thể",
              C: "Vì 2-Axis dùng nhiều tiêu chí hơn",
              D: "Vì 2-Axis đơn giản hơn scoring",
            },
            correct: "B",
            explanation:
              "Scoring cho readiness tổng thể (1 con số). 2-Axis tách thành 2 chiều → mỗi quadrant có chiến lược testing khác nhau, cụ thể hơn.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Chọn Quadrant & Test Plan",
        perProduct: true,
        fields: [
          { id: "internal_readiness", label: "Internal Readiness (1–5)", type: "number", min: 1, max: 5, explanation: "Team, tech, process, brand readiness." },
          { id: "market_opportunity", label: "Market Opportunity (1–5)", type: "number", min: 1, max: 5, explanation: "Demand, market size, growth, competitive gap." },
          {
            id: "quadrant_strategy", label: "Chiến lược testing", type: "select",
            options: [
              "Aggressive Scale (Internal cao + Market cao)",
              "Build Capability First (Internal thấp + Market cao)",
              "Find Market (Internal cao + Market thấp)",
              "Deprioritize / Monitor (Internal thấp + Market thấp)",
            ],
          },
          { id: "testing_actions", label: "Hành động cụ thể trong 90 ngày", type: "textarea", placeholder: "Vd: Tuyển product manager, pilot với 2 khách hàng mới" },
        ],
      },
    },

    {
      id: "u6_90day",
      unitNumber: 6,
      title: "90-Day Evaluation & Go/Pivot/Kill",
      icon: "event_note",
      branch: "A",
      lecture: {
        contentPath: "/content/m2/u6_90day.md",
        estimatedTime: "15 phút",
      },
      quiz: {
        questions: [
          {
            id: "u6q1",
            text: "Go/Pivot/Kill framework giúp tránh vấn đề gì?",
            options: {
              A: "Tuyển sai người",
              B: "Zombie product — không sống, không chết, tốn resource",
              C: "Cạnh tranh với đối thủ lớn",
              D: "Mất khách hàng cũ",
            },
            correct: "B",
            explanation:
              "Zombie product: sản phẩm không đủ traction để scale nhưng không ai dám kill → tiếp tục tốn resource mà không tạo giá trị. Framework rõ ràng ngăn điều này.",
          },
          {
            id: "u6q2",
            text: "90-Day Sprint Plan cần bao gồm gì?",
            options: {
              A: "Chỉ cần mục tiêu doanh thu",
              B: "Sprint goal, budget, team size, KPIs, milestones, và Go/Pivot/Kill criteria",
              C: "Chỉ cần danh sách features cần build",
              D: "Chỉ cần timeline và deadline",
            },
            correct: "B",
            explanation:
              "Sprint Plan đầy đủ: sprint goal rõ ràng, budget allocated, team size, KPIs đo lường được, milestones (Day 30/60/90), và criteria cho quyết định Go/Pivot/Kill.",
          },
          {
            id: "u6q3",
            text: "PIVOT khác KILL ở điểm nào?",
            options: {
              A: "Pivot tốn nhiều tiền hơn Kill",
              B: "Pivot thay đổi chiến lược nhưng giữ learnings, Kill dừng hoàn toàn",
              C: "Pivot chỉ áp dụng cho sản phẩm mới",
              D: "Kill có thể quay lại, Pivot thì không",
            },
            correct: "B",
            explanation:
              "Pivot: giữ core learnings nhưng thay đổi segment, pricing, hoặc approach. Kill: dừng hoàn toàn, harvest learnings, chọn bet mới. Pivot khi 1-2 KPIs đạt, Kill khi không KPI nào đạt.",
          },
          {
            id: "u6q4",
            text: "Day 30 checkpoint thường đánh giá gì?",
            options: {
              A: "Doanh thu và lợi nhuận",
              B: "Team assembled và đã contact prospects đầu tiên",
              C: "Sản phẩm đã launch trên thị trường",
              D: "Đã có 10 khách hàng trả tiền",
            },
            correct: "B",
            explanation:
              "Day 30: foundation — team assembled, prospects contacted, MVP scoping done. Quá sớm để đo revenue. Focus vào setup và early validation signals.",
          },
          {
            id: "u6q5",
            text: "Tại sao kill criteria phải đặt TRƯỚC khi bắt đầu?",
            options: {
              A: "Vì nhà đầu tư yêu cầu",
              B: "Vì nếu đặt sau sẽ bị bias — team đã đầu tư effort sẽ không muốn kill",
              C: "Vì pháp luật yêu cầu",
              D: "Vì không thể thay đổi sau khi bắt đầu",
            },
            correct: "B",
            explanation:
              "Sunk cost bias: khi đã đầu tư effort/tiền, team có xu hướng tiếp tục dù evidence nói nên dừng. Đặt kill criteria trước = cam kết khi chưa bị bias.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Lập 90-Day Sprint Plan",
        sections: [
          {
            id: "sprint_overview",
            title: "Sprint Overview",
            fields: [
              { id: "target_product", label: "Sản phẩm focus (INVEST)", type: "text", placeholder: "Tên sản phẩm đã chọn INVEST ở Module 1" },
              { id: "sprint_goal", label: "Mục tiêu 90 ngày", type: "textarea", placeholder: "Vd: Validate product-market fit cho segment khách sạn 3-4 sao" },
              { id: "budget", label: "Budget allocated (triệu VND)", type: "number", placeholder: "Vd: 500" },
              { id: "team_size", label: "Team size", type: "number", placeholder: "Vd: 4" },
            ],
          },
          {
            id: "kpis",
            title: "KPI Dashboard",
            fields: [
              { id: "kpi_revenue", label: "Revenue target (triệu VND/tháng)", type: "number", placeholder: "Vd: 200" },
              { id: "kpi_clients", label: "Số khách hàng mới", type: "number", placeholder: "Vd: 5" },
              { id: "kpi_nps", label: "NPS target", type: "number", placeholder: "Vd: 40" },
              { id: "kpi_churn", label: "Churn rate max (%)", type: "number", placeholder: "Vd: 10" },
              { id: "kpi_custom", label: "KPI bổ sung", type: "textarea", placeholder: "Vd: 3 case studies" },
            ],
          },
          {
            id: "milestones",
            title: "Milestones",
            fields: [
              { id: "day_30", label: "Day 30 checkpoint", type: "textarea", placeholder: "Vd: Team assembled, 2 prospects contacted" },
              { id: "day_60", label: "Day 60 checkpoint", type: "textarea", placeholder: "Vd: 3 pilots running, pricing validated" },
              { id: "day_90", label: "Day 90 decision", type: "textarea", placeholder: "Vd: Go/Pivot/Kill decision based on KPIs" },
            ],
          },
          {
            id: "go_pivot_kill",
            title: "Go / Pivot / Kill Framework",
            fields: [
              { id: "go_criteria", label: "GO nếu:", type: "textarea", placeholder: "Vd: Đạt ≥80% KPIs, ≥3 khách trả tiền" },
              { id: "pivot_criteria", label: "PIVOT nếu:", type: "textarea", placeholder: "Vd: 1-2 KPIs đạt nhưng cần thay segment/pricing" },
              { id: "kill_criteria", label: "KILL nếu:", type: "textarea", placeholder: "Vd: <2 khách, 0 revenue, team morale thấp" },
            ],
          },
        ],
      },
    },

    {
      id: "u7_lean",
      unitNumber: 7,
      title: "Lean Startup & Ideation",
      icon: "lightbulb",
      branch: "B",
      lecture: {
        contentPath: "/content/m2/u7_lean.md",
        estimatedTime: "20 phút",
      },
      quiz: {
        questions: [
          {
            id: "u7q1",
            text: "Build-Measure-Learn loop bắt đầu từ đâu?",
            options: {
              A: "Build — code sản phẩm trước",
              B: "Learn — xác định hypothesis cần validate trước",
              C: "Measure — thu thập data trước",
              D: "Sell — bán trước rồi build sau",
            },
            correct: "B",
            explanation:
              "Mặc dù tên là Build-Measure-Learn, thực tế bắt đầu từ Learn: xác định hypothesis → thiết kế experiment (Build) → đo kết quả (Measure) → rút bài học (Learn).",
          },
          {
            id: "u7q2",
            text: "Concierge MVP là gì?",
            options: {
              A: "Phần mềm hoàn chỉnh nhưng ít tính năng",
              B: "Phục vụ khách hàng bằng tay thay vì tự động, để validate demand",
              C: "Landing page thu thập email",
              D: "Prototype trên giấy",
            },
            correct: "B",
            explanation:
              "Concierge MVP: thực hiện dịch vụ bằng tay cho khách hàng đầu tiên thay vì build phần mềm. Mục đích: validate demand và hiểu workflow trước khi đầu tư build.",
          },
          {
            id: "u7q3",
            text: "Wizard of Oz MVP khác Concierge ở điểm nào?",
            options: {
              A: "Wizard of Oz hoàn toàn tự động",
              B: "Wizard of Oz: khách tưởng tự động nhưng thực tế có người làm phía sau",
              C: "Wizard of Oz chỉ dùng cho mobile app",
              D: "Không có sự khác biệt",
            },
            correct: "B",
            explanation:
              "Wizard of Oz: frontend trông tự động nhưng backend là người thực hiện. Khác Concierge (khách biết là manual). Mục đích: test UX và demand mà chưa cần build tech.",
          },
          {
            id: "u7q4",
            text: "Khi brainstorm ý tưởng sản phẩm mới, yếu tố nào quan trọng nhất để screening?",
            options: {
              A: "Ý tưởng phải hoàn toàn mới trên thế giới",
              B: "Problem có thật, Dolphin có lợi thế, market đủ lớn, build được trong 3 tháng",
              C: "CEO thích ý tưởng",
              D: "Đã có đối thủ thành công",
            },
            correct: "B",
            explanation:
              "Quick screening: Problem real? + Dolphin edge? + Market size? + Buildable in 3 months? + Revenue model clear? Tất cả phải 'Có' để proceed.",
          },
          {
            id: "u7q5",
            text: "Tại sao công ty dịch vụ thường thất bại khi build product?",
            options: {
              A: "Vì không có kỹ sư giỏi",
              B: "Vì quen build product như build project — waterfall, scope quá lớn, không validate sớm",
              C: "Vì khách hàng không muốn mua sản phẩm",
              D: "Vì không có vốn đầu tư",
            },
            correct: "B",
            explanation:
              "Service mindset: nhận brief → build full spec → deliver. Product mindset: hypothesis → experiment → validate → iterate. Lean Startup giúp chuyển từ project thinking sang product thinking.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Lean Canvas & Ideation",
        sections: [
          {
            id: "ideation",
            title: "Brainstorm Ý Tưởng",
            repeatable: true,
            maxItems: 8,
            fields: [
              { id: "idea_name", label: "Tên ý tưởng", type: "text", placeholder: "Vd: HotelOps Platform" },
              { id: "idea_problem", label: "Vấn đề giải quyết", type: "textarea", placeholder: "Khách sạn nhỏ quản lý bằng Excel" },
              { id: "idea_domain_link", label: "Liên kết domain expertise Dolphin", type: "textarea", placeholder: "Dolphin đã có kinh nghiệm IPTV cho khách sạn" },
              { id: "idea_target", label: "Khách hàng mục tiêu", type: "text", placeholder: "Vd: Chuỗi khách sạn 2-3 sao, 10-50 phòng" },
            ],
          },
          {
            id: "screening",
            title: "Quick Screening",
            repeatable: true,
            fields: [
              { id: "screen_idea_ref", label: "Ý tưởng", type: "text" },
              { id: "screen_problem_real", label: "Problem có thật?", type: "select", options: ["Có", "Không", "Chưa rõ"] },
              { id: "screen_dolphin_edge", label: "Dolphin có lợi thế?", type: "select", options: ["Có", "Không", "Chưa rõ"] },
              { id: "screen_market_size", label: "Market đủ lớn?", type: "select", options: ["Có", "Không", "Chưa rõ"] },
              { id: "screen_buildable", label: "Build được trong 3 tháng?", type: "select", options: ["Có", "Không", "Chưa rõ"] },
              { id: "screen_revenue_model", label: "Có revenue model rõ?", type: "select", options: ["Có", "Không", "Chưa rõ"] },
              { id: "screen_proceed", label: "→ Tiếp tục?", type: "select", options: ["Có — thiết kế MVP", "Không — park", "Cần research thêm"] },
            ],
          },
        ],
      },
    },

    {
      id: "u8_mvp",
      unitNumber: 8,
      title: "MVP Design & Brand",
      icon: "rocket_launch",
      branch: "B",
      lecture: {
        contentPath: "/content/m2/u8_mvp.md",
        estimatedTime: "15 phút",
      },
      quiz: {
        questions: [
          {
            id: "u8q1",
            text: "MVP là gì?",
            options: {
              A: "Phiên bản đầy đủ tính năng nhưng chưa polish",
              B: "Artifact nhỏ nhất để validate core hypothesis",
              C: "Prototype trên giấy không có code",
              D: "Sản phẩm miễn phí cho khách hàng đầu tiên",
            },
            correct: "B",
            explanation:
              "MVP = Minimum Viable Product: không phải 'version 1 thiếu tính năng' mà là artifact nhỏ nhất đủ để test hypothesis quan trọng nhất.",
          },
          {
            id: "u8q2",
            text: "MVP features nên giới hạn bao nhiêu?",
            options: {
              A: "Càng nhiều càng tốt",
              B: "Tối đa 3 core features",
              C: "Ít nhất 10 features",
              D: "Tùy theo budget",
            },
            correct: "B",
            explanation:
              "Tối đa 3 core features: đủ để validate core hypothesis. Thêm features = thêm thời gian build + khó xác định feature nào tạo giá trị thật.",
          },
          {
            id: "u8q3",
            text: "Experiment Canvas bao gồm yếu tố nào?",
            options: {
              A: "Logo, màu sắc, font chữ",
              B: "Hypothesis, experiment type, success metric, timeline, budget",
              C: "Chỉ cần success metric",
              D: "Business plan 5 năm",
            },
            correct: "B",
            explanation:
              "Experiment Canvas: Hypothesis (tin gì?) → Experiment (test thế nào?) → Success Metric (đo bằng gì?) → Timeline (bao lâu?) → Budget (tốn bao nhiêu?).",
          },
          {
            id: "u8q4",
            text: "Landing page test validate điều gì?",
            options: {
              A: "Technical feasibility",
              B: "Demand — có đủ người quan tâm đến problem/solution không",
              C: "Khả năng tuyển dụng",
              D: "Giá cả đối thủ",
            },
            correct: "B",
            explanation:
              "Landing page test: tạo trang mô tả solution → đo sign-ups/inquiries. Nếu conversion đủ cao → demand có thật. Nếu thấp → cần pivot problem hoặc messaging.",
          },
          {
            id: "u8q5",
            text: "Tại sao cần đặt tên brand cho MVP ngay từ đầu?",
            options: {
              A: "Vì pháp luật yêu cầu đăng ký thương hiệu",
              B: "Vì khách hàng cần nhận diện sản phẩm, và naming discipline buộc team rõ positioning",
              C: "Vì sẽ không thể đổi tên sau này",
              D: "Vì CEO yêu cầu",
            },
            correct: "B",
            explanation:
              "Naming + positioning từ sớm: (1) khách hàng pilot cần gọi tên sản phẩm, (2) quá trình đặt tên buộc team rõ ràng about positioning and target audience.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "MVP Scope & Experiment Canvas",
        sections: [
          {
            id: "mvp_scope",
            title: "MVP Scope",
            fields: [
              { id: "product_name", label: "Tên sản phẩm mới", type: "text", placeholder: "Theo naming convention từ Unit 3" },
              { id: "core_hypothesis", label: "Core Hypothesis", type: "textarea", placeholder: "Vd: Khách sạn nhỏ sẵn sàng trả 2M/tháng cho hệ thống quản lý tích hợp" },
              { id: "mvp_features", label: "MVP features (tối đa 3)", type: "textarea", placeholder: "Vd: 1) Booking mgmt, 2) Check-in digital, 3) Revenue dashboard" },
              { id: "mvp_not_included", label: "Không bao gồm trong MVP", type: "textarea", placeholder: "Vd: Multi-property, AI pricing — build sau nếu validated" },
              { id: "build_timeline", label: "Timeline", type: "text", placeholder: "Vd: 6 tuần" },
              { id: "mvp_cost", label: "Chi phí (triệu VND)", type: "number", placeholder: "Vd: 300" },
            ],
          },
          {
            id: "brand_new_product",
            title: "Brand cho sản phẩm mới",
            fields: [
              { id: "brand_name", label: "Brand name", type: "text", placeholder: "Vd: HotelOps by Dolphin Technology" },
              { id: "brand_tagline", label: "Tagline", type: "text", placeholder: "Vd: Quản lý khách sạn thông minh" },
              { id: "brand_positioning", label: "Positioning statement", type: "textarea", placeholder: "Cho [target], [product name] là [category] giúp [benefit] khác biệt bởi [differentiator]." },
            ],
          },
          {
            id: "experiment",
            title: "Experiment Canvas",
            fields: [
              { id: "experiment_type", label: "Loại experiment", type: "select", options: ["Landing page test", "Concierge MVP", "Wizard of Oz", "Prototype + user test", "Pilot with real customer"] },
              { id: "success_metric", label: "Success metric", type: "textarea", placeholder: "Vd: ≥50 sign-ups trong 2 tuần, conversion ≥5%" },
              { id: "experiment_duration", label: "Thời gian", type: "text", placeholder: "Vd: 2 tuần" },
              { id: "experiment_budget", label: "Budget (triệu VND)", type: "number", placeholder: "Vd: 50" },
            ],
          },
        ],
      },
    },

    {
      id: "u9_kill",
      unitNumber: 9,
      title: "Lean Validation & Kill Criteria",
      icon: "fact_check",
      branch: "B",
      lecture: {
        contentPath: "/content/m2/u9_kill.md",
        estimatedTime: "15 phút",
      },
      quiz: {
        questions: [
          {
            id: "u9q1",
            text: "Zombie product là gì?",
            options: {
              A: "Sản phẩm bị hack",
              B: "Sản phẩm không sống, không chết — tốn resource nhưng không tạo learning hay revenue",
              C: "Sản phẩm đã bị kill nhưng khách hàng vẫn dùng",
              D: "Sản phẩm chỉ hoạt động ban đêm",
            },
            correct: "B",
            explanation:
              "Zombie product: không đủ traction để scale, nhưng không ai dám kill → tiếp tục tốn resource (team, budget, management attention) mà không tạo giá trị.",
          },
          {
            id: "u9q2",
            text: "Innovation accounting khác financial accounting ở điểm nào?",
            options: {
              A: "Innovation accounting đo validated learning thay vì chỉ revenue",
              B: "Innovation accounting không dùng số liệu",
              C: "Innovation accounting chỉ dùng cho startup",
              D: "Không có sự khác biệt",
            },
            correct: "A",
            explanation:
              "Financial accounting đo revenue, profit. Innovation accounting đo tiến triển bằng validated learning: hypothesis tested, conversion rates, engagement — phù hợp cho sản phẩm giai đoạn đầu chưa có revenue.",
          },
          {
            id: "u9q3",
            text: "Validation timeline có mấy phase?",
            options: {
              A: "1 phase",
              B: "2 phases",
              C: "3 phases: Problem → Solution → Business Model",
              D: "5 phases",
            },
            correct: "C",
            explanation:
              "3 phases: (1) Problem Validation (tuần 1-2): pain point có thật? (2) Solution Validation (tuần 3-6): giải pháp có giải quyết problem? (3) Business Model Validation (tuần 7-12): khách có trả tiền?",
          },
          {
            id: "u9q4",
            text: "Kill criteria nên đặt khi nào?",
            options: {
              A: "Sau khi product đã launch",
              B: "TRƯỚC khi bắt đầu build — cam kết khi chưa bị sunk cost bias",
              C: "Khi hết budget",
              D: "Khi CEO quyết định",
            },
            correct: "B",
            explanation:
              "Đặt kill criteria TRƯỚC khi bắt đầu: lúc này team chưa đầu tư effort → objectve hơn. Sau khi đã invest → sunk cost bias khiến khó dừng dù evidence nói nên kill.",
          },
          {
            id: "u9q5",
            text: "Kill trigger Day 90 thường là gì?",
            options: {
              A: "Team chưa tuyển đủ người",
              B: "Dưới 1 khách hàng trả tiền HOẶC CAC > 5x MRR",
              C: "Chưa hoàn thành MVP",
              D: "CEO chưa review",
            },
            correct: "B",
            explanation:
              "Day 90: đánh giá business viability. Dưới 1 paying customer hoặc chi phí thu hút khách (CAC) > 5 lần monthly recurring revenue (MRR) → kill signal rõ ràng.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Kill Criteria Checklist",
        sections: [
          {
            id: "validation_timeline",
            title: "Validation Timeline",
            fields: [
              { id: "phase_1", label: "Phase 1: Problem Validation (tuần 1-2)", type: "textarea", placeholder: "Vd: Interview 10 khách sạn, xác nhận pain point" },
              { id: "phase_2", label: "Phase 2: Solution Validation (tuần 3-6)", type: "textarea", placeholder: "Vd: Build MVP, pilot với 3 khách sạn" },
              { id: "phase_3", label: "Phase 3: Business Model Validation (tuần 7-12)", type: "textarea", placeholder: "Vd: 5 paying customers, đo churn" },
            ],
          },
          {
            id: "kill_criteria",
            title: "Kill Criteria (Cam kết ban lãnh đạo)",
            description: "Cam kết: nếu trigger bất kỳ điều kiện nào dưới đây → KILL, không thương lượng.",
            fields: [
              { id: "kill_day_30", label: "Kill trigger — Day 30", type: "textarea", placeholder: "Vd: <5 interviews HOẶC 0% willingness to pay" },
              { id: "kill_day_60", label: "Kill trigger — Day 60", type: "textarea", placeholder: "Vd: <2 pilot customers HOẶC MVP bị technical blocker" },
              { id: "kill_day_90", label: "Kill trigger — Day 90", type: "textarea", placeholder: "Vd: <1 paying customer HOẶC CAC > 5x MRR" },
              { id: "kill_commitment", label: "Cam kết", type: "select", options: ["Ban lãnh đạo đồng ý tuân thủ kill criteria", "Cần thảo luận thêm"] },
            ],
          },
        ],
      },
    },

    {
      id: "u10_pricing",
      unitNumber: 10,
      title: "Pricing Strategy & Migration",
      icon: "payments",
      branch: null,
      lecture: {
        contentPath: "/content/m2/u10_pricing.md",
        estimatedTime: "20 phút",
      },
      quiz: {
        questions: [
          {
            id: "u10q1",
            text: "T&M (Time & Material) có structural problem gì?",
            options: {
              A: "Giá quá cao cho khách hàng",
              B: "Team làm nhanh hơn = doanh thu thấp hơn — revenue gắn với headcount",
              C: "Không thể estimate được",
              D: "Chỉ phù hợp cho team lớn",
            },
            correct: "B",
            explanation:
              "T&M trap: revenue = giờ làm × rate. Team efficient hơn → ít giờ hơn → ít revenue hơn. Cần chuyển sang model decouple revenue khỏi headcount.",
          },
          {
            id: "u10q2",
            text: "Pricing model nào có margin tiềm năng cao nhất?",
            options: {
              A: "Time & Material (20-30%)",
              B: "Fixed Price (25-40%)",
              C: "Subscription/SaaS (60-80%)",
              D: "Retainer (25-35%)",
            },
            correct: "C",
            explanation:
              "Subscription/SaaS: margin 60-80% vì chi phí phục vụ thêm 1 khách gần = 0 (marginal cost thấp). T&M margin bị giới hạn bởi chi phí nhân sự.",
          },
          {
            id: "u10q3",
            text: "Pricing Migration Path target T&M Year 3 là bao nhiêu?",
            options: {
              A: "0%",
              B: "30%",
              C: "50%",
              D: "70%",
            },
            correct: "B",
            explanation:
              "Migration path: T&M từ 70% → 30% sau 3 năm. Thay thế bằng Managed/Value-based (30%) và Subscription/Product (20%).",
          },
          {
            id: "u10q4",
            text: "Value-based pricing phù hợp với loại dịch vụ nào?",
            options: {
              A: "Staff augmentation",
              B: "Consulting, unique IP, high expertise — giá trị business rõ ràng",
              C: "Maintenance & support",
              D: "Data entry và testing cơ bản",
            },
            correct: "B",
            explanation:
              "Value-based pricing: tính giá theo giá trị mang lại cho khách (vd: tiết kiệm 500M/năm → charge 100M), không theo giờ. Cần expertise cao và ROI đo lường được.",
          },
          {
            id: "u10q5",
            text: "Tại sao pricing là đòn bẩy lớn nhất cho margin?",
            options: {
              A: "Vì giảm chi phí nhân sự",
              B: "Vì tăng giá 10% có thể tăng profit 30-50% mà không cần thêm người",
              C: "Vì khách hàng không quan tâm giá",
              D: "Vì đối thủ không biết giá của mình",
            },
            correct: "B",
            explanation:
              "Pricing leverage: nếu margin hiện tại 25%, tăng giá 10% → margin tăng từ 25% lên ~35% (tăng 40% profit) mà team size giữ nguyên. Không có đòn bẩy nào hiệu quả bằng.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Pricing Table & Migration",
        sections: [
          {
            id: "pricing_per_product",
            title: "Pricing cho từng sản phẩm",
            perProduct: true,
            fields: [
              { id: "current_pricing", label: "Pricing model hiện tại", type: "select", options: ["Time & Material", "Fixed Price", "Retainer", "Managed Service", "Value-based", "Subscription", "Chưa có"] },
              { id: "target_pricing", label: "Target pricing model", type: "select", options: ["Time & Material", "Fixed Price", "Retainer", "Managed Service", "Value-based", "Subscription"] },
              { id: "target_price", label: "Target price (VND/tháng)", type: "text", placeholder: "Vd: 5.000.000" },
              { id: "target_margin", label: "Target margin (%)", type: "number", placeholder: "Vd: 45" },
            ],
          },
          {
            id: "pricing_migration",
            title: "Pricing Migration Path",
            fields: [
              { id: "tm_current", label: "T&M hiện tại (%)", type: "number", placeholder: "70" },
              { id: "tm_y1", label: "T&M Year 1 (%)", type: "number", placeholder: "50" },
              { id: "tm_y3", label: "T&M Year 3 (%)", type: "number", placeholder: "30" },
              { id: "subscription_current", label: "Subscription hiện tại (%)", type: "number", placeholder: "0" },
              { id: "subscription_y1", label: "Subscription Year 1 (%)", type: "number", placeholder: "15" },
              { id: "subscription_y3", label: "Subscription Year 3 (%)", type: "number", placeholder: "20" },
            ],
          },
        ],
      },
    },

    {
      id: "u11_convergence",
      unitNumber: 11,
      title: "Portfolio Convergence & Roadmap",
      icon: "merge",
      branch: null,
      lecture: {
        contentPath: "/content/m2/u11_convergence.md",
        estimatedTime: "20 phút",
      },
      quiz: {
        questions: [
          {
            id: "u11q1",
            text: "Three Horizons Framework chia portfolio thành mấy tầng?",
            options: {
              A: "2 tầng",
              B: "3 tầng: Optimize (Now) → Build (Next) → Create (Future)",
              C: "4 tầng",
              D: "5 tầng",
            },
            correct: "B",
            explanation:
              "3 Horizons: H1 Optimize & Defend (0-12 tháng) → H2 Build & Grow (6-24 tháng) → H3 Create & Incubate (12-36 tháng). Mỗi horizon có mục tiêu và resource allocation riêng.",
          },
          {
            id: "u11q2",
            text: "Sai lầm phổ biến nhất khi quản lý portfolio là gì?",
            options: {
              A: "Đầu tư quá ít",
              B: "Dàn trải nguồn lực đều cho tất cả sản phẩm thay vì focus",
              C: "Chỉ tập trung vào 1 sản phẩm",
              D: "Không tuyển thêm người",
            },
            correct: "B",
            explanation:
              "Peanut butter spreading: chia đều resource cho mọi sản phẩm = không sản phẩm nào đủ resource để thành công. Phải có discipline chọn và tập trung.",
          },
          {
            id: "u11q3",
            text: "Unit 11 yêu cầu tổng hợp decisions từ đâu?",
            options: {
              A: "Chỉ từ Unit 4 (Spin-off)",
              B: "Từ TẤT CẢ Unit 1–10: inventory, brand, scoring, testing, sprint, lean, MVP, pricing",
              C: "Chỉ từ Module 1",
              D: "Từ CEO decision alone",
            },
            correct: "B",
            explanation:
              "Unit 11 = convergence: tổng hợp MỌI quyết định từ Unit 1-10 thành 1 roadmap nhất quán. Không có unit nào đứng riêng — tất cả phải align.",
          },
          {
            id: "u11q4",
            text: "Roadmap cần bao gồm mấy mốc thời gian?",
            options: {
              A: "Chỉ 90 ngày",
              B: "Chỉ Year 3",
              C: "3 mốc: 90 ngày, Year 1, Year 3",
              D: "5 mốc: 30 ngày, 60 ngày, 90 ngày, Year 1, Year 3",
            },
            correct: "C",
            explanation:
              "3 mốc: 90 ngày (quick wins, sprint đầu tiên), Year 1 (product + service goals, resource 85:15), Year 3 (vision, resource 50:50, portfolio picture).",
          },
          {
            id: "u11q5",
            text: "Ownership & Accountability yêu cầu gì cho mỗi sản phẩm?",
            options: {
              A: "Chỉ cần CEO approve",
              B: "Product Owner cụ thể + team size target + first milestone (30 ngày)",
              C: "Chỉ cần budget",
              D: "Chỉ cần timeline",
            },
            correct: "B",
            explanation:
              "Accountability rõ ràng: ai chịu trách nhiệm (Product Owner), cần bao nhiêu người (team size), và deliverable đầu tiên trong 30 ngày. Không có owner = không ai chịu trách nhiệm = không tiến triển.",
          },
        ],
      },
      practice: {
        type: "form",
        title: "Portfolio Roadmap",
        sections: [
          {
            id: "decisions_summary",
            title: "Portfolio Decisions Summary",
            description: "Tổng hợp decisions từ tất cả units trước.",
            perProduct: true,
            fields: [
              { id: "decision", label: "Kết quả đánh giá", type: "text", placeholder: "Vd: INVEST / WATCH / KILL / Spin-off candidate" },
              { id: "branch", label: "Thuộc nhánh", type: "select", options: ["A — Hiện tại", "B — Mới", "Service"] },
              { id: "action", label: "Hành động tiếp theo", type: "textarea", placeholder: "Vd: Setup BU pilot team 3 người" },
              { id: "priority", label: "Mức ưu tiên", type: "select", options: ["P0 — Ngay", "P1 — Q1", "P2 — Year 1", "P3 — Later"] },
            ],
          },
          {
            id: "roadmap_90day",
            title: "90-Day Roadmap",
            fields: [
              { id: "r90_branch_a", label: "Actions sản phẩm hiện tại", type: "textarea", placeholder: "Vd: Spin-off prep VB Điện tử, rebrand 4 SP, set KPIs" },
              { id: "r90_branch_b", label: "Actions sản phẩm mới", type: "textarea", placeholder: "Vd: Build MVP HotelOps (6 tuần), validate (4 tuần)" },
              { id: "r90_resource", label: "Resource split", type: "text", placeholder: "85 : 15", helper: "Year 1: Service 85% / Product 15%" },
            ],
          },
          {
            id: "roadmap_y1",
            title: "Year 1 Roadmap",
            fields: [
              { id: "y1_product_goals", label: "Product goals", type: "textarea", placeholder: "Vd: 1 SP profitable, 1 MVP validated" },
              { id: "y1_service_goals", label: "Service goals", type: "textarea", placeholder: "Vd: Tăng margin service 5%, launch 1 value-add service" },
              { id: "y1_resource", label: "Resource split", type: "text", placeholder: "70 : 30" },
            ],
          },
          {
            id: "roadmap_y3",
            title: "Year 3 Vision",
            fields: [
              { id: "y3_portfolio", label: "Portfolio picture", type: "textarea", placeholder: "Vd: 2-3 SP profitable, 1 spin-off, product revenue ≥ 30%" },
              { id: "y3_resource", label: "Resource split", type: "text", placeholder: "50 : 50" },
              { id: "y3_revenue_target", label: "Revenue target (tỷ VND)", type: "number" },
            ],
          },
          {
            id: "ownership",
            title: "Ownership & Accountability",
            perProduct: true,
            fields: [
              { id: "owner", label: "Product Owner", type: "text", placeholder: "Tên người chịu trách nhiệm" },
              { id: "team_size", label: "Team size target", type: "number", placeholder: "Vd: 5" },
              { id: "first_milestone", label: "First milestone (30 ngày)", type: "text", placeholder: "Vd: Hoàn thành rebranding + KPI dashboard" },
            ],
          },
        ],
      },
    },
  ],
};

export default MODULE2_CONFIG;
