const fs = require('fs');
const path = require('path');

// Read rawArticles and categories from generate_seed.cjs
const seedScriptContent = fs.readFileSync(path.resolve(__dirname, 'generate_seed.cjs'), 'utf8');

// We can execute a generator function that builds the TypeScript file
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

// Extract rawArticles
const rawArticlesMatch = seedScriptContent.match(/const rawArticles = (\[[\s\S]*?\]);\s*console\.log/);
if (!rawArticlesMatch) {
  console.error('Could not find rawArticles');
  process.exit(1);
}

const rawArticles = eval(rawArticlesMatch[1]);
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

const articlesData = rawArticles.map((art, idx) => {
  const cat = categories.find(c => c.id === String(art.catId)) || categories[0];
  const daysAgo = Math.floor(idx * 0.22);
  const dateObj = new Date('2026-10-07T12:00:00.000Z');
  dateObj.setDate(dateObj.getDate() - daysAgo);
  const dateStr = dateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return {
    id: String(idx + 1),
    title: art.title,
    slug: art.slug,
    category: cat.slug,
    categoryName: cat.name,
    categoryColor: cat.color,
    excerpt: art.excerpt,
    imageUrl: images[idx % images.length],
    publishedAt: dateStr,
    readTime: `${Math.floor(Math.random() * 3) + 4} phút đọc`,
    featured: Boolean(art.featured),
    headings: art.h,
    paragraphs: art.p,
    tags: art.tags || ['Công nghệ', 'AI']
  };
});

const tsContent = `// Auto-generated data file containing pre-seeded 100 articles & categories for Oloka.net

export interface ArticleItem {
  id: string
  title: string
  slug: string
  category: string
  categoryName: string
  categoryColor: string
  excerpt: string
  imageUrl: string
  publishedAt: string
  readTime: string
  featured: boolean
  headings: string[]
  paragraphs: string[]
  tags: string[]
}

export interface CategoryItem {
  id: string
  slug: string
  name: string
  color: string
  description: string
}

export const CATEGORIES: CategoryItem[] = ${JSON.stringify(categories, null, 2)};

export const ALL_ARTICLES: ArticleItem[] = ${JSON.stringify(articlesData, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/lib/news-data.ts'), tsContent, 'utf8');
console.log('Successfully written src/lib/news-data.ts with', articlesData.length, 'articles');
