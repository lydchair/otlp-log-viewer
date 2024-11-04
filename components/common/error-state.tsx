"use client"

import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title: string
  description?: string
  retry?: () => void
}

export function ErrorState({ title, description, retry }: ErrorStateProps) {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center gap-4">
      <p className="text-destructive">{title}</p>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {retry && (
        <Button variant="outline" onClick={retry}>
          Try again
        </Button>
      )}
    </div>
  )
}
