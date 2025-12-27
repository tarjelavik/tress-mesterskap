import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function loading() {
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

