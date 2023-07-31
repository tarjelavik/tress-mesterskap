export default {
  title: 'Runde',
  name: 'round',
  type: 'object',
  fields: [
    {
      name: 'hasType',
      title: 'Hvilken runde?',
      type: 'string',
      options: {
        list: [
          { value: 'quaterFinal', title: 'Kvartfinale' },
          { value: 'semiFinal', title: 'Semifinale' },
          { value: 'bronzeFinal', title: 'Bronsefinale' },
          { value: 'final', title: 'Finale' },
        ]
      }
    },
    {
      name: 'games',
      title: 'Spill',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'match' }]
        },
      ]
    },
  ],
  preview: {
    select: {
      title: 'hasType',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
      }
    },
  },
}
