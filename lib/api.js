import { defineQuery } from 'next-sanity'
import { sanityFetch } from './sanity.client'

const matchFields = `
  _id,
  _type,
  name,
  gameStart,
  results[]{
    player->{_id, name, mainRepresentation},
    isWinner,
    score
  },
  description,
  mainRepresentation
`;

const tournamentFields = `
  _id,
  name,
  gameStart,
  "matches": *[_type in ['match', 'cup'] && references(^._id)]| order(gameStart asc) {
    ${matchFields}
  },
  description,
  mainRepresentation
`;

const playerFields = `
  _id,
  name,
  mainRepresentation,
  "games": *[_type=='match' && references(^._id)]| order(gameStart asc) {
    _id,
    name,
    gameStart,
    results[]{
      player, 
      isWinner,
      score
    }
  }
`;

export const PLAYER_QUERY = defineQuery(`
*[_type == "player" && _id == $id]{
  ${playerFields}
}`)

export const PLAYERS_QUERY = defineQuery(`
*[_type == "player"] | order(name asc){
  _id,
  name,
  mainRepresentation,
  "games": count(*[_type=='match' && references(^._id)])
}`)

export const MATCHES_QUERY = defineQuery(`
  *[_type == "match" && (gameStart < $lastGameStart )] | order(gameStart desc) [0...25]{
    ${matchFields}
  }`)

export const PLAYERS_BY_YEAR_QUERY = defineQuery(`*[_type == "player"] | order(name desc){
  _id,
  name,
  mainRepresentation,
  "games": *[_type=='match' && (gameStart >= $yearStart && gameStart < $yearEnd) && references(^._id)]| order(gameStart asc) {
    _id,
    name,
    gameStart,
    results[] {
      player, 
      isWinner,
      score
    }
  }
}`)

export async function getPlayer(id, preview) {
  const results = await sanityFetch({
    query: `*[_type == "player" && _id == $id]{
      ${playerFields}
    }`,
    params: { id },
    tags: [`player:${id}`, 'player', 'match'],
    preview,
  });
  return results;
}

export async function getMatch(id, preview) {
  const results = await sanityFetch({
    query: `*[_type in ["match", "cup"] && _id == $id]{
      ${matchFields}
    }`,
    params: { id },
    tags: [`match:${id}`, 'match', 'cup', 'player'],
    preview,
  });
  return results;
}

export async function getTournament(id, preview) {
  const results = await sanityFetch({
    query: `*[_type == "tournament" && _id == $id]{
      ${tournamentFields}
    }`,
    params: { id },
    tags: [`tournament:${id}`, 'tournament', 'match', 'cup', 'player'],
    preview,
  });
  return results;
}

export async function getAllMatchesForHome(preview) {
  const results = await sanityFetch({
    query: `*[_type == "match"] | order(gameStart desc) [0...5] {
      ${matchFields}
    }`,
    tags: ['match', 'player'],
    preview,
  });
  return results;
}

export async function getAllMatches(preview) {
  const results = await sanityFetch({
    query: `*[_type == "match"] | order(gameStart desc){
      ${matchFields}
    }`,
    tags: ['match', 'player'],
    preview,
  });
  return results;
}

export async function getAllTournaments(preview) {
  const results = await sanityFetch({
    query: `*[_type == "tournament"] | order(end desc){
      ${tournamentFields}
    }`,
    tags: ['tournament', 'match', 'cup', 'player'],
    preview,
  });
  return results;
}

export async function getAllPlayers(preview) {
  const results = await sanityFetch({
    query: `*[_type == "player"] | order(name desc){
      ${playerFields}
    }`,
    tags: ['player', 'match'],
    preview,
  });
  return results;
}

export async function getAllPlayersByYear(year, preview) {
  const yearStart = new Date(year, 1, 1)
  const yearEnd = new Date(year, 12, 31)
  const results = await sanityFetch({
    query: `*[_type == "player"] | order(name desc){
      _id,
      name,
      mainRepresentation,
      "games": *[_type=='match' && (gameStart >= $yearStart && gameStart < $yearEnd) && references(^._id)]| order(gameStart asc) {
        _id,
        name,
        gameStart,
        results[]{
          player, 
          isWinner,
          score
        }
      }
    }`,
    params: { yearStart, yearEnd },
    tags: ['player', 'match'],
    preview,
  });
  return results;
}

export async function getAllPlayersByTournament(id, preview) {
  const results = await sanityFetch({
    query: `*[_type == "player"] | order(name desc){
      _id,
      name,
      mainRepresentation,
      "games": *[_type in ['match'] && references(^._id) && references($id)]| order(gameStart asc) {
        _id,
        name,
        gameStart,
        results[]{
          player, 
          isWinner,
          score
        }
      }
    }`,
    params: { id },
    tags: ['player', 'match', 'tournament'],
    preview,
  });
  return results;
}

export async function getMatchesByYear(preview) {
  const years = await sanityFetch({
    query: `*[_type == "match"]{
      gameStart
    }`,
    tags: ['match'],
    preview,
  });

  const results = years.reduce((acc, curr) => {
    let year = (new Date(curr.gameStart)).getFullYear().toString()

    if (!acc.includes(year)) {
      return [...acc, year];
    }
    return acc
  }, [])

  return results.sort();
}
