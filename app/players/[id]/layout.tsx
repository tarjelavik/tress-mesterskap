import type { Metadata } from 'next'
import PlayerSwitcher from '@/components/player-switcher'
import { MainNav } from '@/components/main-nav'
import { getAllPlayers } from '@/lib/api'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'VM i Tress',
  description: 'VM i Tress (på Vaksdal)',
}

export default async function RootLayout({
  params: { id },
  children,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const players = await getAllPlayers()
  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex gap-3 h-16 items-center px-4">
          <Link href={`/`} className="font-bold">
            VM i Tress
          </Link>
          <PlayerSwitcher players={players} currentPlayer={id} />
          <MainNav />
        </div>
      </div>
      {children}
    </div>
  )
}
