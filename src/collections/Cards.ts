import type { CollectionConfig } from 'payload'

const calculateStatus = (data: any): string => {
  const checklist = data.checklist || {}
  const review = data.review || {}

  if (data.archived) {
    return 'archived'
  }

  if (checklist.published) {
    return 'done'
  }

  if (review.status === 'approved' && checklist.scheduledPost) {
    return 'scheduled'
  }

  if (review.status === 'approved') {
    return 'content'
  }

  if (review.status === 'declined') {
    return 'video-edit'
  }

  if (
    checklist.editFinish &&
    checklist.videoRendered &&
    checklist.finalVideoUploaded &&
    data.finalVideo
  ) {
    return 'review'
  }

  if (
    checklist.drawing &&
    checklist.drawingClips &&
    checklist.revealClipUploaded &&
    checklist.figure &&
    checklist.artwork
  ) {
    return 'video-edit'
  }

  if (
    checklist.sketch ||
    checklist.lineart ||
    checklist.colored ||
    checklist.drawing
  ) {
    return 'drawing'
  }

  return 'planning'
}

export const Cards: CollectionConfig = {
  slug: 'cards',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'plannedPostingDate', 'updatedAt'],
  },

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const mergedData = {
          ...(originalDoc || {}),
          ...(data || {}),
          checklist: {
            ...((originalDoc as any)?.checklist || {}),
            ...((data as any)?.checklist || {}),
          },
          review: {
            ...((originalDoc as any)?.review || {}),
            ...((data as any)?.review || {}),
          },
        }

        data.status = calculateStatus(mergedData)

        return data
      },
    ],
  },

  fields: [
    {
      name: 'name',
      label: 'Character Name',
      type: 'text',
      required: true,
    },

    {
      name: 'plannedPostingDate',
      label: 'Geplantes Posting',
      type: 'date',
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
      name: 'finalVideo',
      label: 'Finales Review-Video',
      type: 'upload',
      relationTo: 'media',
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
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'planning',
      admin: {
        readOnly: true,
      },
      options: [
        { label: 'In Planning', value: 'planning' },
        { label: 'Drawing', value: 'drawing' },
        { label: 'Video Schnitt', value: 'video-edit' },
        { label: 'In Review', value: 'review' },
        { label: 'Content Creator', value: 'content' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Done', value: 'done' },
        { label: 'Archived', value: 'archived' },
      ],
    },

    {
      name: 'checklist',
      label: 'Checklist',
      type: 'group',
      fields: [
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
            { label: 'In Review', value: 'none' },
            { label: 'Approved', value: 'approved' },
            { label: 'Declined', value: 'declined' },
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