import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jessica Davis</p>
          <p className="text-sm text-muted-foreground">jessica.davis@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$249.99</div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Alex Thompson</p>
          <p className="text-sm text-muted-foreground">alex.thompson@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$189.99</div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maria Kim</p>
          <p className="text-sm text-muted-foreground">maria.kim@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$299.99</div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">James Wilson</p>
          <p className="text-sm text-muted-foreground">james.wilson@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$159.99</div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>SL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sophia Lee</p>
          <p className="text-sm text-muted-foreground">sophia.lee@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$219.99</div>
      </div>
    </div>
  )
}

