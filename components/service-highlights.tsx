export default function ServiceHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-y border-gray-200">
      <div className="flex items-center justify-center py-4 px-6 border-b md:border-b-0 md:border-r border-gray-200">
        <span className="text-sm font-medium uppercase text-center">FREE SHIPPING</span>
      </div>

      <div className="flex items-center justify-center py-4 px-6 border-b md:border-b-0 md:border-r border-gray-200">
        <span className="text-sm font-medium uppercase text-center">30-DAYS RETURN</span>
      </div>

      <div className="flex items-center justify-center py-4 px-6">
        <span className="text-sm font-medium uppercase text-center">BUY NOW, PAY LATER</span>
      </div>
    </div>
  )
}

