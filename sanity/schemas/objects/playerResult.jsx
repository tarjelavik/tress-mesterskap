let _ = require('lodash')
import { PlayerResultItem } from './PlayerResultItem'

export default {
  title: 'Player result',
  name: 'playerResult',
  type: 'object',
  components: {
    item: PlayerResultItem,
  },
  fields: [
    {
      name: 'player',
      title: 'Player',
      type: 'reference',
      to: [{ type: 'player' }],
    },
    {
      name: 'isWinner',
      title: 'Winner?',
      type: 'boolean',
    },
    {
      name: 'score',
      type: 'array',
      title: 'Score',
      initialValue: [0, 0, 0, 0, 0],
      of: [{ type: 'number' }],
      validation: Rule => Rule.max(5),
    },
  ],
  preview: {
    select: {
      title: 'player.name',
      score: 'score',
      winner: 'isWinner',
    },
    prepare(selection) {
      const { title, score, winner } = selection
      const scoreArray = score || [0, 0, 0, 0, 0]
      const scoreString = scoreArray.join(', ')
      const scoreTotal = _.sum(scoreArray)
      return {
        title: `${scoreString} = ${scoreTotal}`,
        subtitle: winner === true ? `⭐ ${title}` : `${title}`,
      }
    },
  },
}
