import { Fixed64 } from "@opentelemetry/otlp-transformer"
import { describe, expect, it } from "vitest"

import {
  formatTime,
  getSeverityVariant,
  getTimeDifference,
} from "@/components/features/logs/histogram"

describe("utils", () => {
  describe("formatTime", () => {
    it("should format unix nano time correctly", () => {
      const time: Fixed64 = "1703174400000000000" // 2023-12-21 12:00:00
      const result = formatTime(time)

      expect(result).toEqual({
        date: expect.any(String),
        time: expect.any(String),
      })
    })
  })

  describe("getSeverityVariant", () => {
    it.each([
      ["ERROR", "destructive"],
      ["FATAL", "destructive"],
      ["WARN", "warning"],
      ["INFO", "info"],
      ["DEBUG", "debug"],
      ["UNKNOWN", "default"],
    ])("should return correct variant for %s severity", (severity, expected) => {
      expect(getSeverityVariant(severity)).toBe(expected)
    })
  })

  describe("getTimeDifference", () => {
    it("should return difference in milliseconds when less than 1 second", () => {
      const time1: Fixed64 = "1703174400000000000"
      const time2: Fixed64 = "1703174400100000000" // 100ms later
      expect(getTimeDifference(time1, time2)).toBe("100ms")
    })

    it("should return difference in seconds when less than 1 minute", () => {
      const time1: Fixed64 = "1703174400000000000"
      const time2: Fixed64 = "1703174430000000000" // 30 seconds later
      expect(getTimeDifference(time1, time2)).toBe("30.00s")
    })

    it("should return difference in minutes when more than 1 minute", () => {
      const time1: Fixed64 = "1703174400000000000"
      const time2: Fixed64 = "1703174520000000000" // 2 minutes later
      expect(getTimeDifference(time1, time2)).toBe("2.00min")
    })
  })
})
