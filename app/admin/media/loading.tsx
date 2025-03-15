export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-muted rounded"></div>
        <div className="h-10 w-32 bg-muted rounded"></div>
      </div>

      <div className="rounded-md border p-6">
        <div className="h-8 w-full max-w-md bg-muted rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

