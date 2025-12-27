import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-0">
      <Skeleton className="h-10 w-1/3 mb-2" />
      <Skeleton className="h-5 w-1/2 mb-6" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2">
            <Skeleton className="h-5 w-2/3 mb-4" />
            <Skeleton className="h-8 w-1/5" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2 h-72">
            <Skeleton className="h-5 w-2/3 mb-4" />
            <Skeleton className="flex-1" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2 h-72">
        <Skeleton className="h-5 w-2/3 mb-4" />
        <Skeleton className="flex-1" />
      </div>
    </div>
  )
}