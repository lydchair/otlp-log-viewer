import { Card, CardContent } from "@/components/ui/card"

export function LoadingHistogram() {
  return (
    <Card>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center text-muted-foreground">
          Loading logs...
        </div>
      </CardContent>
    </Card>
  )
}
