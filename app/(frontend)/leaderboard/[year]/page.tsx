import { Metadata } from "next"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MainNav } from "@/components/main-nav"
import { getMatchesByYear, getAllPlayersByYear } from "@/lib/api"
import Link from 'next/link'
import React from 'react'
import { getLeaderboard } from '@/lib/functions'
import { orderBy } from 'lodash'
import { UserNav } from '@/components/user-nav'
import PlayerImage from '@/app/(frontend)/players/_components/player-image'
import YearSwitcher from '@/components/year-switcher'


export const metadata: Metadata = {
  title: "Resultatliste",
  description: "Resultatliste for VM i tress (på Vaksdal)."
}

export default async function LeaderBoardByYearPage({ params: { year } }: { params: { year: string } }) {
  const leaderboards = await getAllPlayersByYear(year);
  const years = await getMatchesByYear()
  let data = getLeaderboard(leaderboards);
  data = orderBy(data, ["expectedWins"], ["desc"]);
  const isSeasonOver = new Date().getFullYear() > Number.parseInt(year)

  return (
    <>
      <div className="flex-col flex ">
        <div className="border-b">
          <div className="flex gap-3 h-16 items-center px-4">
            <Link href={`/`} className="font-bold">
              VM i tress
            </Link>
            <YearSwitcher years={years} currentYear={year} />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 min-h-screen">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Resultatliste {year}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            {isSeasonOver ? (
              <div className='border-b-2 mb-10'>
                <h2 className="text-xl md:text-2xl text-teal-800 font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
                  Årets spiller
                </h2>
                <div className="flex gap-4">
                  <div className="w-16 h-16 relative mb-4">
                    <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                      {data[0].image && (
                        <PlayerImage
                          slug={data[0].slug}
                          title={data[0].name}
                          url={data[0].image}
                        />
                      )}
                      {!data[0].mainRepresentation && (
                        <div style={{ backgroundColor: '#ccc', width: '100%', height: '100%' }}></div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-10 text-2xl font-extrabold">
                    {data[0].name}
                  </div>
                </div>
              </div>
            ) : null}
            <Table>
              <TableCaption>Resultatliste</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Spiller</TableHead>
                  <TableHead>Seire</TableHead>
                  <TableHead>Forventet</TableHead>
                  <TableHead>Gjennomsnitt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((player, index) => (
                  <TableRow key={player._id}>
                    <TableCell className="font-bold mr-5 self-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="col-span-5 font-semibold self-center">
                      <Link as={`/players/${player._id}`} href="/players/[slug]">
                        {player.name}
                      </Link>
                      {index === 0 && (
                        " ⭐"
                      )}
                    </TableCell>
                    <TableCell className="col-span-2 self-center">
                      {player.wins} / {player.played}
                    </TableCell>
                    <TableCell className="col-span-2 self-center">
                      {player.expectedWins}
                    </TableCell>
                    <TableCell className="col-span-2 self-center">
                      {player.average}
                    </TableCell>

                    {/* <TableCell className="col-span-2 self-center">
                    <DynamicScoreAccumulatedAverageGraphplayerView
                  data={player.accumulatedAverages}
                />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}


// import React from 'react';
// import { useRouter } from "next/router";
// import ErrorPage from "next/error";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import Container from "../../components/container";
// import Layout from "../../components/layout";
// import { getAllPlayers } from "../../lib/api";
// import Head from "next/head";
// import { CMS_NAME } from "../../lib/constants";
// import Header from "../../components/header";
// import Title from "../../components/title";
// import { getAllPlayersByYear, getMatchesByYear } from '../../lib/api';
// import { getLeaderboard } from '../../lib/functions';
// import { orderBy, parseInt } from 'lodash';
// import PlayerImage from '../../components/player-image';

// export default function LeaderByYear({ year, leaderboard, preview }) {
//   const router = useRouter();
//   if (!router.isFallback && !leaderboard) {
//     return <ErrorPage statusCode={404} />;
//   }

//   let data = getLeaderboard(leaderboard);
//   data = orderBy(data, ["expectedWins"], ["desc"]);

//   const isSeasonOver = new Date().getFullYear() > Number.parseInt(year)

//   return (
//     <>
//       <Layout preview={preview}>
//         <Head>
//           <title>{CMS_NAME}</title>
//         </Head>
//         <Header />
//         <Container>
//           <Title>Resultatliste : {year}</Title>

//           {isSeasonOver ? (
//             <div className='border-b-2 mb-10'>
//               <h2 className="text-xl md:text-2xl text-teal-800 font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
//                 Årets spiller
//               </h2>
//               <div className="flex gap-4">
//                 <div className="w-16 h-16 relative mb-4">
//                   <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
//                     {data[0].image && (
//                       <PlayerImage
//                         slug={data[0].slug}
//                         title={data[0].name}
//                         url={data[0].image}
//                       />
//                     )}
//                     {!data[0].mainRepresentation && (
//                       <div style={{ backgroundColor: '#ccc', width: '100%', height: '100%' }}></div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-span-10">
//                   <Title>{data[0].name}</Title>
//                 </div>
//               </div>
//             </div>
//           ) : null
//           }
//           <div className="grid grid-cols-12 gap-4 auto-cols-min mb-10">
//             <div>#</div>
//             <div className="col-span-5">Spiller</div>
//             <div className="col-span-2 self-center">Vunnet</div>
//             <div className="col-span-2 self-center">Forventet</div>
//             <div className="col-span-2 self-center">Gj.snitt</div>
//             {data.map((player, index) => (
//               <React.Fragment key={player._id}>
//                 <div className="font-bold mr-5 self-center">
//                   {index + 1}
//                 </div>
//                 <div className="col-span-5 font-semibold self-center">
//                   <Link as={`/players/${player._id}`} href="/players/[slug]">
//                     {player.name}
//                   </Link>
//                   {index === 0 && (
//                     " ⭐"
//                   )}
//                 </div>
//                 <div className="col-span-2 self-center">
//                   {player.wins} / {player.played}
//                 </div>
//                 <div className="col-span-2 self-center">
//                   {player.expectedWins}
//                 </div>
//                 <div className="col-span-2 self-center">
//                   {player.average}
//                 </div>
//               </React.Fragment>
//             ))}
//           </div>
//         </Container>
//       </Layout>
//     </>
//   )
// }

// export async function getStaticProps({ params, preview = false }) {
//   const leaderboard = await getAllPlayersByYear(params.year, preview);
//   const year = params.year

//   return {
//     props: {
//       year,
//       leaderboard,
//       preview
//     },
//   };
// }

// export async function getStaticPaths() {
//   const allYears = await getMatchesByYear();
//   return {
//     paths:
//       allYears?.map((year) => ({
//         params: {
//           year: year,
//         },
//       })) || [],
//     fallback: true,
//   };
// }

