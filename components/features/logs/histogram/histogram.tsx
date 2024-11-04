"use client"

import React from "react"
import { useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic"

import { ErrorState } from "@/components/common/error-state"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { HistogramHeader } from "./histogram-header"
import { LoadingHistogram } from "./loading-histogram"
import { TimeGrouping } from "./types"
import { useHistogramData } from "./use-histogram-data"

const HistogramChart = dynamic(() => import("./histogram-chart"), {
  loading: () => <LoadingHistogram />,
  ssr: false,
})

export function LogsHistogram() {
  const queryClient = useQueryClient()
  const [grouping, setGrouping] = React.useState<TimeGrouping>("day")
  const { histogramData, isLoading, isError } = useHistogramData(grouping)

  if (isLoading) <LoadingHistogram />

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Log Distribution Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            title="Failed to fetch logs"
            description="There was an error loading the log distribution."
            retry={() => queryClient.invalidateQueries({ queryKey: ["otlp-logs"] })}
          />
        </CardContent>
      </Card>
    )
  }

  const totalLogs = histogramData.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <Card>
      <CardHeader>
        <HistogramHeader totalLogs={totalLogs} grouping={grouping} onGroupingChange={setGrouping} />
      </CardHeader>
      <CardContent className="pl-0">
        <ScrollArea className="w-full">
          <HistogramChart data={histogramData} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
