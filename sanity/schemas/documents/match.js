export default {
  name: 'match',
  type: 'document',
  title: 'Match',
  initialValue: () => ({
    name: 'Tresskamp - ' + new Date().toLocaleString(),
    gameStart: new Date().toISOString(),
  }),
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'gameStart',
      type: 'datetime',
      title: 'Game start',
    },
    {
      name: 'results',
      type: 'array',
      of: [{ type: 'playerResult' }],
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
      of: [{ type: 'reference', to: [{ type: 'tournament' }] }],
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
