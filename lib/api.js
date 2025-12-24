import { defineQuery } from 'next-sanity'
import { getClient } from './sanity.client'

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
  const results = await getClient(preview).fetch(
    `*[_type == "player" && _id == $id]{
      ${playerFields}
    }`,
    { id }
  );
  return results;
}

export async function getMatch(id, preview) {
  const results = await getClient(preview).fetch(
    `*[_type in ["match", "cup"] && _id == $id]{
      ${matchFields}
    }`,
    { id }
  );
  return results;
}

export async function getTournament(id, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "tournament" && _id == $id]{
      ${tournamentFields}
    }`,
    { id }
  );
  return results;
}

export async function getAllMatchesForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "match"] | order(gameStart desc) [0...5] {
      ${matchFields}
    }`);
  return results;
}

export async function getAllMatches(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "match"] | order(gameStart desc){
      ${matchFields}
    }`);
  return results;
}

export async function getAllTournaments(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "tournament"] | order(end desc){
      ${tournamentFields}
    }`);
  return results;
}

export async function getAllPlayers(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "player"] | order(name desc){
      ${playerFields}
    }`);
  return results;
}

export async function getAllPlayersByYear(year, preview = false) {
  const yearStart = new Date(year, 1, 1)
  const yearEnd = new Date(year, 12, 31)
  const results = await getClient(preview)
    .fetch(`*[_type == "player"] | order(name desc){
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
    }`, { yearStart, yearEnd });
  return results;
}

export async function getAllPlayersByTournament(id, preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "player"] | order(name desc){
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
    }`, { id });
  return results;
}

export async function getMatchesByYear(preview) {
  const years = await getClient(preview)
    .fetch(`*[_type == "match"]{
      gameStart
    }`);

  const results = years.reduce((acc, curr) => {
    let year = (new Date(curr.gameStart)).getFullYear().toString()

    if (!acc.includes(year)) {
      return [...acc, year];
    }
    return acc
  }, [])

  return results.sort();
}
