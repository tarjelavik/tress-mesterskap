import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PlayerImage from '@/app/players/_components/player-image';
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {players.map((player: any) => (
          <Card key={player.id} className='border rounded-xl shadow-sm'>
            <AspectRatio ratio={64 / 89} >
              <CardHeader className="flex flex-row justify-between items-center gap-3 space-y-0 pb-1 p-3">
                <Avatar>
                  <AvatarFallback className='font-serif'><Link href={`/players/${player._id}`}>{initials(player.name)}</Link></AvatarFallback>
                </Avatar>
                <CardTitle className="font-medium">
                  <Link href={`/players/${player._id}`}>{player.name}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex'>
                  <div className="w-1/12">
                  </div>
                  <div className="text-md flex-grow">
                    {player.mainRepresentation ? (
                      <img
                        src={urlForImage(player.mainRepresentation).height(680).width(600).fit('clip').url()}
                        alt="@shadcn"
                        className='object-contain rounded-lg border-2 border-neutral-500 mb-2 w-fill h-[290px]'
                      />)
                      :
                      <div className='border-2 border-neutral-500 rounded-lg w-fill mb-2 h-[290px]'>
                      </div>}
                    <span className="font-semibold"> {player.games} </span><span className="text-sm font-medium"> spill </span>
                  </div>
                  <div className="w-1/12">
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row-reverse items-end p-3">
                <Avatar className='relative'>
                  <AvatarFallback className='font-serif'><Link href={`/players/${player._id}`}>{initials(player.name)}</Link></AvatarFallback>
                </Avatar>
              </CardFooter>
            </AspectRatio>
          </Card>
        ))
        }
      </div >
    </section >
  );
}
