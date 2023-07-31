import match from './documents/match'
import tournament from './documents/tournament'
import page from './documents/page'
import player from './documents/player'
import siteConfig from './documents/siteConfig'
import route from './documents/route'
import embedHTML from './objects/embedHTML'
import figure from './objects/figure'
import internalLink from './objects/internalLink'
import link from './objects/link'
import portableText from './objects/portableText'
import simplePortableText from './objects/simplePortableText'
import textSection from './objects/textSection'
import playerResult from './objects/playerResult'
import cup from './documents/cup'
import round from './objects/round'

import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    match,
    cup,
    tournament,
    page,
    player,
    siteConfig,
    // Objects
    embedHTML,
    figure,
    internalLink,
    link,
    playerResult,
    round,
    portableText,
    simplePortableText,
    textSection,
    route
  ]
}
