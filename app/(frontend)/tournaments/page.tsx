import { Card, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import { getAllTournaments } from '@/lib/api'
import Link from 'next/link'

export default async function TournamentsPage() {
  const tournaments = await getAllTournaments()
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-w-0">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <h2 className="text-3xl font-bold tracking-tight">Turneringer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournaments.map((tournament: any) => (
            <Link href={`/tournaments/${tournament._id}`} key={tournament._id} className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>{tournament.name}</CardTitle>
                  <CardDescription>{tournament.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
