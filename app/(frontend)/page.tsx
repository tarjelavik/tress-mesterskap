import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity.image'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, ListOrdered, SquareTerminal, SpadeIcon } from 'lucide-react'
import { CardStackIcon } from '@radix-ui/react-icons'
import { sanityFetch } from '@/sanity/lib/live'
import { SanityLive } from '@/sanity/lib/live'
import { defineQuery } from 'next-sanity'
import LiveStreaming from '@/components/live-streaming'

const draftMatchesQuery = defineQuery(`
  *[_type == "match" && _id in path("drafts.*")] {
    _id,
    name,
    gameStart,
    results[]{
      player->{_id, name, mainRepresentation},
      isWinner,
      score
    }
  }`)

export default async function Home() {
  const live = await sanityFetch({ query: draftMatchesQuery })

  console.log(live)

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
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-w-0">
        <Card className='col-span-2 flex flex-col justify-between rounded-lg flex-shrink-0'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-2xl font-bold tracking-tight'><SpadeIcon className="size-12" /> VM i tress</CardTitle>
            <CardDescription>
              Vaksdals-mesterskapet i tress, det tar aldri slutt!
            </CardDescription>
          </CardHeader>
        </Card>

        <LiveStreaming />

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Link href="/players" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <CardTitle>Spillere</CardTitle>
                </div>
                <CardDescription>
                  Se alle spillere og deres statistikk
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/matches" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <SquareTerminal className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <CardTitle>Spill</CardTitle>
                </div>
                <CardDescription>
                  Se alle spill og resultater
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/leaderboard" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ListOrdered className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <CardTitle>Resultatliste</CardTitle>
                </div>
                <CardDescription>
                  Se resultatlisten og ranking
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/tournaments" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardStackIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <CardTitle>Turneringer</CardTitle>
                </div>
                <CardDescription>
                  Se alle turneringer
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>


        <div className="flex-1 min-w-0 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
          <Image
            src={urlForImage('image-669ec6af69d5b289c7812b8cb6b5b5690cf7b166-4032x3024-jpg').height(800).width(1200).fit('max').url()}
            alt="VM i tress"
            width={800}
            height={600}
            className="object-cover w-full h-full"
            style={{ maxHeight: '70vh' }}
            priority
          />
        </div>
      </div>
      <SanityLive />
    </>
  )
}