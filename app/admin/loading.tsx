import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4">
      <div className="h-9 w-[200px] bg-muted rounded animate-pulse"></div>

      <div className="h-10 w-full bg-muted rounded animate-pulse"></div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="h-[400px] bg-muted rounded animate-pulse"></div>
    </div>
  )
}

