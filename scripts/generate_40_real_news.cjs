const fs = require('fs');
const path = require('path');

// 8 Core Categories
const categories = [
  { id: '1', slug: 'ai-news', name: 'Tin tức AI', color: '#46C7F0', description: 'Cập nhật chuyển động nhanh nhất về các mô hình ngôn ngữ lớn, AI đa phương thức và đột phá trí tuệ nhân tạo toàn cầu.' },
  { id: '2', slug: 'tech-trends', name: 'Xu hướng Công nghệ', color: '#F47D59', description: 'Điện toán đám mây, Edge computing, bán dẫn thế hệ mới và các xu hướng công nghệ tương lai.' },
  { id: '3', slug: 'ai-tools', name: 'Công cụ AI & Tiện ích', color: '#A855F7', description: 'Khám phá và thử nghiệm các công cụ AI hỗ trợ sáng tạo nội dung, giọng nói, đồ họa và lập trình.' },
  { id: '4', slug: 'tutorials', name: 'Thủ thuật & Hướng dẫn', color: '#10B981', description: 'Cẩm nang thực chiến, mẹo tối ưu prompt, triển khai hệ thống và tích hợp API hiệu quả.' },
  { id: '5', slug: 'reviews', name: 'Đánh giá & Trải nghiệm', color: '#3B82F6', description: 'Đánh giá khách quan các sản phẩm công nghệ, dịch vụ phần mềm SaaS và thiết bị thông minh.' },
  { id: '6', slug: 'cybersecurity', name: 'An ninh mạng & Dữ liệu', color: '#EC4899', description: 'Bảo mật thông tin, an toàn dữ liệu trên đám mây, phòng chống tấn công mạng và quyền riêng tư.' },
  { id: '7', slug: 'robotics-hardware', name: 'Phần cứng & Robotics', color: '#F59E0B', description: 'Robot hình người, thiết bị AI phần cứng, vi xử lý NPU và sự phát triển của tự động hóa.' },
  { id: '8', slug: 'startups-coding', name: 'Lập trình & Khởi nghiệp', color: '#6366F1', description: 'Kinh nghiệm lập trình, văn hóa kỹ thuật, kiến trúc hệ thống và hệ sinh thái công nghệ khởi nghiệp.' }
];

// Load all 4 parts
const p1 = require('./data/articles_part1.cjs');
const p2 = require('./data/articles_part2.cjs');
const p3 = require('./data/articles_part3.cjs');
const p4 = require('./data/articles_part4.cjs');

const all40Articles = [...p1, ...p2, ...p3, ...p4];
console.log(`Loaded ${all40Articles.length} curated articles!`);

if (all40Articles.length !== 40) {
  console.warn(`Warning: Expected 40 articles, got ${all40Articles.length}`);
}

// 1. Generate src/lib/news-data.ts
const tsContent = `// Curated Tech Journalism Dataset for Oloka.net (40 Real Articles with Full Depth & Real Sources)

export interface ArticleQuote {
  text: string
  author: string
  title?: string
}

export interface ArticleSection {
  heading?: string
  paragraphs: string[]
  quote?: ArticleQuote
}

export interface ArticleReference {
  title: string
  source: string
  url?: string
}

export interface ArticleItem {
  id: string
  title: string
  slug: string
  category: string
  categoryName: string
  categoryColor: string
  excerpt: string
  imageUrl: string
  imageCaption?: string
  author: string
  source: {
    name: string
    url?: string
  }
  publishedAt: string
  readTime: string
  featured: boolean
  keyTakeaways: string[]
  sections: ArticleSection[]
  references: ArticleReference[]
  tags: string[]
  // Backward compatibility
  headings?: string[]
  paragraphs?: string[]
}

export interface CategoryItem {
  id: string
  slug: string
  name: string
  color: string
  description: string
}

export const CATEGORIES: CategoryItem[] = ${JSON.stringify(categories, null, 2)};

export const ALL_ARTICLES: ArticleItem[] = ${JSON.stringify(all40Articles, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/lib/news-data.ts'), tsContent, 'utf8');
console.log('Successfully wrote src/lib/news-data.ts with 40 real curated articles!');

// 2. Generate seed_40_real_articles.sql for Cloudflare D1
function escapeSql(str) {
  if (typeof str !== 'string') return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

function makeLexicalJson(art) {
  const children = [
    {
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          mode: 'normal',
          text: art.excerpt,
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

  for (const sec of art.sections) {
    if (sec.heading) {
      children.push({
        type: 'heading',
        tag: 'h2',
        format: '',
        indent: 0,
        version: 1,
        children: [{
          mode: 'normal',
          text: sec.heading,
          type: 'text',
          style: '',
          detail: 0,
          format: 1,
          version: 1
        }],
        direction: 'ltr'
      });
    }

    for (const p of sec.paragraphs) {
      children.push({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [{
          mode: 'normal',
          text: p,
          type: 'text',
          style: '',
          detail: 0,
          format: 0,
          version: 1
        }],
        direction: 'ltr'
      });
    }

    if (sec.quote) {
      children.push({
        type: 'quote',
        format: '',
        indent: 0,
        version: 1,
        children: [{
          mode: 'normal',
          text: `"${sec.quote.text}" — ${sec.quote.author}${sec.quote.title ? ` (${sec.quote.title})` : ''}`,
          type: 'text',
          style: '',
          detail: 0,
          format: 2,
          version: 1
        }],
        direction: 'ltr'
      });
    }
  }

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

let sql = `-- Seed 40 Real Curated Articles for Oloka.net\nDELETE FROM articles;\n\n`;
for (let i = 0; i < all40Articles.length; i++) {
  const art = all40Articles[i];
  const cat = categories.find(c => c.slug === art.category) || categories[0];
  const contentJson = makeLexicalJson(art);
  const articleId = i + 1;

  sql += `INSERT INTO articles (id, title, slug, excerpt, category_id, cover_image_id, content, featured, status, published_at, updated_at, created_at, image_url) VALUES (${articleId}, ${escapeSql(art.title)}, ${escapeSql(art.slug)}, ${escapeSql(art.excerpt)}, ${cat.id}, NULL, ${escapeSql(contentJson)}, ${art.featured ? 1 : 0}, 'published', datetime('now'), datetime('now'), datetime('now'), ${escapeSql(art.imageUrl)});\n`;
}

fs.writeFileSync(path.resolve(__dirname, '../seed_40_real_articles.sql'), sql, 'utf8');
console.log('Successfully wrote seed_40_real_articles.sql with 40 real curated articles!');
