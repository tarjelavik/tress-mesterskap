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
            className="px-2 py-1 bg-white dark:bg-gray-800 border-gray-500 dark:border-gray-600 border-b"
            key={index}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );

  const results = data;

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

  const playerColumn = results.map((result: any, index: number) => (
    <tr key={result.player._id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
      <td className="border dark:border-gray-700 px-2 sm:py-1">
        <div className="flex flex-row gap-x-3 flex-nowrap">
          {result?.player?.mainRepresentation ? (
            <Image
              alt=""
              className="rounded-full object-contain"
              src={urlForImage(result.player.mainRepresentation).height(25).width(25).url()}
              width={25}
              height={25}
            />
          ) : (
            <div className="rounded-full object-contain bg-gray-200 dark:bg-gray-700 w-6 h-6"></div>
          )}
          <Link
            href={`/players/${result.player._id}`}
            className="dark:text-gray-100"
          >
            <span className='hidden sm:inline'>{result.player.name} {result.isWinner && '⭐'}</span>
            <span className='sm:hidden'>{initials(result.player.name)} {result.isWinner && '⭐'}</span>
          </Link>
        </div>
      </td>
      {result.score.map((round: any, index: any) => (
        <td className={`border dark:border-gray-700 px-2 py-1 text-sm dark:text-gray-100 ${getBackgroundColor(result.isWinner, round)}`} key={index}>
          {getScoreDisplay(round)}
        </td>
      ))}
      <td className={`border dark:border-gray-700 px-2 py-1 text-sm dark:text-gray-100 ${result.isWinner ? 'font-bold text-yellow-900 dark:text-yellow-100 bg-yellow-300 dark:bg-yellow-600' : ''}`}>
        {result.score.reduce((a: number, b: number) => a + b, 0)}
      </td>
    </tr>
  ));

  return (
    <div className="">
      <table className="table-auto bg-gray-100 dark:bg-gray-900 w-full overflow-scroll">
        {headerRow}
        <tbody>{playerColumn}</tbody>
      </table>
    </div>
  );
}
