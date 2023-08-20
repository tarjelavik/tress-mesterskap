import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'

export default function Home() {
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex gap-3 h-16 items-center px-4">
            <Link href={`/`} className="font-bold">
              VM i tress
            </Link>
            <MainNav className='mx-6' />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <main className="flex min-h-screen flex-col justify-between p-5">
          <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden">
            <Image
              src={urlForImage('image-669ec6af69d5b289c7812b8cb6b5b5690cf7b166-4032x3024-jpg').height(800).width(1200).fit('max').url()}
              alt="VM i tress"
              width={800}
              height={600}
              className="object-cover w-full max-h-[80vh] h-full"
            />
            <div className='p-5 bg-zinc-800 text-white lg:w-min flex flex-col justify-between'>
              <h1 className="text-6xl font-bold tracking-tight">VM i tress</h1>
              <p className="text-4xl tracking-tight">
                Vaksdalsmesterskapet i tress, det tar aldri slutt!
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}