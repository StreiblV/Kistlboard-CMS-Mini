import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role', 
      label: 'Role',
      type: 'select',
      defaultValue: 'client',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Client',
          value: 'client',
        },
      ],
      required: true,
    },
    {
      name: 'boards',
      label: 'Boards',
      type: 'relationship',
      relationTo: 'boards',
      hasMany: true,
    },
  ],
}
