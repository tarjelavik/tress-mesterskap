import { getWinsAndExpected } from "../lib/functions";

export default function MatchesWon({ player, games }) {
  const data = getWinsAndExpected(player, games);
  return (
    <>
      <p className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
        {data.wins} <span className="text-lg text-gray-500"> av {games.length} slag </span>
      </p>
      <p className="text-green-500 text-sm">
        <span className="font-bold">Forventet: {data.expectedWins}</span>
      </p>
    </>
  );
}
