export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex items-center mb-8">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-8 w-48 bg-gray-200 rounded ml-auto"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="h-10 w-full bg-gray-200 rounded mb-6"></div>

          <div className="space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            <div className="h-1 w-full bg-gray-200 rounded"></div>

            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-32 w-full bg-gray-200 rounded"></div>

            <div className="h-1 w-full bg-gray-200 rounded"></div>

            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-16 w-full bg-gray-200 rounded"></div>
              <div className="h-16 w-full bg-gray-200 rounded"></div>
              <div className="h-16 w-full bg-gray-200 rounded"></div>
            </div>

            <div className="flex justify-end">
              <div className="h-10 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

