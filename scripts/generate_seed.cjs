const fs = require('fs');
const path = require('path');

// 8 Core Categories
const categories = [
  {
    id: 1,
    name: 'Tin tức AI',
    slug: 'ai-news',
    description: 'Cập nhật chuyển động nhanh nhất về các mô hình ngôn ngữ lớn, AI đa phương thức và đột phá trí tuệ nhân tạo toàn cầu.',
    color: '#46C7F0'
  },
  {
    id: 2,
    name: 'Xu hướng Công nghệ',
    slug: 'tech-trends',
    description: 'Điện toán đám mây, Edge computing, bán dẫn thế hệ mới và các xu hướng công nghệ tương lai.',
    color: '#F47D59'
  },
  {
    id: 3,
    name: 'Công cụ AI & Tiện ích',
    slug: 'ai-tools',
    description: 'Khám phá và thử nghiệm các công cụ AI hỗ trợ sáng tạo nội dung, giọng nói, đồ họa và lập trình.',
    color: '#A855F7'
  },
  {
    id: 4,
    name: 'Thủ thuật & Hướng dẫn',
    slug: 'tutorials',
    description: 'Cẩm nang thực chiến, mẹo tối ưu prompt, triển khai hệ thống và tích hợp API hiệu quả.',
    color: '#10B981'
  },
  {
    id: 5,
    name: 'Đánh giá & Trải nghiệm',
    slug: 'reviews',
    description: 'Đánh giá khách quan các sản phẩm công nghệ, dịch vụ phần mềm SaaS và thiết bị thông minh.',
    color: '#3B82F6'
  },
  {
    id: 6,
    name: 'An ninh mạng & Dữ liệu',
    slug: 'cybersecurity',
    description: 'Bảo mật thông tin, an toàn dữ liệu trên đám mây, phòng chống tấn công mạng và quyền riêng tư.',
    color: '#EC4899'
  },
  {
    id: 7,
    name: 'Phần cứng & Robotics',
    slug: 'robotics-hardware',
    description: 'Robot hình người, thiết bị AI phần cứng, vi xử lý NPU và sự phát triển của tự động hóa.',
    color: '#F59E0B'
  },
  {
    id: 8,
    name: 'Lập trình & Khởi nghiệp',
    slug: 'startups-coding',
    description: 'Kinh nghiệm lập trình, văn hóa kỹ thuật, kiến trúc hệ thống và hệ sinh thái công nghệ khởi nghiệp.',
    color: '#6366F1'
  }
];

// Tech & AI Curated Images Pool (High resolution Unsplash tech photos)
const images = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
];

// Curated Tools for the Directory
const tools = [
  {
    name: 'OmniVoice AI Gateway',
    slug: 'omnivoice-gateway',
    url: 'https://voice.oloka.net',
    short_description: 'Nền tảng chuyển văn bản thành giọng đọc (TTS) tiếng Việt và AI Voice Studio vận hành tốc độ cao trên Cloudflare Edge.',
    icon: 'Volume2',
    category: 'voice',
    badge: 'Hot',
    featured: 1,
    order: 1
  },
  {
    name: 'Oloka QR Code Studio',
    slug: 'oloka-qr-code',
    url: 'https://github.com/phucsd/oloka-qr-generator',
    short_description: 'Công cụ tạo mã QR nhận diện 2 tone màu Oloka (#46C7F0 & #F47D59), chèn logo thương hiệu và tối ưu chất lượng vector in ấn.',
    icon: 'QrCode',
    category: 'utility',
    badge: 'Mới',
    featured: 1,
    order: 2
  },
  {
    name: 'Google Gemini AI Studio',
    slug: 'gemini-ai-studio',
    url: 'https://aistudio.google.com',
    short_description: 'Môi trường phát triển và kiểm thử prompt đa phương thức với các mô hình Gemini Flash & Pro từ Google DeepMind.',
    icon: 'Sparkles',
    category: 'ai',
    badge: 'Miễn phí',
    featured: 1,
    order: 3
  },
  {
    name: 'ElevenLabs Voice Engine',
    slug: 'elevenlabs-voice',
    url: 'https://elevenlabs.io',
    short_description: 'Nền tảng nhân bản giọng nói AI đa ngôn ngữ với độ chân thực cảm xúc hàng đầu thế giới.',
    icon: 'Mic',
    category: 'voice',
    badge: 'Phổ biến',
    featured: 0,
    order: 4
  },
  {
    name: 'Hugging Face Hub',
    slug: 'hugging-face-hub',
    url: 'https://huggingface.co',
    short_description: 'Cộng đồng mã nguồn mở lớn nhất thế giới lưu trữ hàng trăm nghìn mô hình AI, bộ dữ liệu và ứng dụng demo.',
    icon: 'FolderTree',
    category: 'ai',
    badge: 'Miễn phí',
    featured: 0,
    order: 5
  },
  {
    name: 'Cloudflare Workers Developer',
    slug: 'cloudflare-workers-docs',
    url: 'https://developers.cloudflare.com/workers',
    short_description: 'Tài liệu và công cụ triển khai serverless edge computing, D1 database và R2 storage trên mạng lưới Cloudflare.',
    icon: 'Cpu',
    category: 'developer',
    badge: 'Miễn phí',
    featured: 1,
    order: 6
  },
  {
    name: 'Perplexity AI Search',
    slug: 'perplexity-ai',
    url: 'https://perplexity.ai',
    short_description: 'Công cụ tìm kiếm hội thoại thông minh trích dẫn nguồn thời gian thực và tổng hợp thông tin học thuật.',
    icon: 'Search',
    category: 'ai',
    badge: 'Phổ biến',
    featured: 0,
    order: 7
  },
  {
    name: 'Cursor AI Code Editor',
    slug: 'cursor-ai-editor',
    url: 'https://cursor.com',
    short_description: 'Trình biên tập mã nguồn tích hợp trợ lý AI thông minh thế hệ mới dựa trên VS Code dành cho lập trình viên.',
    icon: 'Code',
    category: 'developer',
    badge: 'Hot',
    featured: 1,
    order: 8
  }
];

function makeLexicalJson(title, excerpt, headings, paragraphs) {
  const children = [
    {
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          mode: 'normal',
          text: excerpt,
          type: 'text',
          style: '',
          detail: 0,
          format: 2, // italic
          version: 1
        }
      ],
      direction: 'ltr'
    }
  ];

  for (let i = 0; i < headings.length; i++) {
    children.push({
      type: 'heading',
      tag: 'h2',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          mode: 'normal',
          text: headings[i],
          type: 'text',
          style: '',
          detail: 0,
          format: 1, // bold
          version: 1
        }
      ],
      direction: 'ltr'
    });

    if (paragraphs[i]) {
      children.push({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: paragraphs[i],
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1
          }
        ],
        direction: 'ltr'
      });
    }
  }

  // Summary conclusion
  children.push({
    type: 'heading',
    tag: 'h3',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        mode: 'normal',
        text: 'Tổng kết & Định hướng áp dụng',
        type: 'text',
        style: '',
        detail: 0,
        format: 1,
        version: 1
      }
    ],
    direction: 'ltr'
  });

  children.push({
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        mode: 'normal',
        text: 'Sự phát triển nhanh chóng của công nghệ đòi hỏi người dùng và doanh nghiệp không ngừng cập nhật để tối ưu hóa quy trình làm việc. Hãy tiếp tục theo dõi Oloka.net để nhận những phân tích chuyên sâu và các công cụ thực chiến mới nhất.',
        type: 'text',
        style: '',
        detail: 0,
        format: 0,
        version: 1
      }
    ],
    direction: 'ltr'
  });

  return JSON.stringify({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: children,
      direction: 'ltr'
    }
  });
}

