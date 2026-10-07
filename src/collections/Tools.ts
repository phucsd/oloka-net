import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'badge', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tên công cụ',
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
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Mô tả ngắn',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon (Lucide name, vd: Mic, QrCode, Sparkles, Volume2)',
      defaultValue: 'Sparkles',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Nhóm công cụ',
      required: true,
      options: [
        { label: 'Voice & Âm thanh', value: 'voice' },
        { label: 'Tiện ích & Mã hóa', value: 'utility' },
        { label: 'AI & Sáng tạo', value: 'ai' },
        { label: 'Lập trình & Dev', value: 'developer' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'route',
      type: 'text',
      required: true,
      label: 'Đường dẫn liên kết (Vd: /tools/tts, /tools/qr-code)',
    },
    {
      name: 'badge',
      type: 'select',
      label: 'Huy hiệu',
      options: [
        { label: 'Hot', value: 'Hot' },
        { label: 'Mới (New)', value: 'New' },
        { label: 'Miễn phí (Free)', value: 'Free' },
        { label: 'Phổ biến (Popular)', value: 'Popular' },
      ],
      defaultValue: 'Free',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Ghim nổi bật trên Trang chủ',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Thứ tự hiển thị',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
