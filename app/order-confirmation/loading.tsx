export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 text-center animate-pulse">
      <div className="max-w-md mx-auto">
        <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
        <div className="h-8 w-3/4 bg-gray-200 rounded mx-auto mb-4"></div>
        <div className="h-4 w-full bg-gray-200 rounded mx-auto mb-6"></div>

        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto"></div>
        </div>

        <div className="space-y-4">
          <div className="h-10 w-full bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

