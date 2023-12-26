/* eslint-disable react/jsx-key */
import Link from "next/link";
import initials from 'initials';
import { GiCard5Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs, GiCard5Diamonds, GiCard5Hearts, GiCard9Clubs, GiCard9Diamonds, GiCard9Hearts, GiCard3Spades, GiCard3Diamonds, GiCard3Clubs, GiCard4Diamonds, GiCard6Diamonds, GiCard7Diamonds } from 'react-icons/gi';
import { urlForImage } from '@/lib/sanity.image';

export default function MatchTable({ data }) {
  const iconsSize = '22px'
  const headers = [
    "",
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} color={'red'} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={iconsSize} color={'red'} />
        <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard9Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} color={'red'} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Clubs size={iconsSize} />
        <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} color={'red'} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={iconsSize} color={'red'} />
        <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard9Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard3Diamonds size={iconsSize} color={'red'} />
        <GiCard3Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard3Spades size={iconsSize} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard9Clubs size={iconsSize} />
        <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard4Diamonds size={iconsSize} color={'red'} />
        <GiCard5Diamonds size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        <GiCard6Diamonds size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        <GiCard7Diamonds size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>, ,
    <div className='flex'>
      <div className='flex flex-col'>
        <div className='flex'>
          <GiCard5Diamonds size={iconsSize} color={'red'} />
          <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        </div>
        <div className='flex'>
          <GiCard9Diamonds size={iconsSize} color={'red'} />
          <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCard9Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        </div>
        <div className='flex'>
          <GiCard9Clubs size={iconsSize} />
          <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        </div>
      </div>
      <div className='self-center'>+1</div>
    </div>, ,
    "Totalt",
  ];

  const headerRow = (
    <thead>
      <tr>
        {headers.map((head, index) => (
          <th
            style={{ verticalAlign: "bottom" }}
            className="px-2 py-1 bg-white border-gray-500 border-b"
            key={index}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );

  const results = data;

  const playerColumn = results.map((result) => (
    <tr key={result.player._id}>
      <td className="border px-2 sm:py-1">
        <div className="flex flex-row gap-x-1 flex-nowrap">

          {/* {result?.player?.mainRepresentation && (
            <img
              alt=""
              className="rounded-full object-contain"
              src={urlForImage(result.player.mainRepresentation).height(25).width(25).url()}
            />
          )} */}
          <Link
            href={`/players/${result.player._id}`}
          >
            {result.isWinner && (
              <>
                {/* <span className='hidden md:visible'>{result.player.name} ⭐</span> */}
                <span>{initials(result.player.name)} ⭐</span>
              </>
            )}
            {!result.isWinner && (
              <>
                {/* <span className='hidden sm:inline-block'>{result.player.name}</span> */}
                <span>{initials(result.player.name)}</span>
              </>
            )}
          </Link>
        </div>
      </td>
      {result.score.map((round, index) => (
        <td className="border px-2 py-1" key={index}>
          {round >= 90 ? `${round} 🔥` : ''}
          {round === 0 ? `${round} 💎` : ''}
          {round !== 0 && round < 90 ? `${round}` : ''}
        </td>
      ))}
      <td className="border px-2 py-1">
        {result.score.reduce((a, b) => a + b, 0)}
      </td>
    </tr>
  ));

  return (
    <div className="">
      <table className="table-auto bg-gray-100 w-full overflow-scroll">
        {headerRow}
        <tbody>{playerColumn}</tbody>
      </table>
    </div>
  );
}
