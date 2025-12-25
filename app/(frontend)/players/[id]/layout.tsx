import type { Metadata } from 'next'
import PlayerSwitcher from '@/components/player-switcher'
import { getAllPlayers } from '@/lib/api'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { ChevronRight, SpadeIcon, UsersIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VM i tress',
  description: 'VM i tress (på Vaksdal)',
}

export default async function PlayerLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>
  children: React.ReactNode
}) {
  const { id } = await params
  const players = await getAllPlayers()
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <SpadeIcon className="size-4" />
                  VM i tress
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block">
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/players" className="flex items-center gap-2">
                  <UsersIcon className="size-4" />
                  Spillere
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block">
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <PlayerSwitcher players={players} currentPlayer={id} />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {children}
    </>
  )
}