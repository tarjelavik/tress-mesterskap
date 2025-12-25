import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { urlForImage } from '@/lib/sanity.image';
import initials from 'initials';
import Image from 'next/image';

type PlayerProps = {
  _id: string;
  name: string;
  mainRepresentation?: {
    asset: {
      url: string;
    };
  };
  games: string
};

function getRandomString(arr: string[]) {
  // Generate a random index between 0 and the last index of the array
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Return the item at that random index
  const item = arr[randomIndex];
  return item;
}

const cards: string[] = [
  '/KH.svg',
  '/KD.svg',
  '/KC.svg',
  '/KS.svg',
  '/JD.svg',
  '/JH.svg',
  '/JS.svg',
  '/QH.svg',
  '/QC.svg',
  '/QD.svg',
  '/QS.svg',
] as const;


export default function Players({ players }: { players: PlayerProps[] }) {
  return (
    <section className="@container/players">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {players.map((player: any) => (
          <Link key={player._id} href={`/players/${player._id}`} className="group @container/card">
            <Card className='flex flex-col h-full border rounded-xl shadow-xl transition-all hover:shadow-lg hover:scale-[1.07] aspect-[63/100] overflow-hidden'>
              <CardHeader className="flex flex-row justify-between items-center gap-3 space-y-0 pb-1 p-3 shrink-0">
                <Avatar className="@[100px]:w-6 @[100px]:h-6 @[150px]:w-8 @[150px]:h-8 @[200px]:w-10 @[200px]:h-10">
                  <AvatarFallback className='font-serif'>
                    {initials(player.name)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xs @[150px]:text-sm @[200px]:text-base font-medium">
                  {player.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-1 p-0 relative overflow-hidden min-h-0'>
                <div className="w-1/12 shrink-0">
                </div>
                <div className="grow relative overflow-hidden min-w-0 w-full h-full @[100px]:min-w-[60px] @[150px]:min-w-[90px] @[200px]:min-w-[120px] @[250px]:min-w-[150px] @[300px]:min-w-[180px] @[400px]:min-w-[240px] @[500px]:min-w-[300px] @[580px]:min-w-[360px]">
                  {player.mainRepresentation ? (
                    <Image
                      src={urlForImage(player.mainRepresentation).height(890).width(650).fit('fillmax').url()}
                      fill
                      alt={player.name}
                      className='object-cover border-2 border-black'
                      sizes="(min-width: 0px) 100cqw"
                    />
                  ) :
                    <Image
                      src={getRandomString(cards)}
                      fill
                      alt=""
                      className='object-contain dark:invert'
                      sizes="(min-width: 0px) 100cqw"
                    />
                  }
                </div>
                <div className="w-1/12 shrink-0">
                </div>
              </CardContent>
              <CardFooter className="flex flex-row-reverse shrink-0 items-end justify-between content-center p-3">
                <Avatar>
                  <AvatarFallback className='font-serif'>
                    {initials(player.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-semibold"> {player.games} </span><span className="text-sm font-medium"> spill </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))
        }
      </div >
    </section >
  );
}
