import { TimeGrouping } from "./types"

/**
 * Returns date formatting options based on the time grouping
 * Used for consistent date display in histogram and other time-based visualizations
 *
 * @param grouping - Time interval grouping ('hour' or 'day')
 * @returns Intl.DateTimeFormatOptions for the specified grouping
 */
export function getDateFormatOptions(grouping: TimeGrouping): Intl.DateTimeFormatOptions {
  switch (grouping) {
    case "hour":
      return {
        month: "short",
        day: "numeric",
        hour: "numeric",
      }
    case "day":
      return {
        month: "short",
        day: "numeric",
      }
  }
}
