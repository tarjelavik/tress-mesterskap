export default {
  name: 'tournament',
  type: 'document',
  title: 'Tournament',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'start',
      type: 'date',
      title: 'Tournament start'
    },
    {
      name: 'end',
      type: 'date',
      title: 'Tournament end'
    },
    {
      name: 'games',
      title: 'Spill',
      description: 'Spill eller cup',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'match' },
            { type: 'cup' },

          ]
        }
      ]
    },
    {
      name: 'mainRepresentation',
      type: 'image',
      title: 'Image',
      description: 'Image of match',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainRepresentation'
    }
  }
}
