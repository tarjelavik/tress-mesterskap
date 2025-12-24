import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { urlForImage } from '@/lib/sanity.image';
import initials from 'initials';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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


export default function Players({ players }: { players: PlayerProps[] }) {
  return (
    <section>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {players.map((player: any) => (
          <Card key={player._id} className='flex flex-col h-full border rounded-xl shadow-xl'>
            <CardHeader className="flex flex-row justify-between items-center gap-3 space-y-0 pb-1 p-3">
              <Avatar>
                <AvatarFallback className='font-serif'>
                  <Link href={`/players/${player._id}`}>
                    {initials(player.name)}
                  </Link>
                </AvatarFallback>
              </Avatar>
              <CardTitle className="font-medium">
                <Link href={`/players/${player._id}`}>{player.name}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-auto p-0'>
              <div className="w-4/12">
              </div>
              <div className="grow overflow-hidden">
                {player.mainRepresentation ? (
                  <Image
                    src={urlForImage(player.mainRepresentation).height(890).width(650).fit('fillmax').url()}
                    width={700}
                    height={890}
                    alt={player.name}
                    className='object-contain  overflow-hidden border-2 border-black'
                  />
                ) :
                  <Image
                    src={`/KH.svg`}
                    width={650}
                    height={990}
                    alt=""
                    className='object-fill dark:invert'
                  />
                }
              </div>
              <div className="w-4/12">
              </div>
            </CardContent>
            <CardFooter className="flex flex-row-reverse shrink-0 items-end justify-between content-center p-3">
              <Avatar>
                <AvatarFallback className='font-serif'>
                  <Link href={`/players/${player._id}`}>{initials(player.name)}</Link>
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold"> {player.games} </span><span className="text-sm font-medium"> spill </span>
              </div>
            </CardFooter>
          </Card>

        ))
        }
      </div >
    </section >
  );
}
