import type { CollectionConfig } from 'payload'
import { getAccessibleBoardIDs } from '../access/getAccessibleBoardIDs'

export const Boards: CollectionConfig = {
  slug: 'boards',

  admin: {
    useAsTitle: 'name',
  },

  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      return {
        id: {
          in: getAccessibleBoardIDs(req.user),
        },
      }
    },

    create: ({ req }) => {
      return req.user?.role === 'admin'
    },

    update: ({ req }) => {
      return req.user?.role === 'admin'
    },

    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'description',
      type: 'textarea',
    },
  ],
}