import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function loading() {
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {[...Array(12)].map((_, i) => (
            <Card key={i} className="flex flex-col h-full border rounded-xl shadow-xl aspect-[63/100] overflow-hidden">
              <div className="flex flex-row justify-between items-center gap-3 p-3 shrink-0">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex flex-1 p-0 relative overflow-hidden min-h-0">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="flex flex-row-reverse shrink-0 items-end justify-between content-center p-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

