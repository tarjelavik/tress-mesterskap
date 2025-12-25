import Date from "@/components/date";
import MatchTable from "./match-table";
import { urlForImage } from '@/lib/sanity.image';
import Image from 'next/image';

export default function Match({ match }: { match: any }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <h3 className="text-2xl font-bold mb-1 leading-snug">
        {match.name}
      </h3 >

      {match.results && match.results.length > 0 && <MatchTable data={match.results} />}

      <div className='self-end'>
        {
          match.mainRepresentation && match._type === 'match' && (
            <div className="">
              <Image
                alt={match.title}
                src={urlForImage(match.mainRepresentation).height(200).width(500).url()}
                className={"object-cover object-center rounded-lg shadow-md w-full"}
                width={500}
                height={200}
              />
            </div>
          )
        }
        <p className='text-neutral-300 text-xs mt-2'>
          {match.gameStart ? (<Date dateString={match.gameStart} />) : null}
        </p>
      </div>
    </div >
  );
}
