import type { CollectionConfig } from 'payload'

export const Cards: CollectionConfig = {
  slug: 'cards',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'part', 'plannedPostingDate', 'archived', 'updatedAt'],
  },

  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      return {
        board: {
          in: req.user?.boards || [],
        },
      }
    },

    create: ({ req }) => {
      return Boolean(req.user)
    },

    update: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      return {
        board: {
          in: req.user?.boards || [],
        },
      }
    },

    delete: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      return {
        board: {
          in: req.user?.boards || [],
        },
      }
    },
  },

  fields: [
    {
      name: 'name',
      label: 'Character Name',
      type: 'text',
      required: true,
    },

    {
      name: 'board',
      label: 'Board',
      type: 'relationship',
      relationTo: 'boards',
      required: true,
    },

    {
      name: 'plannedPostingDate',
      label: 'Geplantes Posting',
      type: 'date',
    },

    {
      name: 'part',
      label: 'Part',
      type: 'text',
    },

    {
      name: 'emojiHints',
      label: 'Emoji-Hints',
      type: 'text',
    },

    {
      name: 'gifWish',
      label: 'GIF-Wunsch',
      type: 'text',
    },

    {
      name: 'textWishes',
      label: 'Textänderungen / Wünsche',
      type: 'textarea',
    },

    {
      name: 'changeRequests',
      label: 'Änderungswünsche / Review-Kommentare',
      type: 'textarea',
    },

    {
      name: 'caption',
      label: 'Caption',
      type: 'textarea',
    },

    {
      name: 'finalVideo',
      label: 'Finales Review-Video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Das Video, das im Review-Player angezeigt wird. Bei Decline wird es später über Angular wieder entfernt, bleibt aber weiterhin unter Zugehörige Medien/Clips sichtbar.',
      },
    },

    {
      name: 'assets',
      label: 'Zugehörige Medien / Clips',
      type: 'join',
      collection: 'media',
      on: 'card',
      defaultLimit: 50,
      admin: {
        defaultColumns: ['filename', 'assetType', 'mimeType', 'updatedAt'],
      },
    },

    {
      name: 'checklist',
      label: 'Checklist',
      type: 'group',
      fields: [
        {
          name: 'workflowStarted',
          label: 'Workflow gestartet',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Wird über den Start-Workflow-Button im Kistlboard gesetzt.',
          },
        },
        {
          type: 'collapsible',
          label: 'Artist',
          fields: [
            {
              name: 'sketch',
              label: 'Sketch Finished',
              type: 'checkbox',
            },
            {
              name: 'lineart',
              label: 'LineArt Finished',
              type: 'checkbox',
            },
            {
              name: 'colored',
              label: 'Coloring Finished',
              type: 'checkbox',
            },
            {
              name: 'drawing',
              label: 'Artwork Finished',
              type: 'checkbox',
            },
          ],
        },

        {
          type: 'collapsible',
          label: 'Uploads',
          fields: [
            {
              name: 'drawingClips',
              label: 'Drawing Clips Uploaded',
              type: 'checkbox',
            },
            {
              name: 'revealClipUploaded',
              label: 'Reveal Clip Uploaded',
              type: 'checkbox',
            },
            {
              name: 'figure',
              label: 'Figure Uploaded',
              type: 'checkbox',
            },
            {
              name: 'artwork',
              label: 'Artwork Uploaded',
              type: 'checkbox',
            },
            {
              name: 'finalVideoUploaded',
              label: 'Final Video Uploaded',
              type: 'checkbox',
            },
          ],
        },

        {
          type: 'collapsible',
          label: 'Video',
          fields: [
            {
              name: 'speedartClip',
              label: 'Speedart Sequence Edited',
              type: 'checkbox',
            },
            {
              name: 'revealSequenceEdited',
              label: 'Reveal Sequence Edited',
              type: 'checkbox',
            },
            {
              name: 'editFinish',
              label: 'Editing Finished',
              type: 'checkbox',
            },
            {
              name: 'videoRendered',
              label: 'Video Rendered',
              type: 'checkbox',
            },
          ],
        },

        {
          type: 'collapsible',
          label: 'Social',
          fields: [
            {
              name: 'captionWritten',
              label: 'Caption Written',
              type: 'checkbox',
            },
            {
              name: 'scheduledPost',
              label: 'Post Scheduled',
              type: 'checkbox',
            },
            {
              name: 'published',
              label: 'Published',
              type: 'checkbox',
            },
          ],
        },
      ],
    },

    {
      name: 'review',
      label: 'Review',
      type: 'group',
      fields: [
        {
          name: 'status',
          label: 'Review Status',
          type: 'select',
          defaultValue: 'none',
          options: [
            {
              label: 'Kein Review / In Review',
              value: 'none',
            },
            {
              label: 'Approved',
              value: 'approved',
            },
            {
              label: 'Declined',
              value: 'declined',
            },
          ],
        },
        {
          name: 'comment',
          label: 'Review-Kommentar / Änderungswunsch',
          type: 'textarea',
        },
      ],
    },

    {
      name: 'archived',
      label: 'Archiviert',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}