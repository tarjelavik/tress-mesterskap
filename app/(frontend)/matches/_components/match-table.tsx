/* eslint-disable react/jsx-key */
"use client";
import Link from "next/link";
import initials from 'initials';
import { GiCard5Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs, GiCard5Diamonds, GiCard5Hearts, GiCard9Clubs, GiCard9Diamonds, GiCard9Hearts, GiCard3Spades, GiCard3Diamonds, GiCard3Clubs, GiCard4Diamonds, GiCard6Diamonds, GiCard7Diamonds } from 'react-icons/gi';
import { InfoIcon } from 'lucide-react';
import { urlForImage } from '@/lib/sanity.image';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Round card definitions
const roundCards = [
  null, // Round 0 (empty)
  [
    [GiCard5Diamonds, GiCard5Clubs, GiCard5Hearts],
    [GiCard9Diamonds, GiCard9Clubs, GiCard9Hearts],
  ],
  [
    [GiCard5Diamonds, GiCard5Clubs, GiCard5Hearts],
    [GiCard9Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs],
  ],
  [
    [GiCard5Diamonds, GiCard5Clubs, GiCard5Hearts],
    [GiCard9Diamonds, GiCard9Clubs, GiCard9Hearts],
    [GiCard3Diamonds, GiCard3Clubs, GiCard3Spades],
  ],
  [
    [GiCard9Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs],
    [GiCard4Diamonds, GiCard5Diamonds, GiCard6Diamonds, GiCard7Diamonds],
  ],
  [
    [GiCard5Diamonds, GiCard5Clubs, GiCard5Hearts],
    [GiCard9Diamonds, GiCard9Clubs, GiCard9Hearts],
    [GiCard9Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs],
    ['-1'],
  ],
];

function RoundHeader({ roundNumber }: { roundNumber: number }) {
  const iconsSize = '22px';
  const cards = roundCards[roundNumber];

  if (!cards) {
    return <span>{roundNumber}</span>;
  }

  // Render card icons (for md only, hidden on lg+)
  const renderCardIcons = () => {
    return (
      <div>
        {cards.map((row, rowIndex) => {
          // Handle special case for '-1' (round 5)
          if (row.length === 1 && row[0] === '-1') {
            return (
              <div key={rowIndex} className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                +1
              </div>
            );
          }

          return (
            <div key={rowIndex} className='flex'>
              {row.map((CardIcon, iconIndex) => (
                <CardIcon
                  key={iconIndex}
                  size={iconsSize}
                  style={iconIndex > 0 ? { marginLeft: '-2px' } : {}}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Show card icons on md only (hidden on lg+) */}
      <div className="hidden md:block lg:hidden">
        {renderCardIcons()}
      </div>

      {/* Show number with info icon on sm and below, and lg and above */}
      <div className="flex items-center gap-1 md:hidden lg:flex">
        <span className="font-semibold">{roundNumber}</span>
        <Popover>
          <PopoverTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1 transition-colors">
              <InfoIcon className="h-3 w-3 text-gray-500 dark:text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <div className="space-y-2">
              {cards.map((row, rowIndex) => {
                // Handle special case for '-1' (round 5)
                if (row.length === 1 && row[0] === '-1') {
                  return (
                    <div key={rowIndex} className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      +1
                    </div>
                  );
                }

                return (
                  <div key={rowIndex} className="flex">
                    {row.map((CardIcon, iconIndex) => (
                      <CardIcon
                        key={iconIndex}
                        size={iconsSize}
                        style={iconIndex > 0 ? { marginLeft: '-2px' } : {}}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default function MatchTable({ data }: { data: any }) {
  const headers = [
    "",
    <RoundHeader key="round-1" roundNumber={1} />,
    <RoundHeader key="round-2" roundNumber={2} />,
    <RoundHeader key="round-3" roundNumber={3} />,
    <RoundHeader key="round-4" roundNumber={4} />,
    <RoundHeader key="round-5" roundNumber={5} />,
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
          <div className="flex flex-row gap-x-3 flex-nowrap items-center">
            {result?.player?.mainRepresentation ? (
              <Image
                alt=""
                className="rounded-full object-cover shrink-0 hidden sm:block"
                src={urlForImage(result.player.mainRepresentation).height(25).width(25).url()}
                width={24}
                height={24}
              />
            ) : (
              <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-6 h-6 shrink-0 aspect-square hidden sm:block"></div>
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
