export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-20 w-full bg-gray-200 rounded"></div>
          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
          <div className="h-12 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

