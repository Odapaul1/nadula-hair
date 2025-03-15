export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="rounded-lg border overflow-hidden bg-gray-200 h-64"></div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-200 rounded-lg h-64"></div>
        </div>
      </div>
    </div>
  )
}

