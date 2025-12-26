export default function loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-0 animate-pulse">
      <div className="h-10 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-5 w-1/2 bg-gray-100 rounded mb-6" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-4" />
            <div className="h-8 w-1/5 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2 h-72">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-4" />
            <div className="flex-1 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2 h-72">
        <div className="h-5 w-2/3 bg-gray-200 rounded mb-4" />
        <div className="flex-1 bg-gray-100 rounded" />
      </div>
    </div>
  )
}