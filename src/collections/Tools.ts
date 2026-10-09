import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'url', 'badge', 'featured'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tên công cụ (Vd: OmniVoice, QR Generator, ElevenLabs...)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug định danh',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Hyperlink dẫn đến công cụ (Vd: https://voice.oloka.net hoặc link ngoài)',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Mô tả ngắn gọn về công cụ',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon hiển thị (Lucide name, vd: Mic, QrCode, Sparkles, Volume2, Globe...)',
      defaultValue: 'Sparkles',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Nhóm công cụ',
      required: true,
      options: [
        { label: 'Voice & Âm thanh (TTS, AI Voice)', value: 'voice' },
        { label: 'Tiện ích & QR Code', value: 'utility' },
        { label: 'Trí tuệ nhân tạo (AI Tools)', value: 'ai' },
        { label: 'Lập trình & Dev Tools', value: 'developer' },
      ],
      admin: {
        position: 'sidebar',
      },
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
      label: 'Ghim vào thanh Tiện ích nổi bật trên Trang chủ',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Thứ tự ưu tiên',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
