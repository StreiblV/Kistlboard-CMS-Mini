import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'assetType', 'card', 'mimeType', 'filesize', 'updatedAt'],
  },

  access: {
    read: () => true,
    create: ({ req }) => true,
    update: ({ req }) => true,
    delete: ({ req }) => true,
  },

  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*'],
  },

  fields: [
    {
      name: 'card',
      label: 'Zugehörige Karte',
      type: 'relationship',
      relationTo: 'cards',
      required: false,
    },

    {
      name: 'assetType',
      label: 'Asset Type',
      type: 'select',
      required: true,
      defaultValue: 'other',
      options: [
        {
          label: 'Artwork',
          value: 'artwork',
        },
        {
          label: 'Figure / Silhouette',
          value: 'figure',
        },
        {
          label: 'Drawing Clip',
          value: 'drawing-clip',
        },
        {
          label: 'Reveal Clip',
          value: 'reveal-clip',
        },
        {
          label: 'Final Video',
          value: 'final-video',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },

    {
      name: 'alt',
      label: 'Alt Text / Beschreibung',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional. Sinnvoll für Bilder, bei Videos kann das leer bleiben.',
      },
    },

    {
      name: 'notes',
      label: 'Notizen',
      type: 'textarea',
      required: false,
    },
  ],
}