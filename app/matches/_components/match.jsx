import Date from "@/components/date";
import Link from "next/link";
import MatchTable from "./match-table";
import PortableBlock from "@/components/portable-block";
import { urlForImage } from '@/lib/sanity.image';

export default function Match({ match }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <h3 className="text-2xl font-bold mb-1 leading-snug">
        {match.name}
        {/* <Link href={`/match/${match._id}`} className="hover:underline" >
          {match.name}
        </Link> */}
      </h3 >

      {match.results && <MatchTable data={match.results} />}

      <div className='self-end'>
        {
          match.mainRepresentation && match._type === 'match' && (
            <div className="">
              <img
                alt={match.title}
                src={urlForImage(match.mainRepresentation).height(200).width(500).url()}
                className={"object-cover object-center rounded-lg shadow-md w-full"}
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