function escapeSql(str) {
  if (typeof str !== 'string') return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

// 100 Raw Articles Metadata List
const rawArticles = [
  // 1 - 15: Tin tức AI (ai-news)
  {
    catId: 1,
    title: 'Mô hình AI đa phương thức thế hệ mới chính thức vượt mốc tư duy thời gian thực',
    slug: 'mo-hinh-ai-da-phuong-thuc-the-he-moi-tu-duy-thoi-gian-thuc',
    excerpt: 'Các phòng thí nghiệm trí tuệ nhân tạo hàng đầu vừa công bố bước nhảy vọt trong xử lý video và âm thanh song song với độ trễ dưới 80ms, mở ra kỷ nguyên trợ lý giọng nói siêu thực.',
    h: ['1. Đột phá về độ trễ cực thấp', '2. Tích hợp âm thanh, hình ảnh và ngữ cảnh đa chiều', '3. Thách thức hạ tầng điện toán đám mây'],
    p: [
      'Khả năng phản hồi tức thời là ranh giới then chốt giữa một chatbot thông thường và một trợ lý tương tác tự nhiên. Mô hình mới giảm độ trễ từ 500ms xuống chỉ còn dưới 80ms.',
      'Không chỉ phân tích văn bản, hệ thống phân tích đồng thời luồng video trực tiếp từ camera và âm giọng của người dùng để nắm bắt cảm xúc chính xác.',
      'Để duy trì tốc độ này cho hàng triệu người dùng, các nhà cung cấp đang chuyển đổi mô hình sang cụm máy chủ Edge AI phân tán toàn cầu.'
    ],
    tags: ['AI', 'Multimodal', 'Deep Learning', 'Edge AI'],
    featured: 1
  },
  {
    catId: 1,
    title: 'Google ra mắt thế hệ mô hình Gemini mới tối ưu khả năng lập trình và suy luận logic',
    slug: 'google-ra-mat-mo-hinh-gemini-moi-toi-uu-lap-trinh-suy-luan',
    excerpt: 'Phiên bản cải tiến tập trung vào khả năng tự kiểm thử mã nguồn, hiểu sâu các codebase phức tạp trên 1 triệu token và giảm 40% chi phí tính toán.',
    h: ['1. Cửa sổ ngữ cảnh khổng lồ và độ chính xác', '2. Tự sửa lỗi thông qua vòng lặp phản hồi', '3. Ứng dụng thực tế trong chu trình DevOps'],
    p: [
      'Khả năng lưu giữ ngữ cảnh lớn giúp mô hình bao quát toàn bộ tài liệu dự án cùng các phụ thuộc thư viện mà không bị hiện tượng ảo giác (hallucination).',
      'Mô hình có thể tự viết bài kiểm thử đơn vị (unit test), phát hiện lỗi logic tiềm ẩn và đưa ra giải pháp sửa đổi với giải trình chi tiết.',
      'Các đội ngũ kỹ thuật có thể rút ngắn đến 50% thời gian rà soát mã nguồn (code review) và tăng tốc độ phát hành tính năng mới.'
    ],
    tags: ['Google', 'Gemini', 'Coding', 'DevOps'],
    featured: 1
  },
  {
    catId: 1,
    title: 'OpenAI công bố lộ trình mô hình suy luận sâu với cơ chế tư duy theo chuỗi (Chain-of-Thought)',
    slug: 'openai-cong-bo-lo-trinh-suy-luan-sau-chain-of-thought',
    excerpt: 'Cơ chế mới cho phép AI dành nhiều thời gian hơn để suy nghĩ trước khi phản hồi, nâng cao độ tin cậy trong các bài toán toán học và nghiên cứu khoa học.',
    h: ['1. Bản chất của suy luận theo chuỗi tư duy', '2. Ứng dụng trong nghiên cứu khoa học và y tế', '3. Tiêu chuẩn đánh giá độ chính xác'],
    p: [
      'Bằng cách chia nhỏ các bài toán phức tạp thành nhiều bước trung gian, mô hình hạn chế tối đa các suy đoán sai lầm thường gặp ở LLM truyền thống.',
      'Trong lĩnh vực tổng hợp hóa dược và giải mã protein, mô hình hỗ trợ các nhà khoa học đối chiếu hàng nghìn giả thuyết trong vài phút.',
      'Cộng đồng học thuật đánh giá cao khả năng cung cấp bằng chứng và tài liệu tham khảo có thể kiểm chứng độc lập của thế hệ này.'
    ],
    tags: ['OpenAI', 'Reasoning', 'ChainOfThought', 'Science'],
    featured: 1
  },
  {
    catId: 1,
    title: 'Anthropic giới thiệu tính năng tương tác máy tính tự động qua giao diện người dùng',
    slug: 'anthropic-gioi-thieu-tinh-nang-tuong-tac-may-tinh-tu-dong',
    excerpt: 'AI nay có thể nhìn màn hình máy tính, di chuyển chuột, nhấp nút và gõ bàn phím để thực hiện các tác vụ phức tạp thay cho người dùng.',
    h: ['1. Cơ chế Computer Use đột phá', '2. Tự động hóa các quy trình văn phòng', '3. Biện pháp an toàn và quyền kiểm soát'],
    p: [
      'Thông qua việc đọc ảnh chụp màn hình thời gian thực, AI xác định vị trí các trường nhập liệu và nút bấm để tương tác chính xác.',
      'Từ việc điền biểu mẫu kế toán, xuất báo cáo từ CRM đến tổng hợp dữ liệu bảng tính, mô hình có thể tự động hoàn tất chỉ với một câu lệnh đơn giản.',
      'Hệ thống được trang bị các rào cản bảo mật nghiêm ngặt nhằm ngăn chặn các hành động rủi ro cao mà không có sự xác nhận của người quản trị.'
    ],
    tags: ['Anthropic', 'Claude', 'Automation', 'ComputerUse'],
    featured: 1
  },
  {
    catId: 1,
    title: 'Mô hình ngôn ngữ nguồn mở DeepSeek gây tiếng vang lớn nhờ kiến trúc Mixture-of-Experts',
    slug: 'mo-hinh-deepseek-nguon-mo-gay-tieng-vang-kien-truc-moe',
    excerpt: 'Với chi phí đào tạo tiết kiệm ngoạn mục và hiệu năng ngang ngửa các mô hình đóng, DeepSeek đang tạo làn sóng đổi mới mạnh mẽ trong giới nghiên cứu.',
    h: ['1. Tối ưu kiến trúc Mixture-of-Experts (MoE)', '2. Cắt giảm chi phí tính toán phần cứng', '3. Tác động tới cộng đồng nguồn mở'],
    p: [
      'Kiến trúc MoE chỉ kích hoạt một nhóm chuyên gia nơ-ron phù hợp cho mỗi token, giúp giảm đáng kể năng lượng tiêu thụ trên GPU.',
      'Doanh nghiệp nhỏ và các phòng nghiên cứu độc lập nay có thể tự lưu trữ mô hình mạnh mẽ với chi phí hạ tầng trong tầm tay.',
      'Sự xuất hiện của DeepSeek thúc đẩy tính minh bạch và đẩy nhanh tiến trình dân chủ hóa công nghệ trí tuệ nhân tạo.'
    ],
    tags: ['DeepSeek', 'OpenSource', 'MoE', 'MachineLearning'],
    featured: 0
  },
  {
    catId: 1,
    title: 'Kỷ nguyên Agentic AI: Khi các tác nhân trí tuệ nhân tạo phối hợp làm việc theo nhóm',
    slug: 'ky-nguyen-agentic-ai-cac-tac-nhan-phoi-hop-theo-nhom',
    excerpt: 'Không còn là những chatbot đơn lẻ, các tác nhân AI hiện nay có thể chia vai trò: người lập kế hoạch, người viết mã, người kiểm thử và người giám sát.',
    h: ['1. Phân quyền và phân nhiệm trong mô hình đa tác nhân', '2. Cơ chế nhớ dài hạn và chia sẻ trạng thái', '3. Hiệu quả vượt trội so với prompt đơn lẻ'],
    p: [
      'Mỗi tác nhân AI được trao một hệ thống mục tiêu và công cụ riêng, phối hợp nhịp nhàng như một nhóm kỹ sư phần mềm thực thụ.',
      'Nhờ bộ nhớ ngữ cảnh dùng chung (shared memory), các tác nhân không bị lặp lại công việc và có thể rà soát lỗi chéo lẫn nhau.',
      'Mô hình đa tác nhân mở đường cho việc tự động hóa toàn bộ quy trình phát triển sản phẩm từ ý tưởng sơ khai đến bản phát hành hoàn chỉnh.'
    ],
    tags: ['AgenticAI', 'MultiAgent', 'Automation', 'FutureTech'],
    featured: 1
  },
  {
    catId: 1,
    title: 'Meta công bố bộ sưu tập mô hình Llama 4 với kích thước linh hoạt từ cạnh biên đến trung tâm dữ liệu',
    slug: 'meta-cong-bo-bo-suu-tap-mo-hinh-llama-4-nguon-mo',
    excerpt: 'Thế hệ Llama mới mang lại khả năng xử lý hình ảnh và video thời gian thực, hỗ trợ chạy mượt mà ngay trên các thiết bị di động cá nhân.',
    h: ['1. Tối ưu hóa cho thiết bị di động và máy tính bảng', '2. Hỗ trợ đa ngôn ngữ chuyên sâu', '3. Hệ sinh thái công cụ hỗ trợ phong phú'],
    p: [
      'Người dùng có thể chạy mô hình trực tiếp trên máy tính xách tay mà không cần gửi dữ liệu lên máy chủ của bên thứ ba, bảo đảm tối đa tính riêng tư.',
      'Khả năng dịch thuật và đối thoại tiếng Việt được cải thiện rõ rệt nhờ tập dữ liệu huấn luyện đa dạng hóa văn hóa khu vực Đông Nam Á.',
      'Meta tiếp tục khẳng định cam kết phát triển nguồn mở với giấy phép linh hoạt cho các tổ chức khởi nghiệp.'
    ],
    tags: ['Meta', 'Llama', 'OpenSource', 'MobileAI'],
    featured: 0
  },
  {
    catId: 1,
    title: 'Đột phá tổng hợp giọng nói tiếng Việt tự nhiên với mô hình khuếch tán âm thanh (Audio Diffusion)',
    slug: 'dot-pha-tong-hop-giong-noi-tieng-viet-audio-diffusion',
    excerpt: 'Công nghệ khuếch tán âm thanh mang lại giọng đọc giàu cảm xúc, thể hiện chân thực tiếng thở, ngắt nghỉ và ngữ điệu từng vùng miền.',
    h: ['1. Vượt qua giới hạn của phương pháp ghép âm truyền thống', '2. Mô phỏng ngữ điệu và sắc thái biểu cảm', '3. Ứng dụng trong sách nói và trợ lý ảo'],
    p: [
      'Mô hình khuếch tán tạo ra dạng sóng âm thanh liên tục với độ phân giải cao 48kHz, xóa bỏ hoàn toàn cảm giác âm thanh kim loại khô cứng.',
      'Các biên tập viên có thể dễ dàng điều chỉnh cảm xúc của giọng đọc từ trang trọng, truyền cảm đến vui tươi, sôi nổi.',
      'Dịch vụ OmniVoice của Oloka.net đang tích cực thử nghiệm công nghệ này để phục vụ nhu cầu sản xuất nội dung truyền thông.'
    ],
    tags: ['TTS', 'VietnameseSpeech', 'AudioDiffusion', 'VoiceAI'],
    featured: 1
  },
  {
    catId: 1,
    title: 'Liên minh châu Âu ban hành hướng dẫn thực thi Đạo luật AI (EU AI Act) cho các nhà phát triển',
    slug: 'lien-minh-chau-au-ban-hanh-huong-dan-thuc-thi-dao-luat-ai',
    excerpt: 'Bộ quy chuẩn phân loại rủi ro chi tiết giúp các công ty công nghệ điều chỉnh sản phẩm đáp ứng tiêu chuẩn minh bạch và an toàn dữ liệu.',
    h: ['1. Phân cấp 4 mức độ rủi ro công nghệ AI', '2. Yêu cầu gắn nhãn nội dung do AI tạo ra', '3. Tác động đến các startup công nghệ toàn cầu'],
    p: [
      'Các ứng dụng trong lĩnh vực chấm điểm công dân hay nhận diện cảm xúc tại nơi làm việc bị hạn chế nghiêm ngặt hoặc cấm hoàn toàn.',
      'Mọi hình ảnh, âm thanh hay văn bản do máy tổng hợp phải có dấu vân tay số (watermarking) để người tiêu dùng dễ dàng nhận biết.',
      'Các doanh nghiệp cần chủ động rà soát quy trình quản trị dữ liệu nhằm tránh các khoản phạt tài chính nghiêm khắc.'
    ],
    tags: ['Policy', 'EUAIAct', 'Ethics', 'Compliance'],
    featured: 0
  },
  {
    catId: 1,
    title: 'Cuộc đua chip AI tăng tốc: Cuộc cạnh tranh giữa GPU rời và kiến trúc bộ nhớ HBM thế hệ mới',
    slug: 'cuoc-dua-chip-ai-tang-toc-gpu-va-bo-nho-hbm',
    excerpt: 'Băng thông bộ nhớ đang là nút thắt cổ chai lớn nhất trong đào tạo LLM, thúc đẩy các hãng sản xuất bán dẫn áp dụng công nghệ đóng gói 3D tiên tiến.',
    h: ['1. Nút thắt băng thông bộ nhớ trong huấn luyện AI', '2. Sự vươn lên của các dòng chip ASIC chuyên dụng', '3. Xu hướng điện toán xanh tiết kiệm năng lượng'],
    p: [
      'Tốc độ trao đổi dữ liệu giữa nhân xử lý và bộ nhớ quyết định phần lớn thời gian hoàn thành các phép toán ma trận trong mạng nơ-ron.',
      'Bên cạnh các dòng GPU đa năng, các vi xử lý chuyên dụng ASIC cho khâu suy luận (inference) đang chiếm lĩnh thị trường máy chủ biên.',
      'Bài toán tiêu thụ điện năng và tản nhiệt chất lỏng đang trở thành trọng tâm thiết kế của mọi trung tâm dữ liệu thế hệ mới.'
    ],
    tags: ['Hardware', 'Semiconductors', 'GPU', 'DataCenter'],
    featured: 0
  },
  {
    catId: 1,
    title: 'AI tạo sinh trong thiết kế giao diện: Từ bản vẽ phác thảo đến mã nguồn hoàn chỉnh trong vài giây',
    slug: 'ai-tao-sinh-thiet-ke-giao-dien-tu-phac-thao-den-code',
    excerpt: 'Các công cụ v0, Bolt và Figma AI đang định hình lại quy trình làm việc giữa lập trình viên frontend và chuyên viên thiết kế sản phẩm.',
    h: ['1. Chuyển đổi ngôn ngữ tự nhiên thành mã giao diện React', '2. Đồng bộ hóa Design System và Token thiết kế', '3. Tăng tốc chu kỳ xác thực ý tưởng sản phẩm'],
    p: [
      'Chỉ bằng một bản vẽ tay trên giấy hoặc lời mô tả tính năng, AI có thể sinh ra cấu trúc component hoàn chỉnh với Tailwind CSS và TypeScript.',
      'Hệ thống tự động liên kết các biến màu sắc, kiểu chữ và khoảng cách theo đúng quy chuẩn thương hiệu có sẵn của doanh nghiệp.',
      'Nhóm phát triển có thể tạo ra 5 phiên bản thử nghiệm giao diện khác nhau trong buổi sáng để tiến hành A/B testing tức thì.'
    ],
    tags: ['UIUX', 'GenerativeUI', 'Frontend', 'Design'],
    featured: 0
  },
  {
    catId: 1,
    title: 'Mô hình chuyển ngữ giọng nói tức thời (Speech-to-Speech) xóa nhòa rào cản ngôn ngữ quốc tế',
    slug: 'mo-hinh-chuyen-ngu-giong-noi-tuc-thoi-speech-to-speech',
    excerpt: 'Công nghệ dịch trực tiếp không qua văn bản trung gian giữ nguyên chất giọng, ngữ điệu và sắc thái tình cảm của người nói ban đầu.',
    h: ['1. Cơ chế dịch trực tiếp từ sóng âm sang sóng âm', '2. Giữ nguyên âm sắc đặc trưng của người bản ngữ', '3. Ứng dụng trong hội nghị truyền hình trực tuyến'],
    p: [
      'Bằng cách bỏ qua bước trung gian Speech-to-Text và Text-to-Speech, độ trễ được rút ngắn và tránh được các lỗi dịch thuật ngắt quãng.',
      'Người nghe ở đầu bên kia có cảm giác như chính bạn đang nói tiếng bản xứ của họ với giọng điệu thân quen của bạn.',
      'Các cuộc họp xuyên quốc gia trở nên tự nhiên hơn bao giờ hết, mở rộng cơ hội hợp tác kinh doanh không biên giới.'
    ],
    tags: ['SpeechToSpeech', 'VoiceAI', 'Translation', 'Communication'],
    featured: 0
  },
  {
    catId: 1,
    title: 'Tự động hóa lập trình với Cursor và AI Copilot: Kỹ sư phần mềm cần chuyển đổi kỹ năng ra sao?',
    slug: 'tu-dong-hoa-lap-trinh-cursor-copilot-chuyen-doi-ky-nang',
    excerpt: 'Khi AI đảm nhận 70% việc gõ mã nguồn thông thường, vai trò của lập trình viên chuyển dịch mạnh mẽ sang thiết kế kiến trúc và kiểm định chất lượng.',
    h: ['1. Kỹ năng giao tiếp và đặt đầu bài cho trợ lý mã nguồn', '2. Trọng tâm chuyển sang kiến trúc hệ thống phân tán', '3. Bảo đảm an ninh và phát hiện mã độc tiềm ẩn'],
    p: [
      'Khả năng phân rã bài toán lớn thành các module logic nhỏ và viết prompt súc tích trở thành tiêu chí đánh giá kỹ sư hàng đầu.',
      'Thay vì mất hàng giờ tra cứu cú pháp thư viện, kỹ sư tập trung vào tính chịu lỗi, khả năng mở rộng và hiệu năng của toàn hệ thống.',
      'Kỹ năng thẩm định mã nguồn (code review) trở nên tối quan trọng để phát hiện các lỗ hổng bảo mật mà AI có thể vô tình tạo ra.'
    ],
    tags: ['Coding', 'Career', 'SoftwareEngineering', 'Cursor'],
    featured: 0
  },
  {
    catId: 1,
    title: 'Hệ thống tìm kiếm thông tin tăng cường (RAG) bước sang thế hệ GraphRAG với đồ thị tri thức',
    slug: 'he-thong-rag-buoc-sang-the-he-graphrag-do-thi-tri-thuc',
    excerpt: 'Bổ sung cấu trúc đồ thị liên kết giúp AI hiểu sâu các mối quan hệ phức tạp trong kho tài liệu doanh nghiệp hàng triệu trang.',
    h: ['1. Khắc phục điểm yếu phân mảnh của vector search', '2. Trích xuất thực thể và liên kết ngữ nghĩa', '3. Hiệu quả phân tích trong lĩnh vực tài chính và pháp lý'],
    p: [
      'Phương pháp tìm kiếm vector truyền thống thường bỏ sót ngữ cảnh xuyên suốt khi thông tin phân tán ở nhiều tài liệu khác nhau.',
      'GraphRAG xây dựng mạng lưới các khái niệm, cho phép mô hình truy vết chuỗi nguyên nhân - kết quả một cách mạch lạc và có bằng chứng.',
      'Các ngân hàng và công ty luật đang ứng dụng phương pháp này để rà soát hợp đồng và kiểm toán rủi ro với độ tin cậy vượt trội.'
    ],
    tags: ['RAG', 'GraphRAG', 'KnowledgeGraph', 'EnterpriseAI'],
    featured: 0
  },
  {
    catId: 1,
    title: 'Thế giới sáng tạo video AI bùng nổ: Các mô hình World Simulators mô phỏng định luật vật lý',
    slug: 'sang-tao-video-ai-world-simulators-dinh-luat-vat-ly',
    excerpt: 'Các mô hình tạo video mới không chỉ ghép nối hình ảnh mà thực sự học cách ánh sáng khúc xạ, trọng lực và quán tính hoạt động trong không gian 3D.',
    h: ['1. Từ sinh ảnh tuần tự đến mô phỏng không gian vật lý', '2. Duy trì tính nhất quán của nhân vật qua các góc quay', '3. Tiềm năng ứng dụng trong sản xuất phim và trò chơi'],
    p: [
      'Khả năng hiểu tính chất vật lý của vật liệu giúp các cảnh quay nước chảy, vải bay và va chạm trở nên sống động đến kinh ngạc.',
      'Đạo diễn có thể di chuyển góc máy ảo xung quanh một chủ thể mà khuôn mặt và trang phục không bị biến dạng bất thường.',
      'Chi phí sản xuất kỹ xảo điện ảnh và thế giới ảo trong game có thể giảm đến 80%, mở ra cơ hội lớn cho các nhà làm phim độc lập.'
    ],
    tags: ['VideoAI', 'WorldModel', 'VFX', 'Gaming'],
    featured: 0
  },

  // 16 - 30: Xu hướng Công nghệ (tech-trends)
  {
    catId: 2,
    title: 'Cloudflare ra mắt kỷ nguyên Edge Database siêu tốc với độ trễ phân tán toàn cầu',
    slug: 'cloudflare-ra-mat-ky-nguyen-edge-database-sieu-toc-toan-cau',
    excerpt: 'Khảo sát hiệu năng thực tế của Cloudflare D1 và Workers khi vận hành CMS quy mô lớn: Tiết kiệm chi phí vượt trội và phản hồi dưới 15ms tại các điểm POP châu Á.',
    h: ['1. Kiến trúc serverless SQLite tại biên mạng', '2. Tự động đồng bộ hóa dữ liệu toàn cầu', '3. Trải nghiệm thực tế khi vận hành Oloka.net'],
    p: [
      'Bằng cách đặt cơ sở dữ liệu ngay tại các trung tâm dữ liệu biên gần người dùng nhất, độ trễ mạng giảm tới 90% so với máy chủ tập trung truyền thống.',
      'Cơ chế sao chép thông minh bảo đảm dữ liệu ghi luôn nhất quán trong khi các truy vấn đọc được xử lý tức thì tại chỗ.',
      'Oloka.net ghi nhận thời gian tải trang dưới 100ms trên toàn lãnh thổ Việt Nam nhờ sự kết hợp giữa D1, R2 và OpenNext.'
    ],
    tags: ['Cloudflare', 'D1', 'Serverless', 'EdgeComputing'],
    featured: 1
  },
  {
    catId: 2,
    title: 'Xu hướng chuyển dịch từ Server truyền thống sang Serverless Next.js trên Cloudflare Pages',
    slug: 'xu-huong-chuyen-dich-serverless-nextjs-cloudflare-pages',
    excerpt: 'OpenNext Cloudflare mang lại khả năng triển khai Next.js 15 đầy đủ tính năng App Router mà không phụ thuộc vào hạ tầng tốn kém của máy chủ cố định.',
    h: ['1. Bài toán chi phí duy trì máy chủ VPS truyền thống', '2. Sức mạnh của OpenNext và Cloudflare Workers', '3. Tự động mở rộng quy mô khi lưu lượng tăng đột biến'],
    p: [
      'Máy chủ cố định gây lãng phí tài nguyên khi lưu lượng thấp và dễ bị quá tải khi có bài viết lan truyền nhanh trên mạng xã hội.',
      'OpenNext đóng gói các route của Next.js thành mã thực thi tương thích với môi trường V8 isolates của Cloudflare Workers siêu nhẹ.',
      'Trang web có thể đáp ứng từ 10 đến 100.000 lượt truy cập đồng thời mà không cần can thiệp cấu hình thủ công.'
    ],
    tags: ['Nextjs', 'Cloudflare', 'WebDev', 'DevOps'],
    featured: 1
  },
  {
    catId: 2,
    title: 'Mạng viễn thông 6G thử nghiệm đầu tiên: Băng thông terabit và điện toán không gian (Spatial Computing)',
    slug: 'mang-vien-thong-6g-thu-nghiem-dau-tien-bang-thong-terabit',
    excerpt: 'Các phòng thí nghiệm viễn thông bắt đầu truyền phát sóng terahertz, hứa hẹn kết nối mượt mà thế giới thực và bản sao kỹ thuật số 3D.',
    h: ['1. Tần số sóng Terahertz và tốc độ truyền dẫn kỷ lục', '2. Hạ tầng cho kính thực tế ảo và xe tự hành', '3. Kế hoạch thương mại hóa dự kiến vào năm 2030'],
    p: [
      'Tốc độ truyền dữ liệu của mạng 6G dự kiến nhanh gấp 50 lần so với 5G, cho phép tải toàn bộ bộ phim chất lượng 8K chỉ trong chớp mắt.',
      'Độ trễ gần như bằng không là điều kiện tiên quyết để các phương tiện giao thông tự hành trao đổi thông tin tránh va chạm ở tốc độ cao.',
      'Các chuẩn giao tiếp quốc tế đang được định hình nhằm bảo đảm tính tương thích giữa các nhà mạng trên toàn thế giới.'
    ],
    tags: ['6G', 'Telecom', 'SpatialComputing', 'Connectivity'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Điện toán lượng tử đạt cột mốc sửa lỗi logic: Bước ngoặt ứng dụng vào mô phỏng vật liệu mới',
    slug: 'dien-toan-luong-tu-dat-cot-moc-sua-loi-logic-vat-lieu-moi',
    excerpt: 'Các qubit logic có khả năng tự sửa lỗi nhiễu môi trường, mở đường cho việc tính toán chính xác cấu trúc phân tử pin năng lượng mật độ cao.',
    h: ['1. Khái niệm qubit logic và sự giảm thiểu nhiễu', '2. Thiết kế pin thể rắn và chất siêu dẫn nhiệt độ phòng', '3. Cuộc đua công nghệ giữa các tập đoàn hàng đầu'],
    p: [
      'Việc ghép hàng nghìn qubit vật lý thành một qubit logic ổn định đã giải quyết được thách thức lớn nhất của ngành điện toán lượng tử suốt 2 thập kỷ.',
      'Các nhà khoa học có thể mô phỏng chính xác các phản ứng hóa học phức tạp mà siêu máy tính cổ điển phải mất hàng triệu năm để giải.',
      'Ngành năng lượng sạch và y sinh dự kiến sẽ là những lĩnh vực đầu tiên thu được lợi ích kinh tế to lớn từ bước đột phá này.'
    ],
    tags: ['Quantum', 'Physics', 'CleanTech', 'Innovation'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Kiến trúc máy tính quang học (Optical Computing): Dùng ánh sáng thay electron để xử lý mạng nơ-ron',
    slug: 'kien-truc-may-tinh-quang-hoc-dung-anh-sang-thay-electron',
    excerpt: 'Sử dụng photon ánh sáng để thực hiện các phép nhân ma trận cho phép tăng tốc độ xử lý AI lên hàng nghìn lần với mức tiêu thụ điện gần bằng không.',
    h: ['1. Nguyên lý giao thoa ánh sáng trong tính toán ma trận', '2. Giải quyết khủng hoảng năng lượng của các trung tâm dữ liệu', '3. Thách thức tích hợp vào chip bán dẫn thương mại'],
    p: [
      'Ánh sáng di chuyển với vận tốc tối đa và không sinh nhiệt do điện trở, giúp vượt qua rào cản vật lý mà chip silicon truyền thống đang đối mặt.',
      'Nếu được ứng dụng rộng rãi, chi phí điện năng của các cụm máy chủ huấn luyện AI toàn cầu có thể giảm tới 95%.',
      'Các nhà sản xuất đang nỗ lực thu nhỏ các mạch quang học để có thể gắn trực tiếp vào bo mạch chủ tiêu chuẩn hiện hành.'
    ],
    tags: ['Photonics', 'OpticalComputing', 'GreenTech', 'Hardware'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Công nghệ màn hình MicroLED thế hệ mới: Độ sáng 5000 nits và tuổi thọ vô song',
    slug: 'cong-nghe-man-hinh-microled-the-he-moi-5000-nits',
    excerpt: 'Mỗi điểm ảnh là một bóng đèn LED vô cơ siêu nhỏ mang lại màu đen sâu tuyệt đối, màu sắc rực rỡ và loại bỏ hoàn toàn nguy cơ lưu ảnh (burn-in).',
    h: ['1. Ưu thế vượt trội của vật liệu vô cơ so với OLED', '2. Đột phá trong quy trình gắp chuyển hàng triệu vi chip LED', '3. Xu hướng áp dụng trên đồng hồ thông minh và kính AR'],
    p: [
      'Vật liệu vô cơ không bị suy thoái theo thời gian, cho phép màn hình duy trì độ sáng cực đại ngay cả dưới ánh nắng chói chang mà không bị ố vàng.',
      'Quy trình sản xuất tự động hóa độ chính xác nano đang giúp hạ giá thành sản xuất để tiếp cận người tiêu dùng phổ thông.',
      'Kính thực tế tăng cường (AR) là thiết bị hưởng lợi nhiều nhất nhờ kích thước tấm nền siêu nhỏ nhưng hiển thị cực kỳ sắc nét.'
    ],
    tags: ['Display', 'MicroLED', 'Hardware', 'ConsumerTech'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Hệ điều hành biên WebAssembly (WASM): Tương lai của phần mềm chạy đa nền tảng không cần Docker',
    slug: 'he-dieu-hanh-bien-webassembly-wasm-tuong-lai-da-nen-tang',
    excerpt: 'Khởi động trong vài micro giây với bộ nhớ chỉ vài megabyte, WebAssembly đang trở thành tiêu chuẩn vàng cho các dịch vụ microservices tại biên.',
    h: ['1. Tốc độ khởi động tức thì so với container Docker', '2. Môi trường sandbox an toàn tuyệt đối theo thiết kế', '3. Hỗ trợ đa ngôn ngữ từ Rust, C++ đến Go và Python'],
    p: [
      'Thay vì phải tải cả hệ điều hành Linux thu nhỏ như container truyền thống, module WASM chỉ chứa mã bytecode tối ưu và khởi chạy tức thì.',
      'Cơ chế cô lập bộ nhớ nghiêm ngặt ngăn chặn mã độc can thiệp vào hệ thống máy chủ, mang lại mức độ bảo mật cao nhất.',
      'Các nền tảng đám mây biên đang tích cực hỗ trợ WASM để tối ưu mật độ vận hành ứng dụng trên mỗi máy chủ vật lý.'
    ],
    tags: ['WASM', 'WebAssembly', 'Cloud', 'Architecture'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Xe điện tự hành cấp độ 4 bắt đầu lăn bánh thương mại tại các đô thị thông minh châu Á',
    slug: 'xe-dien-tu-hanh-cap-do-4-thuong-mai-do-thi-thong-minh',
    excerpt: 'Hệ thống cảm biến LiDAR trạng thái rắn kết hợp mạng nơ-ron nhận diện hành vi cho phép phương tiện vận hành hoàn toàn không cần người lái giám sát.',
    h: ['1. Cột mốc tự hành cấp độ 4 không cần vô lăng', '2. Tích hợp bản đồ độ nét cực cao (HD Maps) thời gian thực', '3. Tác động tới quy hoạch đô thị và logistics xanh'],
    p: [
      'Xe có thể tự xử lý các tình huống giao thông phức tạp như người đi bộ băng qua đường bất ngờ hay thời tiết mưa gió tầm tã.',
      'Hệ sinh thái giao thông kết nối V2X giúp xe liên tục giao tiếp với đèn tín hiệu và các phương tiện lân cận để tối ưu luồng di chuyển.',
      'Chi phí vận tải hành khách và giao hàng chặng cuối dự kiến giảm 60%, góp phần giảm thiểu ùn tắc và phát thải carbon đô thị.'
    ],
    tags: ['AutonomousVehicles', 'EV', 'SmartCity', 'Robotics'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Pin thể rắn thương mại hóa: Tăng gấp đôi quãng đường xe điện và sạc đầy trong 10 phút',
    slug: 'pin-the-ran-thuong-mai-hoa-tang-gap-doi-quang-duong-sac-10-phut',
    excerpt: 'Thay thế chất điện phân lỏng dễ cháy bằng gốm sứ rắn mang lại mật độ năng lượng vượt 500 Wh/kg và an toàn tuyệt đối chống cháy nổ.',
    h: ['1. Giải pháp dứt điểm nỗi lo cháy nổ của xe điện', '2. Mật độ năng lượng cao giúp giảm trọng lượng xe', '3. Lộ trình trang bị trên các dòng xe cao cấp từ năm 2027'],
    p: [
      'Chất điện phân thể rắn loại bỏ hoàn toàn hiện tượng tạo nhánh tinh thể (dendrite) gây đoản mạch, vốn là nguyên nhân chính gây cháy nổ pin lithium-ion.',
      'Quãng đường di chuyển của xe điện có thể vượt mốc 1.000 km chỉ sau một lần sạc duy nhất, tương đương xe chạy xăng truyền thống.',
      'Các dây chuyền sản xuất thử nghiệm quy mô lớn đang được xây dựng gấp rút tại Nhật Bản, Hàn Quốc và châu Âu.'
    ],
    tags: ['Battery', 'SolidState', 'EV', 'CleanEnergy'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Thành phố thông minh sử dụng bản sao số (Digital Twin) để dự báo thiên tai và tối ưu năng lượng',
    slug: 'thanh-pho-thong-minh-ban-sao-so-digital-twin-du-bao-thien-tai',
    excerpt: 'Mô hình 3D toàn diện của thành phố được đồng bộ hóa với hàng triệu cảm biến IoT, hỗ trợ điều tiết ngập lụt và lưới điện thông minh theo thời gian thực.',
    h: ['1. Khái niệm Digital Twin quy mô đô thị', '2. Mô phỏng thủy lực dự báo điểm ngập chính xác', '3. Tiết kiệm 25% năng lượng chiếu sáng và điều hòa công cộng'],
    p: [
      'Các nhà quy hoạch có thể thử nghiệm các phương án phân luồng giao thông hoặc ứng phó bão lũ trên máy tính trước khi triển khai trên thực tế.',
      'Dữ liệu từ trạm khí tượng và camera giám sát được AI xử lý liên tục để phát hiện sớm các nguy cơ sạt lở hoặc sự cố lưới điện.',
      'Chuyển đổi số đô thị không chỉ nâng cao chất lượng cuộc sống cư dân mà còn bảo vệ tính mạng người dân trước biến đổi khí hậu.'
    ],
    tags: ['DigitalTwin', 'SmartCity', 'IoT', 'Sustainability'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Kiến trúc dữ liệu Lakehouse kết hợp AI: Hợp nhất Data Lake và Data Warehouse trên nền tảng đám mây',
    slug: 'kien-truc-du-lieu-lakehouse-ket-hop-ai-hop-nhat-cloud',
    excerpt: 'Định dạng bảng mở Apache Iceberg và Delta Lake giúp doanh nghiệp truy vấn dữ liệu phi cấu trúc nhanh gấp 10 lần với chi phí lưu trữ tối thiểu.',
    h: ['1. Sự chuyển dịch từ kho dữ liệu phân mảnh sang Lakehouse', '2. Tối ưu hóa truy vấn bằng công cụ tính toán phân tán', '3. Cung cấp dữ liệu sạch cho các mô hình AI doanh nghiệp'],
    p: [
      'Không còn phải sao chép dữ liệu qua lại giữa nhiều hệ thống, các nhà phân tích có thể chạy câu lệnh SQL trực tiếp trên các tệp lưu trữ đám mây giá rẻ.',
      'Các định dạng bảng mở hỗ trợ tính năng du hành thời gian (time-travel) giúp khôi phục dữ liệu về bất kỳ thời điểm nào trong quá khứ.',
      'Đây là nền tảng hạ tầng then chốt để xây dựng các ứng dụng AI tạo sinh có khả năng tra cứu dữ liệu nội bộ chính xác.'
    ],
    tags: ['BigData', 'DataLake', 'Iceberg', 'DataEngineering'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Hạ tầng mạng không dây Li-Fi: Truyền dữ liệu tốc độ cao bằng chùm ánh sáng đèn LED',
    slug: 'ha-tang-mang-khong-day-li-fi-truyen-du-lieu-bang-anh-sang',
    excerpt: 'Không bị nhiễu sóng vô tuyến và có tính bảo mật vật lý tuyệt đối, Li-Fi đang được thử nghiệm trong các phòng mổ bệnh viện và khoang máy bay.',
    h: ['1. Tốc độ truyền tải vượt trội của sóng ánh sáng', '2. Không rò rỉ tín hiệu qua tường phòng', '3. Tích hợp liền mạch vào hệ thống chiếu sáng thông minh'],
    p: [
      'Các bóng đèn chiếu sáng thông thường có thể kiêm luôn vai trò bộ phát internet tốc độ gigabit mà không gây bất kỳ tác hại nào cho mắt người.',
      'Tín hiệu ánh sáng không thể xuyên qua tường gạch, đồng nghĩa với việc kẻ xấu bên ngoài không thể bắt lén sóng mạng nội bộ.',
      'Các môi trường nhạy cảm với sóng điện từ như trung tâm nghiên cứu y khoa hay nhà máy hóa chất xem đây là giải pháp kết nối lý tưởng.'
    ],
    tags: ['LiFi', 'Networking', 'CyberSecurity', 'Wireless'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Vệ tinh internet quỹ đạo thấp (LEO): Phủ sóng băng thông rộng tới mọi vùng sâu vùng xa',
    slug: 've-tinh-internet-quy-dao-thap-leo-phu-song-bang-thong-rong',
    excerpt: 'Hàng nghìn vệ tinh bay ở độ cao 500 km mang lại kết nối internet độ trễ thấp dưới 30ms cho tàu biển, máy bay và các trạm nghiên cứu hải đảo.',
    h: ['1. Lợi thế độ trễ thấp so với vệ tinh địa tĩnh truyền thống', '2. Kết nối bằng liên kết laser giữa các vệ tinh trong không gian', '3. Thúc đẩy thu hẹp khoảng cách số toàn cầu'],
    p: [
      'Nhờ khoảng cách gần Trái Đất, tín hiệu không bị trễ cả giây như các thế hệ vệ tinh cũ, hỗ trợ tốt các cuộc gọi video và làm việc từ xa.',
      'Tia laser kết nối trực tiếp giữa các vệ tinh giúp dữ liệu lưu chuyển xuyên đại dương với tốc độ nhanh hơn cả cáp quang dưới biển.',
      'Các trường học vùng cao và ngư dân đánh bắt xa bờ nay có thể tiếp cận nguồn tri thức và thông tin cứu nạn kịp thời.'
    ],
    tags: ['Satellite', 'LEO', 'SpaceTech', 'Internet'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Xu hướng kiến trúc máy tính không máy chủ (Serverless Architecture) năm 2026',
    slug: 'xu-huong-kien-truc-may-tinh-khong-may-chu-serverless-2026',
    excerpt: 'Các nhà phát triển chỉ tập trung vào logic nghiệp vụ và trả phí chính xác theo số mili-giây CPU thực tế tiêu thụ thay vì trả phí máy chủ nhàn rỗi.',
    h: ['1. Mô hình thanh toán theo mức tiêu thụ thực tế', '2. Giải quyết dứt điểm vấn đề khởi động nguội (Cold Start)', '3. Tích hợp cơ sở dữ liệu serverless D1 và Neon'],
    p: [
      'Môi trường chạy tức thì trên nền tảng V8 isolate giúp thời gian khởi động hàm serverless giảm xuống dưới 5ms, triệt tiêu hiện tượng chờ đợi.',
      'Doanh nghiệp có thể tiết kiệm tới 70% ngân sách hạ tầng điện toán đám mây hàng tháng mà vẫn bảo đảm độ tin cậy tuyệt đối.',
      'Các framework hiện đại như Next.js, Astro và Remix đều tối ưu hóa sâu cho mô hình triển khai phân tán này.'
    ],
    tags: ['Serverless', 'CloudArchitecture', 'FinOps', 'DevOps'],
    featured: 0
  },
  {
    catId: 2,
    title: 'Điện toán không gian (Spatial Computing) định hình lại phương thức làm việc từ xa',
    slug: 'dien-toan-khong-gian-spatial-computing-dinh-hinh-lam-viec-tu-xa',
    excerpt: 'Không gian làm việc vô hạn với các cửa sổ ứng dụng 3D lơ lửng trước mắt giúp nâng cao khả năng tập trung và hợp tác đa người dùng trực quan.',
    h: ['1. Thoát khỏi sự bó hẹp của màn hình máy tính 2D truyền thống', '2. Tương tác tự nhiên bằng cử chỉ mắt và ngón tay', '3. Họp hành từ xa với hiện diện ảo chân thực (Spatial Audio)'],
    p: [
      'Kỹ sư có thể mở 5 màn hình hiển thị mã nguồn kích thước 100 inch xung quanh bàn làm việc của mình ở bất kỳ đâu.',
      'Không cần chuột hay bàn phím vật lý, việc điều hướng được thực hiện chuẩn xác thông qua chuyển động của mắt và cái chạm nhẹ đầu ngón tay.',
      'Âm thanh không gian tái hiện chính xác vị trí của từng đồng nghiệp trong phòng họp ảo, mang lại cảm giác gắn kết như ngồi cùng một văn phòng.'
    ],
    tags: ['SpatialComputing', 'VisionPro', 'FutureOfWork', 'ARVR'],
    featured: 0
  },

  // 31 - 44: Công cụ AI & Tiện ích (ai-tools)
  {
    catId: 3,
    title: 'Đánh giá chi tiết OmniVoice: Giải pháp TTS tiếng Việt chuẩn phòng thu trên nền tảng Edge',
    slug: 'danh-gia-chi-tiet-omnivoice-giai-phap-tts-tieng-viet-edge',
    excerpt: 'Khám phá tốc độ phản hồi dưới 100ms, khả năng tùy biến cao độ, nhịp điệu và hỗ trợ đa phương ngữ của OmniVoice Gateway tại voice.oloka.net.',
    h: ['1. Giao diện trực quan và khả năng tùy chỉnh linh hoạt', '2. Chất lượng âm thanh đạt chuẩn phát thanh truyền hình', '3. Tích hợp API đơn giản cho lập trình viên'],
    p: [
      'OmniVoice cho phép người dùng nhập văn bản dài hàng nghìn chữ và xuất ra tệp âm thanh chất lượng cao chỉ sau vài cú nhấp chuột.',
      'Các thông số cao độ (pitch) và tốc độ đọc (rate) được điều chỉnh mượt mà theo thời gian thực, phục vụ tốt nhu cầu làm video ngắn.',
      'Được lưu trữ trực tiếp trên Cloudflare Pages và Workers, dịch vụ hoạt động ổn định 24/7 với chi phí vận hành tối ưu.'
    ],
    tags: ['OmniVoice', 'TTS', 'AudioTool', 'Oloka'],
    featured: 1
  },
  {
    catId: 3,
    title: 'Khám phá Oloka QR Code Studio: Tạo mã QR thương hiệu 2 tone màu chuyên nghiệp',
    slug: 'kham-pha-oloka-qr-code-studio-tao-ma-qr-thuong-hieu',
    excerpt: 'Không còn những mã QR đen trắng thô kệch, công cụ hỗ trợ phối màu nhận diện Sky Cyan & Coral Tangerine cùng logo tâm điểm sắc nét.',
    h: ['1. Tầm quan trọng của mã QR mang dấu ấn thương hiệu', '2. Bộ công cụ tạo mã trực tiếp trên trình duyệt', '3. Tối ưu độ tương phản bảo đảm khả năng quét 100%'],
    p: [
      'Mã QR có thiết kế màu sắc đồng bộ với bao bì giúp nâng cao độ tin cậy và kích thích khách hàng quét mã nhiều hơn.',
      'Công cụ hỗ trợ tải về định dạng vector SVG chất lượng cao, sẵn sàng cho các ấn phẩm in ấn khổ lớn từ banner đến danh thiếp.',
      'Thuật toán tự động tính toán mức độ sửa lỗi (Error Correction Level) để bảo đảm logo chèn vào không làm hỏng dữ liệu quét.'
    ],
    tags: ['QRCode', 'DesignTool', 'Branding', 'Oloka'],
    featured: 1
  },
  {
    catId: 3,
    title: 'Top 7 công cụ AI tạo hình ảnh thương mại tốt nhất năm 2026 cho nhà sáng tạo nội dung',
    slug: 'top-7-cong-cu-ai-tao-hinh-anh-thuong-mai-tot-nhat-2026',
    excerpt: 'So sánh chi tiết về khả năng hiển thị chữ viết chính xác, độ phân giải sắc nét và giấy phép sử dụng thương mại của Midjourney, Flux và DALL-E.',
    h: ['1. Tiêu chí lựa chọn công cụ đồ họa AI cho doanh nghiệp', '2. Khả năng kết xuất chữ viết và typography chuẩn xác', '3. Vấn đề bản quyền và bảo vệ tài sản trí tuệ'],
    p: [
      'Khả năng render văn bản rõ ràng trên nhãn sản phẩm và biển hiệu là bước tiến quan trọng nhất của các mô hình đồ họa thế hệ mới.',
      'Các nhà sáng tạo có thể kiểm soát chính xác góc máy, ánh sáng và phong cách hội họa thông qua các tham số điều khiển chuyên sâu.',
      'Doanh nghiệp cần ưu tiên các dịch vụ cam kết bồi hoàn bản quyền và bảo mật dữ liệu prompt đầu vào của khách hàng.'
    ],
    tags: ['ImageAI', 'Midjourney', 'Flux', 'Creative'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Trải nghiệm Google AI Studio: Môi trường thử nghiệm prompt và tinh chỉnh mô hình Gemini',
    slug: 'trai-nghiem-google-ai-studio-thu-nghiem-prompt-gemini',
    excerpt: 'Giao diện thân thiện dành cho nhà phát triển để kiểm thử System Instructions, gắn nhãn dữ liệu và xuất mã nguồn đa ngôn ngữ tích hợp.',
    h: ['1. Tận dụng cửa sổ ngữ cảnh khổng lồ để phân tích tài liệu', '2. Tinh chỉnh cấu hình nhiệt độ (Temperature) và Top-P', '3. Xuất mã nguồn tích hợp vào Node.js và Python'],
    p: [
      'Người dùng có thể tải lên toàn bộ cuốn sách hoặc video dài 1 tiếng để đặt câu hỏi phân tích mà không gặp bất kỳ độ trễ nào.',
      'Giao diện trực quan hỗ trợ cấu hình chức năng Function Calling giúp mô hình kết nối với cơ sở dữ liệu và API bên ngoài.',
      'Google cung cấp gói hạn ngạch miễn phí hào phóng, tạo điều kiện thuận lợi cho các bạn trẻ bắt đầu học hỏi và xây dựng dự án AI.'
    ],
    tags: ['GoogleAI', 'Gemini', 'PromptEngineering', 'DevTools'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Hugging Face Spaces: Bệ phóng miễn phí cho các ứng dụng demo học máy và mô hình AI',
    slug: 'hugging-face-spaces-be-phong-mien-phi-ung-dung-demo-ai',
    excerpt: 'Triển khai giao diện Gradio và Streamlit trực tiếp từ kho lưu trữ Git chỉ trong vài phút với phần cứng hỗ trợ GPU linh hoạt.',
    h: ['1. Nền tảng chia sẻ nghiên cứu và sản phẩm AI toàn cầu', '2. Tích hợp liền mạch với hệ sinh thái thư viện Transformers', '3. Cơ hội tiếp cận hàng triệu người dùng tiềm năng'],
    p: [
      'Các kỹ sư có thể biến mô hình nghiên cứu phức tạp thành một ứng dụng web có thể tương tác được cho bất kỳ ai trải nghiệm.',
      'Hệ sinh thái phong phú với hàng nghìn mẫu ứng dụng có sẵn giúp người mới bắt đầu nhanh chóng nhân bản (fork) và tùy biến.',
      'Đây là nơi ươm mầm của rất nhiều dự án khởi nghiệp công nghệ đột phá trước khi nhận được vốn đầu tư mạo hiểm.'
    ],
    tags: ['HuggingFace', 'Gradio', 'OpenSource', 'DevPlatform'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Perplexity AI vs Google Search: Trải nghiệm tìm kiếm thông tin có thực sự thay đổi?',
    slug: 'perplexity-ai-vs-google-search-trai-nghiem-tim-kiem-thay-doi',
    excerpt: 'Phân tích ưu nhược điểm giữa việc đọc câu trả lời tổng hợp có trích dẫn nguồn và việc duyệt qua danh sách liên kết truyền thống.',
    h: ['1. Khác biệt cốt lõi trong trải nghiệm người dùng', '2. Khả năng lọc bỏ các trang web chứa mã quảng cáo rác', '3. Độ tin cậy và kiểm chứng chéo nguồn tin học thuật'],
    p: [
      'Thay vì phải mở hàng chục tab trình duyệt và đọc lướt các bài viết SEO dài dòng, người dùng nhận được câu trả lời cô đọng trong 5 giây.',
      'Mỗi khẳng định đều đi kèm chỉ số trích dẫn trực tiếp tới bài báo gốc, giúp người đọc dễ dàng xác minh tính xác thực.',
      'Google đang tích cực bổ sung tính năng AI Overviews để bảo vệ vị thế công cụ tìm kiếm số một toàn cầu của mình.'
    ],
    tags: ['Search', 'Perplexity', 'Google', 'Productivity'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Bolt.new và v0: Cuộc cách mạng xây dựng ứng dụng Fullstack ngay trong trình duyệt',
    slug: 'bolt-new-va-v0-cach-mang-xay-dung-app-fullstack-trinh-duyet',
    excerpt: 'Chỉ với một lời nhắc, AI tự động thiết lập dự án Node.js, cài đặt thư viện npm, viết code frontend, backend và chạy thử nghiệm trực tiếp.',
    h: ['1. Công nghệ WebContainers chạy máy chủ ảo trong trình duyệt', '2. Khả năng sửa lỗi tương tác theo thời gian thực', '3. Xuất mã nguồn sạch sẵn sàng đẩy lên GitHub'],
    p: [
      'Không cần cài đặt Node.js hay cấu hình môi trường máy tính phức tạp, bất kỳ ai cũng có thể tạo ra một ứng dụng hoàn chỉnh trong 10 phút.',
      'Khi xảy ra lỗi biên dịch, AI tự động đọc log lỗi từ terminal ảo và đưa ra bản vá sửa đổi ngay lập tức.',
      'Công cụ này đang thay đổi hoàn toàn cách các đội ngũ phát triển sản phẩm làm nguyên mẫu (prototyping).'
    ],
    tags: ['WebContainers', 'BoltNew', 'V0', 'FullStack'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Top 5 công cụ tóm tắt tài liệu PDF và nghiên cứu khoa học chuyên sâu bằng AI',
    slug: 'top-5-cong-cu-tom-tat-tai-lieu-pdf-nghien-cuu-khoa-hoc',
    excerpt: 'Giúp sinh viên và nhà nghiên cứu đọc nhanh hàng trăm trang tài liệu tiếng Anh, trích xuất biểu đồ số liệu và đối chiếu luận điểm khoa học.',
    h: ['1. Xử lý tài liệu học thuật phức tạp chứa công thức toán', '2. Tính năng hỏi đáp đối thoại với tài liệu chuyên ngành', '3. Bảo mật dữ liệu đề tài nghiên cứu chưa công bố'],
    p: [
      'Các công cụ chuyên dụng có khả năng nhận diện cấu trúc bài báo khoa học, bảng biểu và đồ thị mà không bị sai lệch số liệu.',
      'Người dùng có thể yêu cầu giải thích một thuật ngữ khó bằng ngôn ngữ dễ hiểu hoặc so sánh phương pháp nghiên cứu với các bài báo khác.',
      'Chức năng xuất trích dẫn chuẩn APA/IEEE giúp tiết kiệm hàng chục giờ hoàn thiện danh mục tài liệu tham khảo cho luận văn.'
    ],
    tags: ['Research', 'PDFTools', 'AcademicAI', 'Productivity'],
    featured: 0
  },
  {
    catId: 3,
    title: 'ElevenLabs ra mắt tính năng lồng tiếng tự động (AI Dubbing) giữ nguyên cảm xúc gốc',
    slug: 'elevenlabs-ra-mat-tinh-nang-long-tieng-tu-dong-ai-dubbing',
    excerpt: 'Dịch thuật và lồng tiếng video từ tiếng Việt sang 29 ngôn ngữ khác nhau mà khẩu hình miệng và âm sắc của diễn viên vẫn hoàn toàn ăn khớp.',
    h: ['1. Công nghệ tách giọng nói và âm thanh nền (BGM)', '2. Tái tạo chất giọng bản quyền sang ngôn ngữ đích', '3. Mở rộng cơ hội tiếp cận khán giả toàn cầu cho Youtuber'],
    p: [
      'Hệ thống tự động nhận diện giọng nói của từng nhân vật trong video và dịch sang ngôn ngữ mới mà không làm mất nhạc nền hay tiếng động hiện trường.',
      'Thuật toán đồng bộ khẩu hình (lip-sync) điều chỉnh chuyển động môi của người nói trong video sao cho khớp với từ ngữ mới phát ra.',
      'Nhà sáng tạo nội dung có thể dễ dàng phân phối video của mình tới khán giả quốc tế mà không cần thuê đội ngũ lồng tiếng tốn kém.'
    ],
    tags: ['VoiceAI', 'ElevenLabs', 'VideoDubbing', 'ContentCreation'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Notion AI vs ChatGPT: Đâu là trợ lý văn phòng tối ưu cho quản lý công việc và ghi chú?',
    slug: 'notion-ai-vs-chatgpt-tro-ly-van-phong-toi-uu-quan-ly-cong-viec',
    excerpt: 'So sánh trải nghiệm viết lách tích hợp trực tiếp vào không gian làm việc số và việc sử dụng cửa sổ hội thoại chatbot độc lập.',
    h: ['1. Lợi thế ngữ cảnh của kho dữ liệu ghi chú có sẵn', '2. Khả năng tóm tắt cuộc họp và tạo danh sách nhiệm vụ tự động', '3. Chi phí đăng ký và giá trị mang lại cho doanh nghiệp nhỏ'],
    p: [
      'Notion AI có lợi thế lớn khi có thể tra cứu toàn bộ cơ sở tri thức công ty để trả lời các câu hỏi về quy trình nội bộ.',
      'Chỉ với một phím cách, người dùng có thể yêu cầu AI sửa lỗi chính tả, tóm tắt đoạn văn hoặc đổi tông giọng bài viết sang trang trọng hơn.',
      'ChatGPT lại vượt trội ở khả năng lập luận tự do, viết code và sáng tạo các ý tưởng hoàn toàn mới ngoài khuôn khổ.'
    ],
    tags: ['NotionAI', 'ChatGPT', 'OfficeTools', 'Productivity'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Canva tích hợp Magic Studio: Bộ công cụ thiết kế đồ họa tự động hóa cho người không chuyên',
    slug: 'canva-tich-hop-magic-studio-thiet-ke-do-hoa-tu-dong-hoa',
    excerpt: 'Biến ý tưởng thành bài thuyết trình, ấn phẩm mạng xã hội và video quảng cáo chỉ với vài thao tác kéo thả và mô tả câu lệnh.',
    h: ['1. Tự động chuyển đổi kích thước cho đa kênh truyền thông', '2. Xóa vật thể và mở rộng phông nền bằng AI Magic Expand', '3. Phù hợp cho các chủ shop kinh doanh online'],
    p: [
      'Người bán hàng có thể chụp ảnh sản phẩm trên nền bàn đơn giản và để AI biến thành ảnh chụp studio chuyên nghiệp với ánh sáng lung linh.',
      'Tính năng chuyển ngữ tự động giúp dịch toàn bộ chữ trên banner sang ngôn ngữ khác mà vẫn giữ nguyên font chữ và bố cục hài hòa.',
      'Canva tiếp tục giữ vững vị thế là công cụ thiết kế dễ dùng nhất cho các cá nhân kinh doanh và tiếp thị số.'
    ],
    tags: ['Canva', 'MagicStudio', 'DesignAI', 'Marketing'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Khám phá Whisper: Mô hình nhận dạng giọng nói thành văn bản mã nguồn mở chuẩn xác nhất',
    slug: 'kham-pha-whisper-mo-hinh-nhan-dang-giong-noi-chuan-xac',
    excerpt: 'Hỗ trợ nhận diện tiếng Việt cực tốt ngay cả trong môi trường nhiều tiếng ồn xung quanh, thích hợp tạo phụ đề tự động cho video.',
    h: ['1. Huấn luyện trên hàng trăm nghìn giờ âm thanh đa dạng', '2. Khả năng nhận diện chính xác các dấu thanh tiếng Việt', '3. Hướng dẫn chạy offline trên máy tính cá nhân miễn phí'],
    p: [
      'Whisper có khả năng xử lý mượt mà các từ ngữ chuyên ngành, tiếng địa phương và cả những đoạn nói chuyện lẫn lộn giữa tiếng Việt và tiếng Anh.',
      'Người dùng có thể chạy mô hình trực tiếp trên máy tính mà không lo bị lộ dữ liệu cuộc họp hay thông tin ghi âm nhạy cảm.',
      'Cộng đồng đã phát triển các phiên bản tối ưu nhẹ nhàng có thể chạy mượt trên cả chip máy tính thông thường.'
    ],
    tags: ['Whisper', 'STT', 'SpeechToText', 'OpenSource'],
    featured: 0
  },
  {
    catId: 3,
    title: 'Dịch thuật chuyên nghiệp với DeepL: Vì sao các dịch giả vẫn chuộng hơn Google Dịch?',
    slug: 'dich-thuat-chuyen-nghiep-voi-deepl-vi-sao-chuong-hon-google',
    excerpt: 'Khả năng nắm bắt ngữ cảnh tinh tế, hành văn mượt mà tự nhiên như người bản xứ và hỗ trợ từ điển thuật ngữ chuyên ngành doanh nghiệp.',
    h: ['1. Sự mượt mà và tự nhiên trong cấu trúc câu dịch', '2. Tính năng Glossary tùy chỉnh cách dịch các thuật ngữ riêng', '3. Bảo mật tài liệu kinh doanh không dùng để huấn luyện AI'],
    p: [
      'DeepL hiểu được các thành ngữ và lối chơi chữ phức tạp, tránh được các bản dịch thô cứng từng từ một (word-by-word) thường thấy.',
      'Doanh nghiệp có thể thiết lập quy chuẩn dịch tên thương hiệu và thuật ngữ kỹ thuật đồng nhất trong toàn bộ tài liệu dự án.',
      'Các công ty đa quốc gia đánh giá cao cam kết bảo mật không lưu trữ dữ liệu bản dịch trên máy chủ của DeepL.'
    ],
    tags: ['DeepL', 'Translation', 'LanguageAI', 'Productivity'],
    featured: 0
  },
  {
    catId: 3,
    title: 'CapCut AI: Bộ công cụ dựng video ngắn vạn người mê trên nền tảng TikTok và Reels',
    slug: 'capcut-ai-bo-cong-cu-dung-video-ngan-tiktok-reels',
    excerpt: 'Tự động tạo phụ đề chạy chữ sinh động, xóa phông xanh thông minh và tạo giọng đọc lồng tiếng bắt tai chỉ bằng một cú chạm.',
    h: ['1. Tự động bắt nhịp điệu nhạc (Beat Sync) chuẩn xác', '2. Hiệu ứng chuyển cảnh và chữ động thịnh hành', '3. Giúp nhà sáng tạo sản xuất hàng chục video mỗi tuần'],
    p: [
      'Thuật toán thông minh tự động cắt bỏ những khoảng lặng ngập ngừng trong lời nói, giúp video có nhịp điệu nhanh và giữ chân người xem lâu hơn.',
      'Kho hiệu ứng và âm thanh bắt trend được cập nhật hàng ngày giúp video dễ dàng tiếp cận xu hướng thịnh hành trên các nền tảng mạng xã hội.',
      'Giao diện trực quan trên cả điện thoại và máy tính giúp người dùng dễ dàng làm quen ngay từ lần đầu tiên sử dụng.'
    ],
    tags: ['CapCut', 'ShortVideo', 'TikTok', 'VideoEditing'],
    featured: 0
  },

  // 45 - 58: Thủ thuật & Hướng dẫn (tutorials)
  {
    catId: 4,
    title: 'Cách tối ưu hóa giọng đọc AI cho Podcast và Video ngắn với TTS Studio',
    slug: 'cach-toi-uu-hoa-giong-doc-ai-podcast-tts-studio',
    excerpt: 'Hướng dẫn từng bước thiết lập cao độ (pitch), tốc độ đọc và xử lý hậu kỳ âm thanh để biến giọng đọc máy thành giọng người truyền cảm đầy lôi cuốn.',
    h: ['1. Kỹ thuật ngắt câu và thêm dấu chấm phẩy hợp lý', '2. Tinh chỉnh cao độ và nhịp điệu theo từng thể loại nội dung', '3. Thêm nhạc nền và xử lý lọc nhiễu âm thanh'],
    p: [
      'Việc đặt dấu câu đúng vị trí giúp mô hình nhận biết được khoảng nghỉ thở tự nhiên, tránh hiện tượng đọc liên tục gây mệt mỏi cho thính giả.',
      'Đối với bản tin thời sự, tốc độ đọc 1.0x và cao độ chuẩn là phù hợp; trong khi truyện đọc cần nhịp chậm 0.9x để tăng tính biểu cảm.',
      'Chèn một bản nhạc lofi nhẹ nhàng ở mức âm lượng -20dB phía dưới giọng đọc sẽ che đi các tạp âm nhỏ và tăng tính chuyên nghiệp đáng kể.'
    ],
    tags: ['Tutorial', 'TTS', 'AudioEditing', 'Podcast'],
    featured: 1
  },
  {
    catId: 4,
    title: 'Hướng dẫn triển khai Payload CMS 3.0 trên Cloudflare D1 và Workers từ A đến Z',
    slug: 'huong-dan-trien-khai-payload-cms-cloudflare-d1-workers',
    excerpt: 'Cẩm nang thực chiến giúp bạn thiết lập một hệ thống quản trị nội dung hoàn toàn miễn phí, tốc độ phản hồi cực nhanh và không lo bảo trì máy chủ.',
    h: ['1. Cấu hình file wrangler.jsonc và liên kết D1 Database', '2. Khắc phục lỗi giới hạn CPU khi băm mật khẩu với patch crypto', '3. Tích hợp kho lưu trữ tệp Cloudflare R2'],
    p: [
      'Chúng ta cần khai báo rõ ràng các binding cho cơ sở dữ liệu D1 và kho lưu trữ R2 để môi trường OpenNext có thể truy cập mượt mà.',
      'Do Cloudflare Workers giới hạn thời gian CPU cho mỗi yêu cầu, việc giảm số vòng lặp PBKDF2 xuống 100.000 là chìa khóa để đăng ký tài khoản thành công.',
      'Hệ thống quản trị sau khi triển khai cho phép tạo các bộ sưu tập bài viết, chuyên mục và tải ảnh lên đám mây với chi phí 0 đồng.'
    ],
    tags: ['PayloadCMS', 'Cloudflare', 'D1', 'Tutorial'],
    featured: 1
  },
  {
    catId: 4,
    title: 'Nghệ thuật viết System Prompt: Bí quyết giúp AI trả lời chính xác và không bị ảo giác',
    slug: 'nghe-thuat-viet-system-prompt-bi-quyet-ai-tra-loi-chinh-xac',
    excerpt: 'Học cách thiết lập vai trò (Persona), định dạng đầu ra mong muốn (JSON/Markdown) và đặt các ranh giới an toàn nghiêm ngặt cho mô hình.',
    h: ['1. Cấu trúc chuẩn mực của một System Prompt hiệu quả', '2. Cung cấp ví dụ mẫu chất lượng cao (Few-Shot Prompting)', '3. Kỹ thuật ép buộc mô hình trích dẫn căn cứ'],
    p: [
      'Hãy định nghĩa rõ ràng đối tượng phục vụ, văn phong cần sử dụng và những điều tuyệt đối không được phép làm trong câu lệnh mở đầu.',
      'Cung cấp từ 2 đến 3 cặp câu hỏi - trả lời mẫu chuẩn mực sẽ giúp AI hiểu chính xác định dạng và độ sâu phân tích mà bạn kỳ vọng.',
      'Yêu cầu AI luôn nói "Tôi không biết" nếu câu hỏi không có đủ thông tin trong tài liệu cung cấp sẽ triệt tiêu 90% lỗi bịa đặt.'
    ],
    tags: ['PromptEngineering', 'LLM', 'AI', 'Tutorial'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Cách tạo mã QR nghệ thuật đẹp mắt có chèn logo thương hiệu không làm lỗi mã',
    slug: 'cach-tao-ma-qr-nghe-thuat-chen-logo-khong-loi',
    excerpt: 'Nắm vững nguyên lý vùng sửa lỗi Error Correction Level H và tỷ lệ vàng khi chèn logo vào tâm điểm mã QR Oloka.',
    h: ['1. Hiểu về các cấp độ chịu lỗi L, M, Q, H của mã QR', '2. Giới hạn kích thước logo không vượt quá 20% diện tích', '3. Kiểm thử trên nhiều dòng điện thoại khác nhau trước khi in'],
    p: [
      'Thiết lập cấp độ sửa lỗi H (High) cho phép mã QR vẫn quét thành công ngay cả khi có tới 30% bề mặt bị che khuất bởi hình ảnh logo.',
      'Logo nên có viền bo tròn màu trắng hoặc nền tương phản để không bị dính liền vào các điểm định vị vuông vức xung quanh.',
      'Luôn in thử mẫu trên giấy thường và dùng cả camera iPhone lẫn Android để quét kiểm tra ở nhiều điều kiện ánh sáng khác nhau.'
    ],
    tags: ['QRCode', 'Design', 'Branding', 'Tutorial'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Tự xây dựng ứng dụng chatbot hỏi đáp dữ liệu nội bộ bằng LangChain và Python',
    slug: 'tu-xay-dung-chatbot-du-lieu-noi-bo-langchain-python',
    excerpt: 'Từng bước nạp tài liệu công ty, phân mảnh văn bản, tạo chỉ mục vector và gọi API để xây dựng trợ lý ảo thông minh riêng.',
    h: ['1. Chuẩn bị dữ liệu và chia nhỏ văn bản (Text Splitting)', '2. Lưu trữ vector vào ChromaDB hoặc FAISS', '3. Kết nối Retriever với mô hình ngôn ngữ lớn'],
    p: [
      'Việc chọn kích thước phân mảnh (chunk size) khoảng 500-1000 ký tự với độ gối đầu 100 ký tự giúp giữ nguyên vẹn ý nghĩa của các đoạn văn.',
      'Các mô hình nhúng (Embedding) mã nguồn mở nhẹ nhàng có thể chạy mượt mà ngay trên máy tính mà không tốn phí dịch vụ bên ngoài.',
      'Chatbot hoàn thiện có thể trả lời các câu hỏi về chính sách nghỉ phép, quy trình nội bộ của công ty trong tích tắc.'
    ],
    tags: ['Python', 'LangChain', 'RAG', 'Coding'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Mẹo tối ưu hóa tốc độ tải trang Next.js đạt điểm 100 trên Google PageSpeed Insights',
    slug: 'meo-toi-uu-toc-do-tai-trang-nextjs-100-pagespeed',
    excerpt: 'Tận dụng Server Components, tối ưu hình ảnh định dạng WebP, trì hoãn tải script bên ngoài và nén tài nguyên tại biên mạng.',
    h: ['1. Giảm thiểu dung lượng gói JavaScript gửi về client', '2. Sử dụng thẻ Image tối ưu và thuộc tính priority cho ảnh bìa', '3. Tránh hiện tượng giật cục bố cục (Cumulative Layout Shift)'],
    p: [
      'Chỉ đưa mã JavaScript xuống trình duyệt cho những thành phần thực sự cần tương tác, các phần tĩnh còn lại hãy để máy chủ render sẵn.',
      'Khai báo rõ ràng kích thước width và height cho mọi khung hình giúp trình duyệt giữ chỗ trước, triệt tiêu hoàn toàn lỗi nhảy layout.',
      'Kết quả tải trang tức thì dưới 1 giây không chỉ làm hài lòng người dùng mà còn giúp trang web thăng hạng vượt trội trên công cụ tìm kiếm.'
    ],
    tags: ['Nextjs', 'Performance', 'SEO', 'WebDev'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Cách thiết lập tự động hóa quy trình viết bài và đăng tin bằng n8n và Webhook',
    slug: 'thiet-lap-tu-dong-hoa-quy-trinh-dang-tin-n8n-webhook',
    excerpt: 'Xây dựng đường ống tự động lấy tin từ RSS, tóm tắt ý chính bằng AI và gửi bản nháp vào hệ thống Payload CMS để biên tập viên duyệt.',
    h: ['1. Cài đặt nền tảng tự động hóa nguồn mở n8n', '2. Lắng nghe nguồn cấp tin RSS từ các trang công nghệ', '3. Đẩy bài viết tự động vào API của Oloka.net'],
    p: [
      'n8n cho phép kéo thả các luồng công việc phức tạp mà không cần viết quá nhiều mã nguồn, dễ dàng tự lưu trữ trên máy chủ riêng.',
      'Mô hình AI sẽ tự động dịch các thuật ngữ tiếng Anh sang tiếng Việt chuẩn xác và tạo đoạn tóm tắt súc tích cho bài viết.',
      'Biên tập viên chỉ cần mở trang quản trị CMS để xem lại bản nháp, bổ sung hình ảnh và nhấn nút xuất bản trong 1 phút.'
    ],
    tags: ['n8n', 'Automation', 'Workflow', 'NoCode'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Bảo vệ tài khoản trực tuyến: Hướng dẫn kích hoạt Passkey không cần nhớ mật khẩu',
    slug: 'bao-ve-tai-khoan-kich-hoat-passkey-khong-can-mat-khau',
    excerpt: 'Từ bỏ nỗi lo quên mật khẩu hoặc bị lừa đảo trang giả mạo (Phishing) nhờ công nghệ xác thực sinh trắc học vân tay và FaceID.',
    h: ['1. Nguyên lý mã hóa khóa công khai của chuẩn FIDO2', '2. Cách thiết lập Passkey trên tài khoản Google và Apple', '3. Đồng bộ hóa an toàn qua chùm chìa khóa đám mây'],
    p: [
      'Passkey sử dụng cặp khóa mật mã học độc nhất cho mỗi tên miền, tin tặc hoàn toàn không thể đánh cắp dù tạo ra trang đăng nhập giả tinh vi.',
      'Bạn chỉ cần chạm ngón tay vào cảm biến vân tay trên điện thoại hoặc máy tính để đăng nhập ngay lập tức vào mọi dịch vụ hỗ trợ.',
      'Nếu mất thiết bị, các khóa bảo mật vẫn được sao lưu mã hóa đầu cuối trên tài khoản đám mây của bạn để khôi phục dễ dàng.'
    ],
    tags: ['Security', 'Passkey', 'FIDO2', 'Privacy'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Cách làm video ngắn TikTok không cần lộ mặt (Faceless) từ kịch bản đến giọng đọc AI',
    slug: 'cach-lam-video-tiktok-khong-lo-mat-giong-doc-ai',
    excerpt: 'Quy trình sản xuất hàng loạt video chia sẻ kiến thức công nghệ thu hút hàng triệu lượt xem chỉ với một chiếc máy tính cá nhân.',
    h: ['1. Lên ý tưởng và kịch bản có câu mở đầu cuốn hút (Hook)', '2. Thu âm lời bình bằng công cụ OmniVoice tiếng Việt', '3. Ghép video nền b-roll từ kho lưu trữ miễn phí'],
    p: [
      '3 giây đầu tiên quyết định người xem có lướt qua hay không; hãy bắt đầu bằng một câu hỏi bất ngờ hoặc một con số gây sốc.',
      'Sử dụng giọng đọc AI trầm ấm, ngắt nhịp dứt khoát kết hợp phụ đề chữ to nổi bật giữa màn hình để người xem nắm bắt thông tin ngay cả khi tắt tiếng.',
      'Kết hợp các đoạn video minh họa công nghệ từ Pexels hoặc Unsplash để tạo nên sản phẩm hấp dẫn và chuyên nghiệp.'
    ],
    tags: ['TikTok', 'FacelessVideo', 'ContentCreation', 'OmniVoice'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Hướng dẫn sử dụng Git và GitHub căn bản cho người mới bắt đầu làm quen công nghệ',
    slug: 'huong-dan-git-github-can-ban-nguoi-moi-bat-dau',
    excerpt: 'Hiểu rõ khái niệm commit, branch, merge và pull request để quản lý lịch sử dự án và tự tin cộng tác với đồng nghiệp.',
    h: ['1. Khái niệm ảnh chụp trạng thái (Snapshot) trong Git', '2. Các câu lệnh thông dụng hàng ngày: add, commit, push, pull', '3. Quy tắc viết commit message rõ ràng và chuyên nghiệp'],
    p: [
      'Git giống như một cỗ máy thời gian cho mã nguồn, cho phép bạn quay lại bất kỳ phiên bản nào trong quá khứ nếu chẳng may làm hỏng chương trình.',
      'Tạo một nhánh (branch) riêng khi phát triển tính năng mới giúp bạn thoải mái thử nghiệm mà không ảnh hưởng tới nhánh chính đang chạy ổn định.',
      'Việc lưu trữ mã nguồn trên GitHub mở ra cơ hội giao lưu, học hỏi và đóng góp cho các dự án nguồn mở trên khắp thế giới.'
    ],
    tags: ['Git', 'GitHub', 'Coding', 'Tutorial'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Tối ưu hóa chi phí đám mây Cloudflare: Cách dùng gói Free đạt hiệu năng tối đa',
    slug: 'toi-uu-chi-phi-cloudflare-dung-goi-free-hieu-nang-cao',
    excerpt: 'Tận dụng 100.000 yêu cầu Workers mỗi ngày, 5 triệu lượt đọc D1 và 10GB lưu trữ R2 để vận hành website hoàn toàn miễn phí.',
    h: ['1. Bật bộ nhớ đệm Cache-Control thông minh cho tài nguyên tĩnh', '2. Tránh các truy vấn cơ sở dữ liệu thừa thãi trong vòng lặp', '3. Thiết lập cảnh báo chi phí và giới hạn lưu lượng an toàn'],
    p: [
      'Bằng cách đặt tiêu đề phản hồi cache cho các bài viết đã xuất bản, 90% lượt xem trang sẽ được phục vụ trực tiếp từ bộ nhớ đệm CDN mà không tốn lượt đọc D1.',
      'Nén hình ảnh sang định dạng WebP trước khi đưa lên R2 giúp tiết kiệm đáng kể dung lượng lưu trữ và băng thông truyền tải.',
      'Với kiến trúc tối ưu, một blog công nghệ có hàng chục nghìn độc giả mỗi tháng hoàn toàn có thể vận hành êm đẹp mà không tốn một đồng chi phí.'
    ],
    tags: ['Cloudflare', 'CostOptimization', 'FreeTier', 'DevOps'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Cách cài đặt và chạy mô hình ngôn ngữ lớn Ollama cục bộ trên máy tính cá nhân',
    slug: 'cach-cai-dat-chay-mo-hinh-ollama-cuc-bo-may-tinh',
    excerpt: 'Sở hữu một trợ lý trí tuệ nhân tạo riêng biệt chạy hoàn toàn offline không cần internet, bảo mật 100% dữ liệu cá nhân của bạn.',
    h: ['1. Yêu cầu phần cứng RAM và card đồ họa tối thiểu', '2. Tải về và chạy các dòng mô hình Llama 3 và Mistral', '3. Kết nối với giao diện web Open WebUI tuyệt đẹp'],
    p: [
      'Với máy tính có 16GB RAM, bạn có thể chạy mượt mà các mô hình phiên bản 7B hoặc 8B lượng tử hóa (quantized) phục vụ nhu cầu tra cứu hàng ngày.',
      'Chỉ bằng một dòng lệnh đơn giản trong terminal, Ollama sẽ tự động tải về và khởi chạy dịch vụ sẵn sàng nhận yêu cầu.',
      'Bạn có thể thoải mái phân tích các tài liệu kinh doanh mật hay ghi chú cá nhân mà không phải bận tâm về việc dữ liệu bị rò rỉ ra bên ngoài.'
    ],
    tags: ['Ollama', 'LocalLLM', 'Privacy', 'OfflineAI'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Cách tạo ảnh đại diện và banner chuyên nghiệp bằng Canva trong 15 phút',
    slug: 'cach-tao-anh-dai-dien-banner-chuyen-nghiep-canva',
    excerpt: 'Nguyên tắc phối màu chuẩn thương hiệu, căn chỉnh khoảng trống âm và lựa chọn font chữ tiếng Việt không bị lỗi dấu.',
    h: ['1. Lựa chọn bảng màu chủ đạo và màu nhấn tương phản', '2. Quy tắc một phần ba trong bố cục hình ảnh đại diện', '3. Tối ưu kích thước chuẩn cho Facebook, YouTube và LinkedIn'],
    p: [
      'Một bức ảnh đại diện chuyên nghiệp với màu sắc đồng bộ giúp bạn tạo dựng ấn tượng ban đầu đáng tin cậy với đối tác và nhà tuyển dụng.',
      'Hãy chọn những bộ font chữ hỗ trợ đầy đủ tiếng Việt để tránh hiện tượng chữ cái có dấu bị nhảy kích thước hoặc lệch kiểu dáng.',
      'Lưu ảnh dưới định dạng PNG chất lượng cao để bảo đảm các chi tiết và đường nét chữ không bị nhòe vỡ khi tải lên mạng xã hội.'
    ],
    tags: ['Design', 'Canva', 'PersonalBranding', 'Graphics'],
    featured: 0
  },
  {
    catId: 4,
    title: 'Kỹ thuật gỡ lỗi (Debugging) mã nguồn hiệu quả dành cho lập trình viên mới vào nghề',
    slug: 'ky-thuat-go-loi-debugging-hieu-qua-lap-trinh-vien',
    excerpt: 'Học cách sử dụng breakpoint, phân tích nhật ký lỗi (Stack Trace) và tư duy phương pháp loại trừ khoa học thay vì đoán mò.',
    h: ['1. Đọc hiểu thông báo lỗi thay vì hoảng loạn', '2. Sử dụng công cụ Debugger trong trình duyệt và VS Code', '3. Phương pháp chia để trị để cô lập vùng phát sinh lỗi'],
    p: [
      'Thông báo lỗi luôn chỉ rõ dòng lệnh và tệp tin bắt đầu sự cố; bình tĩnh đọc kỹ thông báo sẽ giúp bạn giải quyết 80% vấn đề trong vài phút.',
      'Đặt các điểm dừng (breakpoint) cho phép bạn theo dõi giá trị của từng biến số tại từng bước thực thi mà không cần lạm dụng console.log.',
      'Việc giải thích mã nguồn cho một con vịt cao su (Rubber Duck Debugging) là phương pháp tâm lý học kinh điển giúp tự nhận ra sơ hở trong logic của mình.'
    ],
    tags: ['Debugging', 'CodingTips', 'SoftwareEngineering', 'Tutorial'],
    featured: 0
  },

  // 59 - 72: Đánh giá & Trải nghiệm (reviews)
  {
    catId: 5,
    title: 'Top 5 công cụ tạo mã QR thương hiệu 2 tone màu đẹp mắt và chuẩn in ấn 2026',
    slug: 'top-5-cong-cu-tao-ma-qr-thuong-hieu-dep-mat-chuan-in-an',
    excerpt: 'Không còn những mã QR đen trắng đơn điệu, các nhà thiết kế hiện đại đang chuyển sang mã QR gradient có lồng ghép logo tâm điểm.',
    h: ['1. Xu hướng chuyển dịch sang mã QR mang nhận diện thị giác', '2. Đánh giá tính năng xuất file vector SVG độ phân giải vô hạn', '3. So sánh tính tiện dụng và chi phí giữa các giải pháp'],
    p: [
      'Mã QR thương hiệu với bảng màu đặc trưng giúp doanh nghiệp tăng tỷ lệ quét thực tế lên tới 40% so với mã đen trắng mặc định.',
      'Định dạng vector SVG cho phép phóng to mã QR lên kích thước tấm biển quảng cáo ngoài trời mà không bao giờ bị vỡ hạt pixel.',
      'Bộ công cụ Oloka QR Generator nổi bật với khả năng xử lý hoàn toàn trên trình duyệt, không lưu giữ dữ liệu người dùng và hoàn toàn miễn phí.'
    ],
    tags: ['Reviews', 'QRCode', 'Branding', 'Design'],
    featured: 1
  },
  {
    catId: 5,
    title: 'Đánh giá máy tính xách tay trang bị vi xử lý ARM: Thời lượng pin 20 tiếng có thực tế?',
    slug: 'danh-gia-laptop-vi-xu-ly-arm-thoi-luong-pin-20-tieng',
    excerpt: 'Trải nghiệm thực tế các dòng máy trang bị chip Snapdragon X Elite và Apple Silicon khi chạy các tác vụ lập trình và xử lý đa phương tiện.',
    h: ['1. Hiệu năng vượt bậc trên mỗi watt điện tiêu thụ', '2. Khả năng tương thích của các phần mềm x86 cũ', '3. Máy chạy mát rượi và hoàn toàn không nghe tiếng quạt'],
    p: [
      'Kiến trúc ARM mang lại trải nghiệm làm việc cả ngày dài ở quán cà phê mà không cần mang theo cục sạc cồng kềnh.',
      'Hầu hết các công cụ lập trình hiện đại như VS Code, Docker và Node.js đều đã có bản dựng native chạy với hiệu năng tối đa.',
      'Kỷ nguyên laptop chạy chip ARM đã thực sự trưởng thành và trở thành tiêu chuẩn mới cho máy tính làm việc di động.'
    ],
    tags: ['HardwareReview', 'ARM', 'Laptop', 'AppleSilicon'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Đánh giá kính thực tế ảo Apple Vision Pro sau một năm ra mắt: Tiềm năng và rào cản',
    slug: 'danh-gia-apple-vision-pro-sau-mot-nam-ra-mat',
    excerpt: 'Màn hình hiển thị sắc nét tuyệt đỉnh cùng cơ chế điều khiển bằng mắt trực quan, nhưng trọng lượng và mức giá vẫn là rào cản lớn.',
    h: ['1. Chất lượng hiển thị micro-OLED độ phân giải 4K mỗi mắt', '2. Trải nghiệm xem phim 3D và không gian làm việc đa màn hình', '3. Cảm giác đeo lâu và hệ sinh thái ứng dụng hiện tại'],
    p: [
      'Không còn hiện tượng nhìn thấy lưới điểm ảnh, người dùng có cảm giác như đang nhìn vào một màn hình rạp chiếu phim khổng lồ ngay trong phòng khách.',
      'Cơ chế theo dõi mắt và nhận diện cử chỉ ngón tay hoạt động chính xác đến mức bạn sẽ quên mất sự tồn tại của tay cầm điều khiển.',
      'Tuy nhiên, trọng lượng đè nặng lên sống mũi sau 1 tiếng sử dụng là điểm trừ lớn mà thế hệ tiếp theo cần phải khắc phục triệt để.'
    ],
    tags: ['Apple', 'VisionPro', 'SpatialComputing', 'HardwareReview'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Đánh giá bàn phím cơ công thái học (Ergonomic Keyboard): Đáng đầu tư cho dân văn phòng?',
    slug: 'danh-gia-ban-phim-co-cong-thai-hoc-ergonomic-keyboard',
    excerpt: 'Thiết kế tách đôi (split keyboard) giúp cổ tay thẳng tự nhiên, loại bỏ hoàn toàn các cơn đau mỏi hội chứng ống cổ tay sau ngày dài gõ phím.',
    h: ['1. Thời gian làm quen với cách gõ phím chia hai nửa', '2. Khả năng tùy biến layout và phím bấm theo thói quen cá nhân', '3. Hiệu quả giảm đau cổ tay và vai gáy rõ rệt'],
    p: [
      'Tuần đầu tiên làm quen có thể khiến tốc độ gõ chữ của bạn giảm một nửa, nhưng một khi đã quen, bạn sẽ không bao giờ muốn quay lại bàn phím phẳng.',
      'Khả năng nâng góc nghiêng (tenting) giúp bàn tay ở tư thế bắt tay tự nhiên, giải phóng toàn bộ áp lực đè nặng lên các dây thần kinh cổ tay.',
      'Đây là khoản đầu tư cho sức khỏe dài hạn vô cùng xứng đáng đối với các lập trình viên và người làm việc với máy tính chuyên nghiệp.'
    ],
    tags: ['Hardware', 'Ergonomics', 'Keyboard', 'HealthTech'],
    featured: 0
  },
  {
    catId: 5,
    title: 'So sánh chi tiết Cursor và GitHub Copilot: Trợ lý lập trình AI nào thực sự thông minh hơn?',
    slug: 'so-sanh-chi-tiet-cursor-va-github-copilot-tro-ly-ai',
    excerpt: 'Khả năng hiểu toàn bộ ngữ cảnh dự án (codebase indexing) của Cursor mang lại trải nghiệm vượt trội hơn hẳn so với việc gợi ý từng dòng của Copilot.',
    h: ['1. Tính năng @codebase và khả năng tìm kiếm ngữ nghĩa', '2. Trải nghiệm phím tắt Cmd+K và chế độ chỉnh sửa đa tệp tin', '3. Mức giá thuê bao hàng tháng và giá trị mang lại'],
    p: [
      'Cursor tạo chỉ mục toàn bộ repository trên máy tính của bạn, cho phép đặt câu hỏi về luồng dữ liệu của cả dự án một cách chính xác tuyệt đối.',
      'Khả năng tự động chỉnh sửa đồng thời 5 tệp tin liên quan khi bạn đổi tên một interface giúp tiết kiệm hàng giờ thao tác thủ công.',
      'Mặc dù có mức giá 20 USD mỗi tháng, phần lớn các lập trình viên đều thừa nhận năng suất của họ tăng gấp đôi sau khi chuyển sang dùng Cursor.'
    ],
    tags: ['Cursor', 'GitHubCopilot', 'DevTools', 'CodingReview'],
    featured: 1
  },
  {
    catId: 5,
    title: 'Đánh giá màn hình công nghệ OLED 4K dành cho lập trình viên và đồ họa: Có bị mờ chữ?',
    slug: 'danh-gia-man-hinh-oled-4k-lap-trinh-vien-do-hoa',
    excerpt: 'Kiểm tra độ sắc nét của văn bản với bố cục sub-pixel mới, màu đen vô cực và góc nhìn rộng tuyệt đối trên các dòng màn hình cao cấp.',
    h: ['1. Vấn đề viền màu chữ (Text Fringing) trên tấm nền OLED thế hệ cũ', '2. Đột phá với mật độ điểm ảnh cao trên độ phân giải 4K', '3. Cơ chế bảo vệ màn hình chống lưu ảnh của nhà sản xuất'],
    p: [
      'Nhờ mật độ điểm ảnh vượt trên 140 PPI ở độ phân giải 4K, hiện tượng răng cưa ở viền chữ đã được triệt tiêu hoàn toàn, mang lại trải nghiệm đọc cực kỳ dễ chịu.',
      'Độ tương phản vô cực giúp đôi mắt không bị mỏi khi làm việc trong phòng tối với giao diện nền tối của các trình biên tập mã nguồn.',
      'Các chính sách bảo hành 3 năm bao gồm cả lỗi burn-in giúp người dùng hoàn toàn an tâm khi đầu tư sản phẩm cao cấp này.'
    ],
    tags: ['HardwareReview', 'OLED', 'Monitor', 'TechReview'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Đánh giá ứng dụng ghi chú Obsidian: Nắm giữ tri thức thứ hai (Second Brain) trọn đời',
    slug: 'danh-gia-ung-dung-ghi-chu-obsidian-second-brain',
    excerpt: 'Lưu trữ tệp Markdown cục bộ trên máy tính, liên kết hai chiều mạnh mẽ và đồ thị trực quan hóa mạng lưới tư duy cá nhân.',
    h: ['1. Dữ liệu thuộc về bạn 100% không phụ thuộc vào đám mây', '2. Sức mạnh của liên kết hai chiều [[Bi-directional Linking]]', '3. Hệ sinh thái plugin cộng đồng phong phú vô tận'],
    p: [
      'Mọi ghi chú đều được lưu dưới dạng tệp văn bản thuần .md trên ổ cứng, bảo đảm bạn có thể đọc lại sau 20 năm nữa dù phần mềm có ngừng hoạt động.',
      'Đồ thị mạng lưới (Graph View) giúp bạn phát hiện những mối liên hệ bất ngờ giữa các ý tưởng mà trước đây bạn chưa từng nhận ra.',
      'Obsidian là lựa chọn số một cho các học giả, nhà nghiên cứu và người đam mê phương pháp ghi chú Zettelkasten hiện đại.'
    ],
    tags: ['Productivity', 'Obsidian', 'SecondBrain', 'SoftwareReview'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Trải nghiệm tai nghe chống ồn chủ động (ANC) thế hệ mới: Không gian tĩnh lặng giữa phố xá',
    slug: 'trai-nghiem-tai-nghe-chong-on-chu-dong-anc-the-he-moi',
    excerpt: 'Khả năng triệt tiêu tiếng ồn tần số thấp của động cơ xe và giọng nói người xung quanh giúp duy trì trạng thái tập trung sâu (Deep Work).',
    h: ['1. Cơ chế đảo ngược pha sóng âm của công nghệ ANC', '2. Chế độ xuyên âm tự nhiên nghe rõ tiếng người đối diện', '3. Chất lượng micro đàm thoại khi họp trực tuyến'],
    p: [
      'Khi đeo tai nghe và bật chống ồn, toàn bộ tiếng ầm ĩ của động cơ máy bay hay tiếng trò chuyện ồn ào ở quán cà phê dường như biến mất kỳ diệu.',
      'Chế độ xuyên âm (Transparency Mode) cho phép bạn trò chuyện nhanh với đồng nghiệp mà không cần phải tháo tai nghe ra khỏi tai.',
      'Đây là món đồ công nghệ không thể thiếu để duy trì sự tập trung cao độ trong các không gian làm việc chung mở (Open Workspace).'
    ],
    tags: ['Headphones', 'ANC', 'AudioReview', 'Hardware'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Đánh giá dịch vụ lưu trữ đám mây Cloudflare R2: Đối thủ đáng gờm của Amazon S3',
    slug: 'danh-gia-luu-tru-dam-may-cloudflare-r2-doi-thu-amazon-s3',
    excerpt: 'Chính sách miễn phí hoàn toàn băng thông tải xuống (Zero Egress Fees) giúp các startup tiết kiệm hàng nghìn USD hóa đơn hạ tầng mỗi tháng.',
    h: ['1. Nỗi ám ảnh chi phí băng thông tải ra của các dịch vụ đám mây cũ', '2. Tương thích hoàn toàn với chuẩn API S3 thông dụng', '3. Tích hợp sâu với mạng lưới phân phối CDN toàn cầu'],
    p: [
      'Amazon S3 tính phí rất cao khi dữ liệu được người dùng tải về máy, trong khi Cloudflare R2 chỉ tính phí dung lượng lưu trữ trên đĩa.',
      'Lập trình viên có thể chuyển đổi thư viện mã nguồn từ S3 sang R2 chỉ bằng cách thay đổi địa chỉ endpoint và khóa truy cập.',
      'Hệ thống lưu trữ ảnh và video của Oloka.net đang vận hành trơn tru trên nền tảng R2 với độ tin cậy và tốc độ tuyệt vời.'
    ],
    tags: ['Cloudflare', 'R2', 'Storage', 'CloudReview'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Đánh giá loa thông minh tích hợp trợ lý AI thế hệ mới: Đối thoại tự nhiên không cần câu lệnh mẫu',
    slug: 'danh-gia-loa-thong-minh-tro-ly-ai-the-he-moi',
    excerpt: 'Không còn những câu trả lời rập khuôn cứng nhắc, loa thông minh nay có thể trò chuyện dài tập, hiểu ẩn ý và điều khiển nhà thông minh chuẩn xác.',
    h: ['1. Tích hợp mô hình ngôn ngữ lớn xử lý ngôn ngữ tự nhiên', '2. Nhận diện giọng nói của từng thành viên trong gia đình', '3. Tự động hóa lịch sinh hoạt và kết nối thiết bị chuẩn Matter'],
    p: [
      'Bạn có thể nói chuyện với chiếc loa như với một người bạn trong phòng khách, ngắt lời bất cứ lúc nào để hỏi thêm chi tiết.',
      'Trợ lý có thể ghi nhớ thói quen nghe nhạc của từng người và tự động điều chỉnh nhiệt độ phòng ngủ phù hợp theo thời tiết bên ngoài.',
      'Chuẩn kết nối thống nhất Matter giúp chiếc loa dễ dàng kết nối với bóng đèn, rèm cửa của mọi thương hiệu khác nhau.'
    ],
    tags: ['SmartHome', 'IoT', 'VoiceAssistant', 'HardwareReview'],
    featured: 0
  },
  {
    catId: 5,
    title: 'So sánh đồng hồ thông minh thể thao: Đâu là thiết bị theo dõi sức khỏe và giấc ngủ chính xác nhất?',
    slug: 'so-sanh-dong-ho-thong-minh-the-thao-suc-khoe-giac-ngu',
    excerpt: 'Đánh giá độ chính xác của cảm biến nhịp tim quang học, điện tâm đồ ECG và thuật toán phân tích chu kỳ ngủ sâu của Apple Watch và Garmin.',
    h: ['1. Thời lượng pin 2 tuần của Garmin so với tính năng thông minh của Apple', '2. Cảm biến định vị GPS đa băng tần chính xác từng mét đường chạy', '3. Cảnh báo sớm các nguy cơ rung tâm nhĩ và ngưng thở khi ngủ'],
    p: [
      'Người yêu thích chạy bộ đường dài và leo núi luôn ưu tiên Garmin nhờ pin bền bỉ và bản đồ địa hình chi tiết hiển thị offline.',
      'Apple Watch lại vượt trội về tính năng liên lạc, nghe gọi và sự tinh tế trong việc kết nối mượt mà với hệ sinh thái iPhone.',
      'Cả hai thiết bị đều đóng vai trò như một người bác sĩ tàng hình luôn theo dõi và nhắc nhở bạn chăm sóc cơ thể mỗi ngày.'
    ],
    tags: ['Smartwatch', 'FitnessTech', 'Garmin', 'AppleWatch'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Đánh giá camera an ninh gia đình tích hợp AI: Nhận diện người quen và thú cưng tức thì',
    slug: 'danh-gia-camera-an-ninh-gia-dinh-tich-hop-ai-nhan-dien',
    excerpt: 'Xử lý nhận diện khuôn mặt cục bộ ngay trên thiết bị mà không gửi video lên đám mây, bảo đảm an toàn quyền riêng tư tuyệt đối.',
    h: ['1. Triệt tiêu các báo động giả do lá cây rung hay bóng mây', '2. Tầm nhìn ban đêm có màu với cảm biến khẩu độ lớn', '3. Lưu trữ thẻ nhớ hoặc ổ cứng mạng NAS riêng biệt'],
    p: [
      'Chip AI gắn trong camera phân biệt rõ ràng giữa bóng dáng kẻ trộm đột nhập và chú mèo cưng đang chạy nhảy quanh nhà.',
      'Bạn sẽ chỉ nhận được thông báo trên điện thoại khi có người lạ xuất hiện trước cửa nhà trong khung giờ bất thường.',
      'Tính năng lưu trữ nội bộ giúp bạn hoàn toàn yên tâm rằng những khoảnh khắc sinh hoạt gia đình không bị ai khác dòm ngó.'
    ],
    tags: ['SmartHome', 'Camera', 'Security', 'HardwareReview'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Trải nghiệm chuột công thái học không dây dạng đứng (Vertical Mouse): Cứu tinh cổ tay',
    slug: 'trai-nghiem-chuot-cong-thai-hoc-dung-vertical-mouse',
    excerpt: 'Góc nghiêng 57 độ tự nhiên giúp bàn tay ở tư thế bắt tay thư giãn, loại bỏ cảm giác căng cơ bắp tay khi làm việc văn phòng suốt 8 tiếng.',
    h: ['1. Khác biệt cơ bản về mặt giải phẫu học so với chuột truyền thống', '2. Độ nhạy cảm biến và con lăn cuộn tài liệu mượt mà', '3. Phù hợp cho dân kế toán, đồ họa và lập trình viên'],
    p: [
      'Khi dùng chuột dẹt thông thường, hai xương cẳng tay bị vặn chéo gây áp lực lên dây thần kinh giữa; chuột đứng đưa cánh tay về trạng thái nghỉ tự nhiên.',
      'Cảm giác mỏi nhức ở cổ tay vào cuối ngày làm việc giảm đi rõ rệt chỉ sau 3 ngày chuyển đổi thiết bị.',
      'Sản phẩm được trang bị nút chuyển nhanh giữa 3 máy tính khác nhau, rất tiện lợi cho người sử dụng cùng lúc laptop và máy bàn.'
    ],
    tags: ['Mouse', 'Ergonomics', 'HardwareReview', 'OfficeGear'],
    featured: 0
  },
  {
    catId: 5,
    title: 'Đánh giá máy đọc sách màn hình mực điện tử màu (Color E-Ink): Có thay thế được máy tính bảng?',
    slug: 'danh-gia-may-doc-sach-man-hinh-muc-dien-tu-mau-color-e-ink',
    excerpt: 'Đọc truyện tranh và tài liệu đồ họa màu sắc dịu mắt không phát ra ánh sáng xanh, thời lượng pin tính bằng tuần.',
    h: ['1. Công nghệ màn hình E-Ink Kaleido 3 hiển thị màu sắc', '2. Trải nghiệm đọc tài liệu PDF và truyện tranh rực rỡ', '3. So sánh với màn hình LCD và máy tính bảng thông thường'],
    p: [
      'Ánh sáng phản xạ tự nhiên giúp đôi mắt của bạn hoàn toàn thư giãn như đang đọc một cuốn sách giấy in màu truyền thống.',
      'Mặc dù màu sắc không thể rực rỡ bằng màn hình iPad, nhưng sự an toàn cho giấc ngủ vào ban đêm là ưu điểm không thể thay thế.',
      'Khả năng ghi chú bằng bút cảm ứng trực tiếp lên trang sách rất thích hợp cho những người có thói quen đọc tài liệu nghiên cứu sâu.'
    ],
    tags: ['EInk', 'Ereader', 'GadgetReview', 'Hardware'],
    featured: 0
  },

  // 73 - 82: An ninh mạng & Dữ liệu (cybersecurity)
  {
    catId: 6,
    title: 'Làn sóng tấn công mạng sử dụng AI giả mạo giọng nói (Deepfake Voice Phishing) gia tăng',
    slug: 'tan-cong-mang-ai-gia-mao-giong-noi-deepfake-voice',
    excerpt: 'Kẻ xấu chỉ cần thu âm 3 giây giọng nói từ mạng xã hội để nhân bản giọng người thân nhằm gọi điện lừa đảo chuyển tiền khẩn cấp.',
    h: ['1. Thủ đoạn tinh vi của các cuộc gọi mạo danh bằng AI', '2. Thiết lập mật khẩu an toàn bằng lời nói trong nội bộ gia đình', '3. Các giải pháp công nghệ nhận diện giọng nói tổng hợp'],
    p: [
      'Giọng đọc được tái tạo với độ chính xác kinh ngạc, kèm theo cả những tiếng khóc lóc hoảng loạn tạo áp lực tâm lý cho nạn nhân.',
      'Mỗi gia đình nên quy ước một câu hỏi bí mật mà chỉ các thành viên ruột thịt mới biết câu trả lời khi có cuộc gọi khẩn đòi tiền.',
      'Các nhà mạng viễn thông đang gấp rút tích hợp hệ thống AI phát hiện giọng nói nhân tạo vào tổng đài để cảnh báo người nghe kịp thời.'
    ],
    tags: ['CyberSecurity', 'Deepfake', 'SocialEngineering', 'SecurityNews'],
    featured: 1
  },
  {
    catId: 6,
    title: 'Mô hình bảo mật Zero Trust: Tại sao không bao giờ được tin tưởng bất kỳ thiết bị nào bên trong mạng?',
    slug: 'mo-hinh-bao-mat-zero-trust-tai-sao-khong-tin-tuong',
    excerpt: 'Nguyên tắc xác thực liên tục từng yêu cầu truy cập thay vì dựa dẫm vào bức tường lửa VPN truyền thống giúp ngăn chặn rò rỉ dữ liệu.',
    h: ['1. Sai lầm của tư duy lâu đài và hào nước (Perimeter Security)', '2. Ba trụ cột của Zero Trust: Xác thực, Cấp quyền tối thiểu, Giả định bị xâm nhập', '3. Lợi ích khi nhân viên làm việc từ xa phân tán'],
    p: [
      'Nếu tin tặc chiếm được tài khoản của một nhân viên trong mạng nội bộ, bức tường lửa truyền thống sẽ hoàn toàn vô dụng.',
      'Với Zero Trust, mỗi lần mở tài liệu hay gửi truy vấn cơ sở dữ liệu đều phải kiểm tra danh tính và độ an toàn của thiết bị.',
      'Doanh nghiệp có thể tự tin cho phép nhân sự làm việc từ quán cà phê hay tại nhà mà không lo bị lộ dữ liệu nhạy cảm.'
    ],
    tags: ['ZeroTrust', 'Security', 'Enterprise', 'Networking'],
    featured: 0
  },
  {
    catId: 6,
    title: 'Mã hóa hậu lượng tử (Post-Quantum Cryptography): Chuẩn bị lá chắn trước khi máy tính lượng tử bẻ khóa',
    slug: 'ma-hoa-hau-luong-tu-post-quantum-cryptography-chuan-bi-la-chan',
    excerpt: 'Viện Tiêu chuẩn NIST công bố các thuật toán mật mã dựa trên lưới tinh thể mới để thay thế chuẩn RSA và ECC đang đứng trước nguy cơ lỗi thời.',
    h: ['1. Mối đe dọa từ thuật toán lượng tử Shor đối với mã hóa hiện tại', '2. Chiến dịch Thu thập trước, giải mã sau (Harvest Now, Decrypt Later)', '3. Lộ trình nâng cấp giao thức TLS và chứng chỉ số toàn cầu'],
    p: [
      'Máy tính lượng tử tương lai có thể bẻ khóa các mật khẩu và chữ ký số an toàn nhất hiện nay chỉ trong vài phút ngắn ngủi.',
      'Tin tặc đang âm thầm tải về và lưu trữ các gói dữ liệu mã hóa mật của chính phủ và ngân hàng để chờ ngày máy tính lượng tử ra đời.',
      'Các tổ chức tài chính lớn đã bắt đầu thử nghiệm nâng cấp hệ thống máy chủ sang các bộ thuật toán kháng lượng tử mới được phê chuẩn.'
    ],
    tags: ['QuantumSecurity', 'Cryptography', 'NIST', 'SecurityTech'],
    featured: 0
  },
  {
    catId: 6,
    title: 'Bảo vệ chuỗi cung ứng phần mềm: Hiểm họa từ các gói thư viện mã nguồn mở bị đầu độc',
    slug: 'bao-ve-chuoi-cung-ung-phan-mem-thu-vien-bi-dau-doc',
    excerpt: 'Kẻ xấu cố tình đóng góp mã độc vào các gói npm và PyPI phổ biến hoặc tạo tên miền nhái (typosquatting) để đánh cắp khóa bí mật API.',
    h: ['1. Hình thức tấn công tinh vi qua các bản cập nhật phụ thuộc', '2. Tầm quan trọng của danh mục thành phần phần mềm (SBOM)', '3. Tự động quét lỗ hổng bằng Dependabot và Snyk trong CI/CD'],
    p: [
      'Chỉ một dòng mã độc ẩn giấu trong một thư viện tiện ích nhỏ cũng có thể lây lan tới hàng triệu ứng dụng web đang vận hành trên toàn cầu.',
      'Lập trình viên cần kiểm tra kỹ lưỡng danh tính tác giả và chữ ký điện tử của các gói phần mềm trước khi đưa vào dự án sản phẩm.',
      'Quy trình kiểm tra tự động trước khi triển khai là phòng tuyến bắt buộc để ngăn chặn các tệp chứa mã độc lọt vào môi trường sản xuất.'
    ],
    tags: ['SupplyChain', 'DevSecOps', 'OpenSource', 'AppSec'],
    featured: 0
  },
  {
    catId: 6,
    title: 'Quản lý khóa bí mật và mã định danh API (Secrets Management) an toàn trong phát triển ứng dụng',
    slug: 'quan-ly-khoa-bi-mat-api-secrets-management-an-toan',
    excerpt: 'Tránh thảm họa đẩy nhầm khóa bí mật PAYLOAD_SECRET hay AWS Key lên kho lưu trữ GitHub công khai bằng các công cụ chuyên dụng.',
    h: ['1. Hậu quả tức thì khi lộ khóa bí mật trên kho mã nguồn mở', '2. Sử dụng tệp biến môi trường .env và cơ chế tự động xoay vòng khóa', '3. Giải pháp lưu trữ tập trung với Cloudflare Secrets và Vault'],
    p: [
      'Các bot tự động của tin tặc quét GitHub liên tục 24/7 và có thể chiếm quyền điều khiển tài nguyên đám mây của bạn chỉ 30 giây sau khi commit.',
      'Tuyệt đối không bao giờ ghi cứng mật khẩu hay khóa API trực tiếp vào mã nguồn; hãy luôn dùng biến môi trường được mã hóa.',
      'Thiết lập các công cụ git pre-commit hook sẽ giúp tự động cảnh báo và ngăn chặn hành động commit nếu phát hiện có chuỗi khóa bí mật.'
    ],
    tags: ['SecretsManagement', 'GitSecurity', 'Cloudflare', 'SecurityBestPractices'],
    featured: 0
  },
  {
    catId: 6,
    title: 'Tấn công từ chối dịch vụ phân tán (DDoS) đạt kỷ lục hàng trăm triệu gói tin mỗi giây',
    slug: 'tan-cong-tu-choi-dich-vu-ddos-ky-luc-tram-trieu-goi-tin',
    excerpt: 'Mạng botnet bao gồm hàng triệu thiết bị IoT gia đình bị xâm nhập đang tạo ra những cơn bão lưu lượng khổng lồ nhằm đánh sập các dịch vụ trực tuyến.',
    h: ['1. Sự nguy hiểm của các mạng botnet thiết bị thông minh không đổi mật khẩu', '2. Vai trò sống còn của mạng lưới phân tán Anycast CDN', '3. Kinh nghiệm cấu hình chống DDoS với Cloudflare WAF'],
    p: [
      'Các bóng đèn, camera an ninh giá rẻ thường có mật khẩu mặc định sơ sài, dễ dàng bị tin tặc chiếm quyền điều khiển để làm công cụ tấn công.',
      'Mạng lưới phòng thủ toàn cầu của Cloudflare có thể hấp thụ và phân tán các đợt tấn công hàng terabit mà máy chủ gốc không hề hay biết.',
      'Việc thiết lập các quy tắc giới hạn tần suất (Rate Limiting) trên WAF giúp website của bạn luôn đứng vững trước các đợt tấn công ác ý.'
    ],
    tags: ['DDoS', 'CloudflareWAF', 'NetworkSecurity', 'CyberAttack'],
    featured: 0
  },
  {
    catId: 6,
    title: 'Bảo mật quyền riêng tư cho các mô hình AI: Kỹ thuật học liên kết (Federated Learning)',
    slug: 'bao-mat-quyen-rieng-tu-mo-hinh-ai-federated-learning',
    excerpt: 'Huấn luyện mô hình trực tiếp trên điện thoại của người dùng mà không cần tập trung dữ liệu nhạy cảm về máy chủ trung tâm.',
    h: ['1. Nguyên lý chỉ gửi bản cập nhật trọng số nơ-ron thay vì dữ liệu gốc', '2. Bảo vệ dữ liệu hồ sơ bệnh án và lịch sử tin nhắn cá nhân', '3. Đảm bảo tuân thủ các quy định khắt khe về quyền riêng tư GDPR'],
    p: [
      'Dữ liệu cá nhân luôn nằm lại trên thiết bị của bạn; máy chủ chỉ nhận các tham số toán học đã được làm nhiễu để cải thiện mô hình chung.',
      'Các bệnh viện có thể hợp tác huấn luyện mô hình chẩn đoán ung thư mà không cần chia sẻ dữ liệu bệnh nhân cho nhau, bảo đảm tính nhân văn.',
      'Đây là hướng đi tương lai để kết hợp hài hòa giữa sức mạnh của trí tuệ nhân tạo và quyền thiêng liêng về bảo mật dữ liệu con người.'
    ],
    tags: ['FederatedLearning', 'Privacy', 'AI', 'HealthData'],
    featured: 0
  },
  {
    catId: 6,
    title: 'Cảnh báo hình thức tấn công tiêm nhiễm câu lệnh (Prompt Injection) vào các ứng dụng AI',
    slug: 'canh-bao-tan-cong-tiem-nhiem-cau-lenh-prompt-injection',
    excerpt: 'Kẻ tấn công lừa trợ lý ảo bỏ qua các chỉ dẫn an toàn của hệ thống để đánh cắp dữ liệu cơ sở dữ liệu nội bộ hoặc thực thi mã độc.',
    h: ['1. Sự tương đồng giữa Prompt Injection và lỗ hổng SQL Injection kinh điển', '2. Tấn công gián tiếp qua việc đọc tài liệu độc hại trên web', '3. Xây dựng lớp màng lọc bảo vệ đầu vào và đầu ra cho LLM'],
    p: [
      'Một đoạn văn bản ẩn giấu trên trang web có thể ra lệnh cho AI gửi toàn bộ lịch sử trò chuyện của người dùng tới máy chủ của kẻ tấn công.',
      'Các hệ thống AI cần phân biệt rạch ròi giữa câu lệnh điều hành của hệ thống và nội dung dữ liệu do người dùng hoặc bên ngoài cung cấp.',
      'Sử dụng các mô hình nhỏ chuyên trách làm nhiệm vụ kiểm duyệt an toàn (Guardrails) là giải pháp phòng ngự tiêu chuẩn hiện nay.'
    ],
    tags: ['PromptInjection', 'LLMSecurity', 'AISafety', 'CyberSecurity'],
    featured: 0
  },
  {
    catId: 6,
    title: 'An toàn dữ liệu đám mây: Cách thiết lập phân quyền IAM theo nguyên tắc đặc quyền tối thiểu',
    slug: 'an-toan-du-lieu-dam-may-phan-quyen-iam-dac-quyen-toi-thieu',
    excerpt: 'Hạn chế tối đa phạm vi truy cập của từng tài khoản nhân viên và dịch vụ giúp cô lập thiệt hại khi xảy ra sự cố rò rỉ thông tin đăng nhập.',
    h: ['1. Nguy cơ từ việc lạm dụng tài khoản quản trị tối cao (Root/Admin)', '2. Cấp quyền tạm thời dựa trên vai trò (Role-based Access Control)', '3. Kiểm toán nhật ký truy cập định kỳ bằng CloudTrail'],
    p: [
      'Một ứng dụng web chỉ cần quyền đọc một bảng dữ liệu nhất định thì tuyệt đối không được cấp quyền ghi hay quyền truy cập vào các bảng khác.',
      'Sử dụng các mã thông báo truy cập có thời hạn ngắn (Temporary Tokens) giúp giảm thiểu rủi ro nếu chẳng may mã bị lộ ra ngoài.',
      'Nhật ký hoạt động cần được ghi lại đầy đủ và không thể chỉnh sửa để phục vụ công tác điều tra nguyên nhân khi có sự cố bất thường.'
    ],
    tags: ['CloudSecurity', 'IAM', 'Compliance', 'SecurityArchitecture'],
    featured: 0
  },
  {
    catId: 6,
    title: 'Phishing 2.0: Nhận diện các chiêu trò lừa đảo qua mã QR giả mạo (Quishing)',
    slug: 'phishing-2-0-nhan-dien-chieu-tro-lua-dao-ma-qr-gia-mao-quishing',
    excerpt: 'Kẻ xấu dán đè mã QR độc hại tại các bãi đỗ xe hoặc bàn ăn nhà hàng để dẫn dụ người dùng truy cập trang thanh toán giả mạo.',
    h: ['1. Tại sao mã QR trở thành công cụ lừa đảo ưa thích của tin tặc', '2. Cách kiểm tra địa chỉ URL hiển thị trước khi nhấn xác nhận thanh toán', '3. Biện pháp bảo vệ từ các ứng dụng quét mã thông minh'],
    p: [
      'Mắt người không thể đọc trực tiếp nội dung bên trong mã QR, tạo sơ hở cho kẻ xấu dẫn dụ người dùng vào các liên kết lừa đảo tinh vi.',
      'Hãy luôn quan sát kỹ xem miếng dán mã QR có dấu hiệu bị bóc ra hay dán đè lên một mã khác tại các điểm công cộng hay không.',
      'Luôn đọc kỹ tên miền hiển thị trên thanh địa chỉ của trình duyệt trước khi nhập bất kỳ thông tin tài khoản ngân hàng nào.'
    ],
    tags: ['Quishing', 'Phishing', 'QRCodeSecurity', 'Awareness'],
    featured: 0
  },

  // 83 - 92: Phần cứng & Robotics (robotics-hardware)
  {
    catId: 7,
    title: 'Robot hình người (Humanoid Robot) bước vào dây chuyền sản xuất lắp ráp ô tô thực tế',
    slug: 'robot-hinh-nguoi-humanoid-robot-day-chuyen-lap-rap-o-to',
    excerpt: 'Các robot hình người thế hệ mới có thể tự di chuyển, bưng bê linh kiện nặng và sử dụng ngón tay khéo léo để cắm các đầu giắc điện tử phức tạp.',
    h: ['1. Đột phá về khớp cơ điện và bàn tay xúc giác khéo léo', '2. Học hành vi thông qua mô hình học tăng cường từ thế giới ảo', '3. Hợp tác an toàn bên cạnh công nhân con người trong nhà xưởng'],
    p: [
      'Khả năng đi lại trên hai chân giúp robot dễ dàng di chuyển qua các bậc thang và lối đi hẹp vốn được thiết kế riêng cho con người.',
      'Hệ thống thị giác máy tính nhận diện chính xác vị trí linh kiện trong không gian 3D và tự điều chỉnh lực bóp vừa đủ để không làm vỡ đồ vật.',
      'Sự tham gia của robot giúp giải phóng con người khỏi những công việc lặp đi lặp lại nặng nhọc và tiềm ẩn nhiều rủi ro chấn thương.'
    ],
    tags: ['Robotics', 'Humanoid', 'Manufacturing', 'Automation'],
    featured: 1
  },
  {
    catId: 7,
    title: 'Vi xử lý thần kinh (NPU) trên máy tính cá nhân: Xu hướng AI PC định hình lại trải nghiệm',
    slug: 'vi-xu-ly-than-kinh-npu-ai-pc-dinh-hinh-trai-nghiem',
    excerpt: 'Nhân xử lý chuyên dụng NPU giúp chạy các tác vụ làm mờ hậu cảnh, xóa tiếng ồn và nhận diện khuôn mặt mà không tốn pin của CPU và GPU.',
    h: ['1. Kiến trúc tối ưu cho các phép tính dấu phẩy động 8-bit (INT8)', '2. Chuẩn tối thiểu 40 TOPS để kích hoạt các tính năng Copilot+', '3. Tương lai của phần mềm văn phòng thông minh chạy tại chỗ'],
    p: [
      'NPU thực hiện hàng nghìn tỷ phép tính mỗi giây với mức tiêu thụ năng lượng chỉ bằng một phần mười so với card đồ họa rời.',
      'Các ứng dụng gọi video có thể liên tục theo dõi ánh mắt và xóa phông nền mượt mà suốt nhiều giờ liền mà máy vẫn mát rượi.',
      'Người dùng được tận hưởng các tiện ích thông minh ngay lập tức mà không cần phụ thuộc vào tốc độ đường truyền internet.'
    ],
    tags: ['NPU', 'AIPC', 'Semiconductors', 'HardwareTrends'],
    featured: 0
  },
  {
    catId: 7,
    title: 'Cánh tay robot phẫu thuật siêu chính xác với phản hồi xúc giác cho bác sĩ từ xa',
    slug: 'canh-tay-robot-phau-thuat-phan-hoi-xuc-giac-tu-xa',
    excerpt: 'Bác sĩ có thể cảm nhận được độ đàn hồi của mô tế bào qua tay cầm điều khiển, thực hiện các ca mổ tim vi phẫu với độ chính xác đến từng micromet.',
    h: ['1. Triệt tiêu hoàn toàn hiện tượng run tay của bác sĩ phẫu thuật', '2. Phóng đại hình ảnh nội soi 3D chất lượng 8K không độ trễ', '3. Mở ra cơ hội mổ cứu sống bệnh nhân ở vùng sâu vùng xa'],
    p: [
      'Cánh tay robot có thể xoay trở linh hoạt ở những góc hẹp trong cơ thể mà bàn tay con người không thể nào tiếp cận được.',
      'Hệ thống cảm biến áp suất siêu nhạy truyền cảm giác lực về ngón tay bác sĩ, giúp ngăn chặn việc siết chỉ khâu quá chặt gây tổn thương mô.',
      'Sự kết hợp giữa chuyên môn của các bác sĩ đầu ngành và độ chính xác của cơ khí chính xác mang lại cơ hội hồi phục nhanh chóng cho người bệnh.'
    ],
    tags: ['MedTech', 'Robotics', 'Surgery', 'HealthTech'],
    featured: 0
  },
  {
    catId: 7,
    title: 'Thiết bị bay không người lái (Drone) tự hành kiểm tra hệ thống đường dây điện cao thế',
    slug: 'drone-tu-hanh-kiem-tra-duong-day-dien-cao-the',
    excerpt: 'Ứng dụng camera tầm nhiệt và cảm biến LiDAR giúp phát hiện sớm các điểm phát nhiệt rủi ro và cây cối xâm phạm hành lang lưới điện.',
    h: ['1. Thay thế phương pháp leo trèo cột điện nguy hiểm truyền thống', '2. Thuật toán AI tự động đánh dấu các vị trí ốc vít lỏng lẻo', '3. Tiết kiệm hàng triệu USD chi phí bảo dưỡng hạ tầng lưới điện quốc gia'],
    p: [
      'Drone có thể tự động cất cánh từ các trạm sạc không dây đặt dọc tuyến đường dây, bay tuần tra hàng trăm kilomet theo lịch trình định sẵn.',
      'Camera ảnh nhiệt phát hiện ngay lập tức các mối nối bị quá nhiệt trước khi chúng kịp bốc cháy gây mất điện diện rộng.',
      'Công nghệ này bảo vệ tính mạng cho các công nhân ngành điện và bảo đảm an ninh năng lượng thông suốt cho cả nền kinh tế.'
    ],
    tags: ['Drone', 'Infrastructure', 'EnergyTech', 'Automation'],
    featured: 0
  },
  {
    catId: 7,
    title: 'Giao diện não - máy tính (Brain-Computer Interface): Bệnh nhân bại liệt có thể điều khiển chuột bằng suy nghĩ',
    slug: 'giao-dien-nao-may-tinh-bci-dieu-khien-chuot-bang-suy-nghi',
    excerpt: 'Vi chip cấy ghép siêu nhỏ ghi nhận tín hiệu xung điện từ vỏ não vận động, chuyển hóa thành lệnh di chuyển con trỏ trên màn hình máy tính.',
    h: ['1. Công nghệ sợi điện cực siêu mảnh không gây tổn thương mô não', '2. Huấn luyện thuật toán giải mã ý định chuyển động của bệnh nhân', '3. Giúp người khiếm thị và bại liệt lấy lại khả năng giao tiếp xã hội'],
    p: [
      'Bệnh nhân chỉ cần tưởng tượng mình đang di chuyển bàn tay là con trỏ trên màn hình sẽ di chuyển chính xác theo ý muốn.',
      'Họ có thể tự gõ văn bản, lướt web, chơi cờ và trò chuyện với người thân mà không cần bất kỳ sự trợ giúp vật lý nào.',
      'Đây là một trong những bước tiến nhân văn vĩ đại nhất của sự kết hợp giữa kỹ thuật thần kinh học và khoa học máy tính.'
    ],
    tags: ['BCI', 'Neuralink', 'Biotech', 'Neuroscience'],
    featured: 0
  },
  {
    catId: 7,
    title: 'Kính hiển vi điện tử độ phân giải nguyên tử ứng dụng AI tái tạo cấu trúc protein 3D',
    slug: 'kinh-hien-vi-dien-tu-nguyen-tu-ai-tai-tao-protein',
    excerpt: 'Rút ngắn thời gian xác định cấu trúc phân tử sinh học từ nhiều tháng xuống còn vài ngày, hỗ trợ đắc lực cho ngành phát triển thuốc chữa bệnh.',
    h: ['1. Công nghệ chụp ảnh kính hiển vi điện tử nghiệm lạnh (Cryo-EM)', '2. Thuật toán AI lọc nhiễu và ghép nối hàng triệu ảnh chụp 2D', '3. Tìm ra cơ chế hoạt động của các loại virus nguy hiểm'],
    p: [
      'Mẫu sinh học được đông lạnh tức thì ở nhiệt độ âm sâu để giữ nguyên vẹn hình dáng tự nhiên của các phân tử protein sống.',
      'AI giúp phân loại và căn chỉnh hàng triệu bức ảnh chụp góc ngẫu nhiên để dựng nên mô hình không gian ba chiều với độ sắc nét tới từng nguyên tử.',
      'Các hãng dược phẩm có thể dựa vào mô hình này để thiết kế các phân tử thuốc gắn chặt vào mục tiêu bệnh lý một cách hoàn hảo.'
    ],
    tags: ['CryoEM', 'Biotech', 'DrugDiscovery', 'Science'],
    featured: 0
  },
  {
    catId: 7,
    title: 'Hệ thống cảm biến xúc giác nhân tạo (E-Skin) mang lại cảm giác chạm chân thực cho robot',
    slug: 'cam-bien-xuc-giac-nhan-tao-e-skin-cam-giac-cham-robot',
    excerpt: 'Lớp màng điện tử siêu mỏng có thể cảm nhận được áp lực, nhiệt độ và độ nhám của bề mặt, giúp robot cầm quả trứng mà không làm vỡ.',
    h: ['1. Cấu trúc vật liệu nano dẫn điện có khả năng co giãn linh hoạt', '2. Phản hồi tín hiệu xúc giác với độ trễ chỉ vài mili-giây', '3. Ứng dụng trong chân tay giả sinh học cho người khuyết tật'],
    p: [
      'Lớp da nhân tạo bao bọc quanh ngón tay robot chứa hàng nghìn điểm cảm biến siêu nhỏ mô phỏng cơ quan cảm giác của da người.',
      'Robot có thể nhận biết ngay lập tức nếu vật thể bắt đầu bị trượt khỏi tay và tự động tăng nhẹ lực bóp để giữ chặt lại.',
      'Người mang chi giả có thể cảm nhận lại được hơi ấm từ bàn tay của người thân khi nắm tay nhau dạo phố.'
    ],
    tags: ['ESkin', 'TactileSensing', 'Prosthetics', 'MaterialsScience'],
    featured: 0
  },
  {
    catId: 7,
    title: 'Robot bốn chân (Robodog) cứu hộ trong các thảm họa sập đổ công trình và động đất',
    slug: 'robot-bon-chan-robodog-cuu-ho-tham-hoa-dong-dat',
    excerpt: 'Khả năng giữ thăng bằng tuyệt vời trên đống đổ nát gồ ghề và chui vào những khe hẹp nguy hiểm để tìm kiếm hơi ấm người còn sống sót.',
    h: ['1. Thuật toán học chuyển động thích nghi với mọi bề mặt trơn trượt', '2. Trang bị cảm biến khí độc, camera hồng ngoại và loa đàm thoại hai chiều', '3. Giảm thiểu rủi ro tính mạng cho lực lượng cứu hỏa và cứu nạn'],
    p: [
      'Dù bị trượt ngã hay va đập mạnh, robot vẫn có thể tự đứng dậy và tiếp tục hành trình tìm kiếm mà không cần người can thiệp.',
      'Lực lượng cứu hộ có thể nói chuyện trực tiếp với nạn nhân mắc kẹt qua chiếc loa gắn trên thân robot để trấn an tinh thần họ.',
      'Thiết bị trở thành người tiên phong dũng cảm đi vào những khu vực rò rỉ khí gas độc hại mà con người không thể tiếp cận.'
    ],
    tags: ['RoboDog', 'RescueRobotics', 'Emergency', 'DisasterTech'],
    featured: 0
  },
  {
    catId: 7,
    title: 'Nông nghiệp chính xác với robot làm cỏ tự động bằng tia laser không dùng hóa chất',
    slug: 'nong-nghiep-chinh-xac-robot-lam-co-laser-khong-dung-hoa-chat',
    excerpt: 'Hệ thống thị giác máy tính nhận diện cỏ dại giữa các luống rau và bắn tia laser tiêu diệt từng cây cỏ với tốc độ 200 lần mỗi giây.',
    h: ['1. Giải bài toán bảo vệ môi trường và sức khỏe người tiêu dùng', '2. Vận hành liên tục ngày đêm bằng năng lượng mặt trời', '3. Giảm 90% chi phí thuê nhân công làm cỏ thủ công'],
    p: [
      'AI được huấn luyện để phân biệt chính xác từng chiếc lá của cây trồng nông nghiệp và các loài cỏ dại mọc xen kẽ.',
      'Tia laser chỉ đốt cháy đỉnh sinh trưởng của cây cỏ mà không làm tổn hại tới rễ cây rau và không làm xáo trộn lớp đất màu mỡ.',
      'Người tiêu dùng được thưởng thức những sản phẩm rau củ quả hữu cơ hoàn toàn sạch không tàn dư thuốc diệt cỏ độc hại.'
    ],
    tags: ['AgriTech', 'LaserRobotics', 'CleanFarming', 'Sustainability'],
    featured: 0
  },
  {
    catId: 7,
    title: 'In 3D kim loại trong công nghiệp vũ trụ: Chế tạo động cơ tên lửa nguyên khối siêu nhẹ',
    slug: 'in-3d-kim-loai-cong-nghiep-vu-tru-dong-co-ten-lua',
    excerpt: 'Công nghệ nấu chảy bột kim loại bằng laser cho phép tạo ra các kênh làm mát phức tạp bên trong vách buồng đốt tên lửa mà phương pháp tiện gọt không làm được.',
    h: ['1. Giảm 80% số lượng chi tiết linh kiện rời rạc', '2. Tối ưu hóa cấu trúc chịu lực giúp giảm trọng lượng tên lửa', '3. Rút ngắn chu kỳ chế tạo từ vài tháng xuống vài ngày'],
    p: [
      'Thay vì phải hàn hàng trăm ống dẫn nhỏ lại với nhau, toàn bộ buồng đốt được in thành một khối kim loại duy nhất không có mối hàn.',
      'Việc loại bỏ các mối hàn triệt tiêu hoàn toàn nguy cơ rò rỉ nhiên liệu dưới áp suất cực cao và nhiệt độ hàng nghìn độ C.',
      'Các công ty hàng không vũ trụ tư nhân nhờ đó có thể phóng tên lửa thường xuyên hơn với chi phí cạnh tranh vượt bậc.'
    ],
    tags: ['3DPrinting', 'SpaceTech', 'Aerospace', 'Manufacturing'],
    featured: 0
  },

  // 93 - 100: Lập trình & Khởi nghiệp (startups-coding)
  {
    catId: 8,
    title: 'Văn hóa khởi nghiệp tinh gọn thời đại AI: Nhóm 3 kỹ sư xây dựng sản phẩm phục vụ triệu người dùng',
    slug: 'khoi-nghiep-tinh-gon-thoi-dai-ai-nhom-3-ky-su-trieu-user',
    excerpt: 'Nhờ sự hỗ trợ của các công cụ AI hỗ trợ viết mã, thiết kế và hạ tầng điện toán đám mây serverless, các startup nhỏ có thể cạnh tranh sòng phẳng với các tập đoàn lớn.',
    h: ['1. Tối ưu hóa đòn bẩy công nghệ thay vì mở rộng nhân sự ồ ạt', '2. Tập trung tối đa vào việc giải quyết nỗi đau của khách hàng', '3. Duy trì dòng tiền dương ngay từ những tháng đầu tiên'],
    p: [
      'Một kỹ sư duy nhất nay có thể kiêm nhiệm cả vai trò lập trình frontend, backend và quản trị hạ tầng nhờ các trợ lý AI thông minh.',
      'Không cần văn phòng lộng lẫy, đội ngũ làm việc từ xa tập trung toàn bộ năng lượng vào việc lắng nghe phản hồi của người dùng.',
      'Mô hình kinh doanh tinh gọn giúp công ty có thể tồn tại bền bỉ và linh hoạt xoay chuyển hướng đi khi thị trường biến động.'
    ],
    tags: ['Startup', 'Bootstrapping', 'TechCulture', 'Entrepreneurship'],
    featured: 1
  },
  {
    catId: 8,
    title: 'Tại sao TypeScript trở thành ngôn ngữ bắt buộc phải có trong mọi dự án phần mềm hiện đại?',
    slug: 'tai-sao-typescript-tro-thanh-ngon-ngu-bat-buoc-hien-dai',
    excerpt: 'Hệ thống kiểu tĩnh chặt chẽ giúp phát hiện sớm các lỗi ngớ ngẩn ngay khi gõ phím, tự động hoàn thiện mã nguồn và nâng cao tính tự tài liệu hóa.',
    h: ['1. Tạm biệt lỗi kinh điển Cannot read properties of undefined', '2. Trải nghiệm Refactor mã nguồn quy mô lớn đầy tự tin', '3. Sự hỗ trợ hoàn hảo từ các trình biên tập mã nguồn hiện đại'],
    p: [
      'TypeScript bắt buộc lập trình viên phải suy nghĩ thấu đáo về cấu trúc dữ liệu trước khi bắt tay vào viết logic xử lý chi tiết.',
      'Khi thay đổi một trường dữ liệu trong cơ sở dữ liệu, trình biên dịch sẽ chỉ ra chính xác mọi vị trí bị ảnh hưởng trong dự án để bạn cập nhật.',
      'Đọc mã nguồn TypeScript giống như đọc một bản đặc tả kỹ thuật sống động, giúp các thành viên mới hòa nhập dự án cực nhanh.'
    ],
    tags: ['TypeScript', 'JavaScript', 'Coding', 'WebDev'],
    featured: 0
  },
  {
    catId: 8,
    title: 'Kiến trúc Monolith hiện đại vs Microservices: Đừng phức tạp hóa hạ tầng quá sớm',
    slug: 'kien-truc-monolith-hien-dai-vs-microservices-dung-phuc-tap',
    excerpt: 'Nhiều công ty công nghệ nhận ra việc chia nhỏ hệ thống thành hàng chục microservices quá sớm gây tốn kém chi phí vận hành và tăng độ trễ mạng không cần thiết.',
    h: ['1. Ảo tưởng về microservices và cái giá của sự phân tán', '2. Sức mạnh của kiến trúc Monolith dạng module hóa (Modular Monolith)', '3. Chỉ tách dịch vụ khi thực sự có nút thắt cổ chai về quy mô'],
    p: [
      'Việc gỡ lỗi một chức năng xuyên qua 5 dịch vụ mạng khác nhau phức tạp hơn gấp mười lần so với việc đọc một ngăn xếp lỗi trong một ứng dụng duy nhất.',
      'Một khối ứng dụng duy nhất được tổ chức ngăn nắp có thể phục vụ hàng triệu người dùng mỗi ngày trên một cụm máy chủ cấu hình vừa phải.',
      'Hãy bắt đầu đơn giản và tập trung vào sản phẩm trước khi phân tán hạ tầng kỹ thuật theo xu hướng nhất thời.'
    ],
    tags: ['Architecture', 'Monolith', 'Microservices', 'SoftwareEngineering'],
    featured: 0
  },
  {
    catId: 8,
    title: 'Kinh nghiệm gọi vốn tiền hạt giống (Pre-seed) cho các dự án khởi nghiệp công nghệ AI',
    slug: 'kinh-nghiem-goi-von-tien-hat-giong-pre-seed-startup-ai',
    excerpt: 'Các quỹ đầu tư mạo hiểm quan tâm điều gì nhất: Đội ngũ sáng lập, dữ liệu độc quyền hay khả năng giữ chân người dùng thực tế?',
    h: ['1. Vượt qua giai đoạn chỉ dựa vào một bản thuyết trình ý tưởng hào nhoáng', '2. Chứng minh hào lũy bảo vệ sản phẩm (Moat) trước các ông lớn công nghệ', '3. Lựa chọn nhà đầu tư mang lại giá trị đồng hành thực sự'],
    p: [
      'Nếu sản phẩm của bạn chỉ đơn thuần là một giao diện bọc ngoài API của OpenAI, nhà đầu tư sẽ từ chối vì không có rào cản kỹ thuật.',
      'Hãy cho thấy bạn có tập dữ liệu chuyên ngành đặc thù hoặc quy trình nghiệp vụ sâu sắc mà các đối thủ khác không thể sao chép nhanh.',
      'Một nhà đầu tư thông minh sẽ kết nối bạn với những khách hàng doanh nghiệp đầu tiên thay vì chỉ gửi tiền vào tài khoản ngân hàng.'
    ],
    tags: ['VentureCapital', 'Fundraising', 'AIStartup', 'Business'],
    featured: 0
  },
  {
    catId: 8,
    title: 'Học cách nói Không với tính năng thừa: Nghệ thuật xây dựng sản phẩm đơn giản mà cuốn hút',
    slug: 'nghe-thuat-xay-dung-san-pham-don-gian-noi-khong-tinh-nang-thua',
    excerpt: 'Càng nhiều nút bấm và cài đặt phức tạp, người dùng càng dễ bỏ cuộc; sản phẩm thành công là sản phẩm làm xuất sắc một việc cốt lõi duy nhất.',
    h: ['1. Cái bẫy của việc cố gắng làm hài lòng mọi ý kiến đóng góp', '2. Tìm ra tính năng ngôi sao mang lại 80% giá trị cho người dùng', '3. Can đảm gỡ bỏ những tính năng không còn ai sử dụng'],
    p: [
      'Mỗi tính năng mới thêm vào đều đi kèm chi phí bảo trì, nguy cơ sinh lỗi và làm rối rắm giao diện người dùng ban đầu.',
      'Hãy quan sát hành vi thực tế của khách hàng thay vì chỉ nghe những gì họ nói trong các cuộc khảo sát lý thuyết.',
      'Sự tinh tế của một sản phẩm công nghệ nằm ở những gì bạn quyết định loại bỏ chứ không phải những gì bạn nhồi nhét vào.'
    ],
    tags: ['ProductManagement', 'UXDesign', 'Simplicity', 'StartupTips'],
    featured: 0
  },
  {
    catId: 8,
    title: 'Xây dựng thương hiệu cá nhân cho lập trình viên: Viết blog công nghệ mở ra cơ hội sự nghiệp',
    slug: 'xay-dung-thuong-hieu-ca-nhan-lap-trinh-vien-viet-blog',
    excerpt: 'Cách truyền đạt kiến thức kỹ thuật qua các bài viết súc tích giúp bạn củng cố tư duy và thu hút sự chú ý của các nhà tuyển dụng hàng đầu.',
    h: ['1. Dạy lại cho người khác là cách học sâu sắc nhất', '2. Sở hữu một trang web cá nhân độc lập mang tên miền của chính mình', '3. Những lời mời làm việc từ xa đến từ các bài viết chất lượng'],
    p: [
      'Khi bạn giải thích được một khái niệm phức tạp bằng ngôn từ giản dị, bạn đã thực sự làm chủ kiến thức đó.',
      'Một trang blog kỹ thuật chất lượng có giá trị gấp mười lần một bản sơ yếu lý lịch CV truyền thống được tô vẽ.',
      'Cộng đồng công nghệ luôn trân trọng những cá nhân sẵn lòng chia sẻ kinh nghiệm vượt qua khó khăn để người khác đi sau học hỏi.'
    ],
    tags: ['CareerGrowth', 'Blogging', 'Developer', 'PersonalBranding'],
    featured: 0
  },
  {
    catId: 8,
    title: 'Phương pháp làm việc sâu (Deep Work): Bí quyết duy trì sự tập trung cao độ giữa thế giới phân tâm',
    slug: 'phuong-phap-deep-work-duy-tri-tap-trung-cao-do',
    excerpt: 'Cách tắt các thông báo tin nhắn tức thời, thiết lập khối thời gian 90 phút không gián đoạn để giải quyết các bài toán kỹ thuật hóc búa.',
    h: ['1. Tác hại khôn lường của việc chuyển đổi ngữ cảnh (Context Switching)', '2. Quy tắc hộp thời gian (Time Boxing) cho những nhiệm vụ quan trọng', '3. Tạo nghi thức bắt đầu buổi làm việc tập trung'],
    p: [
      'Mỗi khi bị phân tâm bởi một tin nhắn chat công việc, bộ não mất tới 20 phút để quay trở lại trạng thái tập trung ban đầu.',
      'Hãy dành những giờ đầu tiên của buổi sáng khi đầu óc còn minh mẫn nhất cho việc thiết kế kiến trúc hoặc viết mã nguồn cốt lõi.',
      'Khả năng tập trung sâu là một cơ bắp có thể rèn luyện được và là kỹ năng hiếm hoi có giá trị kinh tế cao nhất trong thời đại số.'
    ],
    tags: ['Productivity', 'DeepWork', 'Focus', 'Mindset'],
    featured: 0
  },
  {
    catId: 8,
    title: 'Hành trình xây dựng Oloka.net: Báo điện tử công nghệ thế hệ mới trên nền tảng Serverless',
    slug: 'hanh-trinh-xay-dung-oloka-net-bao-dien-tu-cong-nghe-serverless',
    excerpt: 'Tổng kết kiến trúc công nghệ hiện đại kết hợp Next.js 15, Payload CMS 3.0 và hệ sinh thái Cloudflare Edge để tạo ra cổng thông tin siêu tốc độ.',
    h: ['1. Tầm nhìn kết nối tin tức công nghệ và danh bạ công cụ hữu ích', '2. Triết lý thiết kế giao diện sáng sủa, tinh tế với hai màu thương hiệu Cyan & Coral', '3. Cam kết đồng hành cùng cộng đồng người yêu công nghệ Việt Nam'],
    p: [
      'Oloka.net ra đời với sứ mệnh mang đến nguồn thông tin công nghệ chính xác, khách quan và cập nhật nhất cho độc giả yêu thích trí tuệ nhân tạo.',
      'Sự kết hợp giữa tin tức chuyên sâu và các tiện ích liên kết thực tiễn như OmniVoice TTS, Oloka QR Studio giúp độc giả có thể áp dụng kiến thức vào thực tế ngay lập tức.',
      'Chúng tôi không ngừng tối ưu hóa hạ tầng và nội dung để mang lại trải nghiệm đọc bài nhanh nhất, mượt mà nhất trên mọi thiết bị.'
    ],
    tags: ['Oloka', 'CaseStudy', 'Serverless', 'WebDevelopment'],
    featured: 1
  }
];

console.log(`Loaded ${rawArticles.length} raw articles.`);

// Generate SQL Script
let sql = `-- Seed data for Oloka.net: Categories, Tools, and 100 Articles
-- Executed on Cloudflare D1

-- 1. Insert Categories
`;

for (const cat of categories) {
  sql += `INSERT OR REPLACE INTO categories (id, name, slug, description, color, updated_at, created_at) VALUES (${cat.id}, ${escapeSql(cat.name)}, ${escapeSql(cat.slug)}, ${escapeSql(cat.description)}, ${escapeSql(cat.color)}, datetime('now'), datetime('now'));\n`;
}

sql += `\n-- 2. Insert Tools\n`;
for (let i = 0; i < tools.length; i++) {
  const t = tools[i];
  sql += `INSERT OR REPLACE INTO tools (id, name, slug, url, short_description, icon, category, badge, featured, "order", updated_at, created_at) VALUES (${i + 1}, ${escapeSql(t.name)}, ${escapeSql(t.slug)}, ${escapeSql(t.url)}, ${escapeSql(t.short_description)}, ${escapeSql(t.icon)}, ${escapeSql(t.category)}, ${escapeSql(t.badge)}, ${t.featured}, ${t.order}, datetime('now'), datetime('now'));\n`;
}

sql += `\n-- 3. Insert 100 Articles\n`;
let tagInsertSql = '';
let tagCounter = 1;

for (let i = 0; i < rawArticles.length; i++) {
  const art = rawArticles[i];
  const articleId = i + 1;
  const image = images[i % images.length];
  const contentJson = makeLexicalJson(art.title, art.excerpt, art.h, art.p);

  // Generate realistic date between Sept 15, 2026 and Oct 7, 2026
  const daysAgo = Math.floor(i * 0.22);
  const dateObj = new Date('2026-10-07T12:00:00.000Z');
  dateObj.setDate(dateObj.getDate() - daysAgo);
  const dateStr = dateObj.toISOString();

  sql += `INSERT OR REPLACE INTO articles (id, title, slug, excerpt, category_id, cover_image_id, content, featured, status, published_at, updated_at, created_at, image_url) VALUES (${articleId}, ${escapeSql(art.title)}, ${escapeSql(art.slug)}, ${escapeSql(art.excerpt)}, ${art.catId}, NULL, ${escapeSql(contentJson)}, ${art.featured}, 'published', ${escapeSql(dateStr)}, datetime('now'), datetime('now'), ${escapeSql(image)});\n`;

  // Insert tags
  if (art.tags && art.tags.length > 0) {
    for (let tIdx = 0; tIdx < art.tags.length; tIdx++) {
      tagInsertSql += `INSERT OR REPLACE INTO articles_tags (_order, _parent_id, id, tag) VALUES (${tIdx + 1}, ${articleId}, 'tag_${articleId}_${tIdx + 1}', ${escapeSql(art.tags[tIdx])});\n`;
      tagCounter++;
    }
  }
}

sql += `\n-- 4. Insert Article Tags\n` + tagInsertSql;

const outputPath = path.resolve(__dirname, '..', 'seed_data.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`Generated seed_data.sql successfully with ${rawArticles.length} articles! Size: ${(sql.length / 1024).toFixed(1)} KB`);
