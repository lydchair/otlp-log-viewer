import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function LoadingTable() {
  return (
    <div className="space-y-4">
      {/* Toolbar skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton className="h-8 w-[250px]" /> {/* Search input */}
          <Skeleton className="h-8 w-[120px]" /> {/* Status filter */}
        </div>
        <Skeleton className="h-8 w-[100px]" /> {/* View options */}
      </div>

      {/* Table skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Body</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-[80px]" /> {/* Status badge */}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <Skeleton className="h-4 w-24" /> {/* Date */}
                    <Skeleton className="h-4 w-20" /> {/* Time */}
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[90%]" /> {/* Log message */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" /> {/* Items per page */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[100px]" /> {/* Page info */}
          <Skeleton className="h-8 w-[120px]" /> {/* Pagination buttons */}
        </div>
      </div>
    </div>
  )
}
