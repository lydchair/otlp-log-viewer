import React from "react"

import { useGetOTLPLogs } from "@/services/queries"

import { TimeGrouping } from "./types"
import { getDateFormatOptions } from "./utils"

/**
 * Custom hook to transform OpenTelemetry logs into histogram data
 * Groups log entries by time intervals for visualization
 *
 * @param grouping - Time interval to group logs by ('hour' or 'day')
 * @returns Object containing:
 * - histogramData: Array of timestamp-count pairs for histogram visualization
 * - isLoading: Loading state of the data fetch
 */
export function useHistogramData(grouping: TimeGrouping) {
  const { data, isLoading, isError } = useGetOTLPLogs()

  const histogramData = React.useMemo(() => {
    if (!data) return []

    // Flatten nested log structure into a single array of log records
    const logRecords =
      data?.resourceLogs
        ?.flatMap((resourceLog) => resourceLog.scopeLogs.flatMap((scopeLog) => scopeLog.logRecords))
        .filter((log) => log !== undefined) ?? []

    // Map to store count of logs for each time interval
    const timeMap = new Map<string, number>()

    logRecords.forEach((log) => {
      // Convert nanoseconds to milliseconds for Date object
      const date = new Date(Number(log.timeUnixNano) / 1_000_000)
      let groupKey: string

      // Group timestamps based on specified time interval
      switch (grouping) {
        case "hour":
          // Create timestamp for the start of the hour
          groupKey = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours()
          ).toISOString()
          break
        case "day":
          // Create timestamp for the start of the day
          groupKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()
          break
      }

      // Increment count for the time interval
      timeMap.set(groupKey, (timeMap.get(groupKey) || 0) + 1)
    })

    // Convert Map to array of objects and format timestamps for display
    return (
      Array.from(timeMap.entries())
        .map(([timestamp, count]) => ({
          timestamp: new Date(timestamp).toLocaleString(undefined, {
            ...getDateFormatOptions(grouping),
          }),
          count,
        }))
        // Sort entries chronologically
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    )
  }, [data, grouping])

  return { histogramData, isLoading, isError }
}
