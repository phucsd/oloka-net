import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tiêu đề bài viết',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (Đường dẫn)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Tóm tắt bài viết',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories' as any,
      label: 'Chuyên mục',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh đại diện (Tải lên)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Hoặc URL ảnh bìa trực tiếp',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung chi tiết',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Thẻ bài viết (Tags)',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Bài viết nổi bật',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái',
      defaultValue: 'published',
      options: [
        { label: 'Bản nháp', value: 'draft' },
        { label: 'Đã xuất bản', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày xuất bản',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'URL Chuẩn (Canonical URL)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'targetRegion',
      type: 'select',
      label: 'Vùng địa lý mục tiêu (GEO Region)',
      defaultValue: 'VN',
      options: [
        { label: 'Toàn quốc (Việt Nam - VN)', value: 'VN' },
        { label: 'Hà Nội & Miền Bắc (VN-HN)', value: 'VN-HN' },
        { label: 'TP. Hồ Chí Minh & Miền Nam (VN-SG)', value: 'VN-SG' },
        { label: 'Đà Nẵng & Miền Trung (VN-DN)', value: 'VN-DN' },
        { label: 'Toàn cầu / Quốc tế (GLOBAL)', value: 'GLOBAL' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'geoPlace',
      type: 'text',
      label: 'Địa danh gắn thẻ (GEO Placename)',
      defaultValue: 'Việt Nam',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'geoCoordinates',
      type: 'text',
      label: 'Tọa độ địa lý (Lat, Long)',
      defaultValue: '21.0285, 105.8542',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
