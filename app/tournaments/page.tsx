import { MainNav } from '@/components/main-nav'
import Link from 'next/link'

export default function TournamentsPage() {
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex gap-3 h-16 items-center px-4">
            <Link href={`/`} className="font-bold">
              VM i Tress
            </Link>
            <MainNav />
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
