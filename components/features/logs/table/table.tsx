"use client"

import React, { useCallback, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { ErrorState } from "@/components/common/error-state"
import { DataTable } from "@/components/ui/data-table/data-table"

import { logsTableColumns } from "./columns"
import { SEVERITY_OPTIONS } from "./constants"
import { ExpandedLogDetails } from "./expanded-log-details"
import { LoadingTable } from "./loading-table"
import { EnhancedLogRecord } from "./types"
import { useLogsTableData } from "./use-table-data"

export function LogsTable() {
  const queryClient = useQueryClient()
  const { data, isLoading, getRowId, isError } = useLogsTableData()
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  const handleRowClick = useCallback((row: EnhancedLogRecord) => {
    const rowId = row.timeUnixNano.toString()
    setExpandedRowId((currentId) => (currentId === rowId ? null : rowId))
  }, [])

  if (isLoading) return <LoadingTable />

  if (isError) {
    return (
      <div className="container mx-auto space-y-4">
        <div className="rounded-lg border bg-card p-8">
          <ErrorState
            title="Failed to fetch logs"
            description="There was an error loading the logs."
            retry={() => queryClient.invalidateQueries({ queryKey: ["otlp-logs"] })}
          />
        </div>
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="container mx-auto space-y-4">
        <div className="rounded-lg border bg-card p-8">
          <div className="flex h-[400px] items-center justify-center text-muted-foreground">
            No logs found.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <DataTable
        columns={logsTableColumns}
        data={data}
        searchKey="body"
        onRowClick={handleRowClick}
        renderExpandedRow={(row) => <ExpandedLogDetails log={row} />}
        expandedRows={expandedRowId ? new Set([expandedRowId]) : new Set()}
        getRowId={getRowId}
        facetedFilter={{
          column: "severityText",
          title: "Status",
          options: SEVERITY_OPTIONS,
        }}
        options={{
          manualPagination: false,
          autoResetPageIndex: false,
        }}
      />
    </div>
  )
}
