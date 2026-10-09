import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'color'],
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
      label: 'Tên chuyên mục',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Đường dẫn (Slug)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả chuyên mục',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Màu nhận diện',
      defaultValue: '#46C7F0',
      options: [
        { label: 'Oloka Cyan (#46C7F0)', value: '#46C7F0' },
        { label: 'Oloka Coral (#F47D59)', value: '#F47D59' },
        { label: 'Purple (#A855F7)', value: '#A855F7' },
        { label: 'Emerald (#10B981)', value: '#10B981' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
