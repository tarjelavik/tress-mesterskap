import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Home() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-row p-10">
          <div className='p-5  text-white lg:w-1/3 flex flex-col justify-between'>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight">VM i tress</h1>
            <p className="text-2xl md:text-4xl tracking-tight">
              Vaksdals-mesterskapet i tress, det tar aldri slutt!
            </p>
          </div>
          <Image
            src={urlForImage('image-669ec6af69d5b289c7812b8cb6b5b5690cf7b166-4032x3024-jpg').height(800).width(1200).fit('max').url()}
            alt="VM i tress"
            width={800}
            height={600}
            className="object-cover w-full max-h-[80vh] h-full lg:w-2/3"
          />
        </div>
      </div>
    </>
  )
}