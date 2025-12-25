/* eslint-disable react/jsx-key */
import Link from "next/link";
import initials from 'initials';
import { GiCard5Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs, GiCard5Diamonds, GiCard5Hearts, GiCard9Clubs, GiCard9Diamonds, GiCard9Hearts, GiCard3Spades, GiCard3Diamonds, GiCard3Clubs, GiCard4Diamonds, GiCard6Diamonds, GiCard7Diamonds } from 'react-icons/gi';
import { urlForImage } from '@/lib/sanity.image';
import Image from 'next/image';

export default function MatchTable({ data }: { data: any }) {
  const iconsSize = '22px'
  const headers = [
    "",
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard5Hearts size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={iconsSize} />
        <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard9Hearts size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard5Hearts size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
      <div className='flex'>
        <GiCard9Clubs size={iconsSize} />
        <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard5Hearts size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={iconsSize} />
        <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard9Hearts size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
      <div className='flex'>
        <GiCard3Diamonds size={iconsSize} />
        <GiCard3Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard3Spades size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard9Clubs size={iconsSize} />
        <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
      <div className='flex'>
        <GiCard4Diamonds size={iconsSize} />
        <GiCard5Diamonds size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard6Diamonds size={iconsSize} style={{ marginLeft: '-2px' }} />
        <GiCard7Diamonds size={iconsSize} style={{ marginLeft: '-2px' }} />
      </div>
    </div>,
    <div className='flex'>
      <div className='flex flex-col'>
        <div className='flex'>
          <GiCard5Diamonds size={iconsSize} />
          <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
          <GiCard5Hearts size={iconsSize} style={{ marginLeft: '-2px' }} />
        </div>
        <div className='flex'>
          <GiCard9Diamonds size={iconsSize} />
          <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
          <GiCard9Hearts size={iconsSize} style={{ marginLeft: '-2px' }} />
        </div>
        <div className='flex'>
          <GiCard9Clubs size={iconsSize} />
          <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-2px' }} />
          <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-2px' }} />
          <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-2px' }} />
        </div>
      </div>
      <div className='self-center'>+1</div>
    </div>,
    "Totalt",
  ];

  const headerRow = (
    <thead>
      <tr>
        {headers.map((head, index) => (
          <th
            style={{ verticalAlign: "bottom" }}
            className="px-2 py-1"
            key={index}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );

  const results = data || [];

  // Filter out results without players and handle null/undefined cases
  const validResults = results.filter((result: any) =>
    result && result.player && result.player._id
  );

  const getScoreDisplay = (round: number) => {
    if (round >= 90) return `${round} 🔥`;
    if (round === 0) return `${round} 💎`;
    return `${round}`;
  };

  const getBackgroundColor = (isWinner: boolean, round: number) => {
    if (round === 0) return 'bg-green-100 dark:bg-green-900/30';
    if (round > 90) return 'bg-red-100 dark:bg-red-900/30';
    return '';
  };

  // Show message if no valid results
  if (validResults.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500 dark:text-gray-400">
        <p>No players added yet. Add players to start tracking scores.</p>
      </div>
    );
  }

  const playerColumn = validResults.map((result: any, index: number) => {
    const playerId = result.player?._id || `player-${index}`;
    const playerName = result.player?.name || 'Unknown Player';
    const score = result.score || [];

    return (
      <tr key={playerId} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
        <td className="border dark:border-gray-700 px-2 sm:py-1">
          <div className="flex flex-row gap-x-3 flex-nowrap">
            {result?.player?.mainRepresentation ? (
              <Image
                alt=""
                className="rounded-full object-contain"
                src={urlForImage(result.player.mainRepresentation).height(25).width(25).url()}
                width={24}
                height={24}
              />
            ) : (
              <div className="rounded-full object-contain bg-gray-200 dark:bg-gray-700 w-6 h-6"></div>
            )}
            {result.player?._id ? (
              <Link
                href={`/players/${result.player._id}`}
                className="dark:text-gray-100"
              >
                <span className='hidden sm:inline'>{playerName} {result.isWinner && '⭐'}</span>
                <span className='sm:hidden'>{initials(playerName)} {result.isWinner && '⭐'}</span>
              </Link>
            ) : (
              <span className="dark:text-gray-100">
                <span className='hidden sm:inline'>{playerName} {result.isWinner && '⭐'}</span>
                <span className='sm:hidden'>{initials(playerName)} {result.isWinner && '⭐'}</span>
              </span>
            )}
          </div>
        </td>
        {score.map((round: any, roundIndex: any) => (
          <td className={`border dark:border-gray-700 px-2 py-1 text-sm dark:text-gray-100 ${getBackgroundColor(result.isWinner, round)}`} key={roundIndex}>
            {getScoreDisplay(round)}
          </td>
        ))}
        <td className={`border dark:border-gray-700 px-2 py-1 text-sm dark:text-gray-100 ${result.isWinner ? 'font-bold text-yellow-900 dark:text-yellow-100 bg-yellow-300 dark:bg-yellow-600' : ''}`}>
          {score.reduce((a: number, b: number) => a + b, 0)}
        </td>
      </tr>
    );
  });

  return (
    <div className="w-full overflow-scroll">
      <table className="table-auto ">
        {headerRow}
        <tbody>{playerColumn}</tbody>
      </table>
    </div>
  );
}
