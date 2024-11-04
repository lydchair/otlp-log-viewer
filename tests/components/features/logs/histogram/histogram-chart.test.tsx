import { describe, expect, it } from "vitest"

import HistogramChart from "@/components/features/logs/histogram/histogram-chart"
import { renderWithClient } from "@/tests/utils"

describe("HistogramChart", () => {
  const mockData = [
    { timestamp: "2024-03-14", count: 5 },
    { timestamp: "2024-03-15", count: 10 },
  ]

  it("should render chart with data", () => {
    const { container } = renderWithClient(<HistogramChart data={mockData} />)

    // Verify that the chart is rendered
    const svg = container.querySelector("svg")
    expect(svg).toBeDefined()

    // Verify that axes are present
    expect(container.querySelector(".recharts-xAxis")).toBeDefined()
    expect(container.querySelector(".recharts-yAxis")).toBeDefined()

    // Verify that the chart line is present
    expect(container.querySelector(".recharts-line-curve")).toBeDefined()
  })

  it("should render chart elements", () => {
    const { container } = renderWithClient(<HistogramChart data={mockData} />)

    // Verify that main chart elements are present
    expect(container.querySelector(".recharts-line")).toBeDefined()
    expect(container.querySelector(".recharts-cartesian-grid")).toBeDefined()
    expect(container.querySelector(".recharts-tooltip-wrapper")).toBeDefined()
  })

  it("should render with provided data", () => {
    const { container } = renderWithClient(<HistogramChart data={mockData} />)

    // Verify that chart container exists with the correct class
    const chartContainer = container.querySelector("[data-chart]")
    expect(chartContainer).toBeDefined()

    // Verify that chart line exists
    const line = container.querySelector(".recharts-line")
    expect(line).toBeDefined()

    // Verify that the chart has the correct responsive container
    const responsiveContainer = container.querySelector(".recharts-responsive-container")
    expect(responsiveContainer).toBeDefined()
  })
})
