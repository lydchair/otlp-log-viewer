import { Fixed64 } from "@opentelemetry/otlp-transformer"

import { BadgeProps } from "@/components/ui/badge"

/**
 * Formats a Unix timestamp (in nanoseconds) into human-readable date and time
 * @param timeUnixNano - Unix timestamp in nanoseconds (OpenTelemetry Fixed64 format)
 * @returns Object containing formatted date and time strings
 */
export const formatTime = (timeUnixNano: Fixed64) => {
  // Convert nanoseconds to milliseconds for Date object
  const date = new Date(Number(timeUnixNano) / 1_000_000)
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  }
}

/**
 * Maps log severity levels to corresponding badge variants for visual representation
 * @param severity - Log severity level string
 * @returns Badge variant corresponding to the severity level
 */
export const getSeverityVariant = (severity: string): BadgeProps["variant"] => {
  switch (severity) {
    case "ERROR":
    case "FATAL":
      return "destructive"
    case "WARN":
      return "warning"
    case "INFO":
      return "info"
    case "DEBUG":
      return "debug"
    default:
      return "default"
  }
}

/**
 * Calculates and formats the time difference between two timestamps
 * Returns the difference in the most appropriate unit (ms, s, or min)
 *
 * @param timeUnixNano - First timestamp in nanoseconds
 * @param observedTimeUnixNano - Second timestamp in nanoseconds
 * @returns Formatted string representing the time difference
 */
export const getTimeDifference = (timeUnixNano: Fixed64, observedTimeUnixNano: Fixed64) => {
  // Convert nanoseconds to milliseconds
  const time = Number(timeUnixNano) / 1_000_000
  const observedTime = Number(observedTimeUnixNano) / 1_000_000
  const diffMs = Math.abs(observedTime - time)

  // Format based on magnitude of difference
  if (diffMs < 1000) return `${diffMs}ms`
  if (diffMs < 60000) return `${(diffMs / 1000).toFixed(2)}s`
  return `${(diffMs / 60000).toFixed(2)}min`
}
