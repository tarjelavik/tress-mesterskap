import { Metadata } from "next"
import { getAllPlayers } from "@/lib/api"
import Players from './_components/players';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { ChevronRight, SpadeIcon, UsersIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: "Spillere",
  description: "Liste over alle tress-spillerne som har deltatt i VM i tress (på Vaksdal).",
}

export default async function PlayersPage() {
  const players = await getAllPlayers();
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
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <SpadeIcon className="size-4" />
                  VM i tress
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/players" className="flex items-center gap-2">
                  <UsersIcon className="size-4" />
                  Spillere
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-0">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Spillere</h2>
          </div>
          <Players players={players} />
        </div>
      </div>
    </>
  )
}