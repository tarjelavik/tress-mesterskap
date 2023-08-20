import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import Link from 'next/link'

export default function TournamentsPage() {
  return (
    <>
      <div className="flex-col flex ">
        <div className="border-b">
          <div className="flex gap-3 h-16 items-center px-4">
            <Link href={`/`} className="font-bold">
              VM i tress
            </Link>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            Hei
          </div>
        </main>
      </div>
    </>
  )
}
