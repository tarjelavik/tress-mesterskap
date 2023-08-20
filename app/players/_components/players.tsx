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
  mainRepresentation: {
    asset: {
      url: string;
    };
  };
  games: string
};


export default function Players({ players }: { players: PlayerProps[] }) {
  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((player: any) => (
          <AspectRatio key={player._id} ratio={64 / 89}>
            <Card className='flex flex-col h-full border rounded-xl shadow-xl'>
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
              <CardContent className='flex flex-auto'>
                <div className="w-1/12">
                </div>
                <div className="flex-grow border-2 border-neutral-500 rounded-lg overflow-hidden h-full w-full">
                  <AspectRatio ratio={64 / 73}>
                    {player.mainRepresentation ? (
                      <img
                        src={urlForImage(player.mainRepresentation).height(890).width(600).fit('fillmax').url()}
                        alt={player.name}
                        className='object-contain h-fit w-full overflow-hidden'
                      />
                    ) :
                      <Image
                        src={`/default-player-ill.png`}
                        width={700}
                        height={890}
                        alt=""
                        className='object-contain h-fit w-full overflow-hidden grayscale contrast-100 opacity-70'
                      />
                    }
                  </AspectRatio>
                </div>
                <div className="w-1/12">
                </div>
              </CardContent>
              <CardFooter className="flex flex-row-reverse flex-shrink-0 items-end justify-between content-center p-3">
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
          </AspectRatio>
        ))
        }
      </div >
    </section >
  );
}
