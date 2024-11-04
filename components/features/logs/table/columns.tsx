import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"

import { EnhancedLogRecord } from "./types"
import { formatTime, getSeverityVariant } from "./utils"

/**
 * Column definitions for the logs table
 * Configures how each column should be displayed and filtered
 */
export const logsTableColumns: ColumnDef<EnhancedLogRecord>[] = [
  {
    // Severity/Status Column
    accessorKey: "severityText",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const severity = row.getValue("severityText") as string
      return severity ? (
        <div className="w-[150px]">
          <Badge variant={getSeverityVariant(severity)} className="text-xs">
            {severity}
          </Badge>
        </div>
      ) : null
    },
    // Enable multi-select filtering for severity values
    filterFn: (row, id, filterValues: string[]) => {
      const value = row.getValue(id) as string
      return filterValues.includes(value)
    },
  },
  {
    // Timestamp Column
    accessorKey: "timeUnixNano",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Time" />,
    cell: ({ row }) => {
      const time = row.getValue("timeUnixNano") as number
      return (
        <div className="w-[150px]">
          <div className="flex flex-col space-y-1">
            {/* Display date and time on separate lines */}
            <span className="text-xs text-muted-foreground">{formatTime(time).date}</span>
            <span className="text-sm">{formatTime(time).time}</span>
          </div>
        </div>
      )
    },
  },
  {
    // Log Message Body Column
    accessorKey: "body",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Body" />,
    cell: ({ row }) => {
      const body = row.getValue("body") as { stringValue: string }
      return <span className="break-words text-sm">{body?.stringValue}</span>
    },
    // Enable case-insensitive text search within log messages
    filterFn: (row, id, value) => {
      const bodyValue = row.getValue("body") as { stringValue: string }
      return bodyValue?.stringValue.toLowerCase().includes(value.toLowerCase())
    },
  },
]
