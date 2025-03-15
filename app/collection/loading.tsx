export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      <div className="h-[300px] md:h-[400px] bg-gray-200"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-8"></div>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

