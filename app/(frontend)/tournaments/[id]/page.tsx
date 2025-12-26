import { getTournament } from '@/lib/api'
import Match from '@/app/(frontend)/matches/_components/match'

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tournament = await getTournament(id)

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <h2 className="text-3xl font-bold tracking-tight">{tournament[0].name}</h2>
        <p className="text-sm text-muted-foreground">{tournament[0].description}</p>
        {tournament[0].matches.map((match: any) => (
          <div key={match._id}>
            <Match match={match} />
          </div>
        ))}
        {/* <pre className="bg-muted p-4 rounded-md">
          <code className="text-sm">
            {JSON.stringify(tournament, null, 2)}
          </code>
        </pre> */}
      </div>
    </div>
  )
}