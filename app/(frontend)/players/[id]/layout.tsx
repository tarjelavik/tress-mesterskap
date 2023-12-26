import type { Metadata } from 'next'
import PlayerSwitcher from '@/components/player-switcher'
import { MainNav } from '@/components/main-nav'
import { getAllPlayers } from '@/lib/api'
import Link from 'next/link'
import { UserNav } from '@/components/user-nav'

export const metadata: Metadata = {
  title: 'VM i tress',
  description: 'VM i tress (på Vaksdal)',
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
            VM i tress
          </Link>
          <PlayerSwitcher players={players} currentPlayer={id} />
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
