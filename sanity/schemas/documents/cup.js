export default {
  name: 'cup',
  type: 'document',
  title: 'Cup',
  initialValue: () => ({
    name: 'Cup - ' + new Date().toLocaleString(),
  }),
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'start',
      type: 'date',
      title: 'Cup start'
    },
    {
      name: 'end',
      type: 'date',
      title: 'Cup end'
    },
    {
      name: 'rounds',
      type: 'array',
      of: [
        { type: 'round' }
      ],
      options: {
        modal: 'fullscreen',
      },
    },
    {
      name: 'mainRepresentation',
      type: 'image',
      title: 'Image',
      description: 'Image of match',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'partOf',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'tournament' }]
        }
      ],
      options: {
        modal: 'popover',
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainRepresentation',
    },
  },
}
