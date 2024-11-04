import { CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { TimeGrouping } from "./types"

interface HistogramHeaderProps {
  totalLogs: number
  grouping: TimeGrouping
  onGroupingChange: (value: TimeGrouping) => void
}

export function HistogramHeader({ totalLogs, grouping, onGroupingChange }: HistogramHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <CardTitle>Log Distribution Over Time</CardTitle>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">Total Logs: {totalLogs}</div>
        <Select value={grouping} onValueChange={(value) => onGroupingChange(value as TimeGrouping)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select grouping" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">By Day</SelectItem>
            <SelectItem value="hour">By Hour</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
