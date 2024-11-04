import { fireEvent, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { LogsHistogram, useHistogramData } from "@/components/features/logs/histogram"
import { renderWithClient } from "@/tests/utils"

vi.mock("@/components/features/logs/histogram/use-histogram-data")

describe("LogsHistogram", () => {
  it("should show loading state", () => {
    vi.mocked(useHistogramData).mockReturnValue({
      histogramData: [],
      isLoading: true,
      isError: false,
    })

    renderWithClient(<LogsHistogram />)
    expect(screen.getByText("Loading logs...")).toBeDefined()
  })

  it("should render histogram with data", () => {
    const mockData = [
      { timestamp: "2024-03-14", count: 5 },
      { timestamp: "2024-03-15", count: 10 },
    ]

    vi.mocked(useHistogramData).mockReturnValue({
      histogramData: mockData,
      isLoading: false,
      isError: false,
    })

    renderWithClient(<LogsHistogram />)
    expect(screen.getByText("Log Distribution Over Time")).toBeDefined()
    expect(screen.getByText("Total Logs: 15")).toBeDefined()
  })

  it("should handle grouping change", () => {
    const mockData = [{ timestamp: "2024-03-14", count: 5 }]
    vi.mocked(useHistogramData).mockReturnValue({
      histogramData: mockData,
      isLoading: false,
      isError: false,
    })

    renderWithClient(<LogsHistogram />)

    const select = screen.getByRole("combobox")
    expect(select).toBeDefined()

    fireEvent.click(select)
    const hourOption = screen.getByRole("option", { name: "By Hour" })
    fireEvent.click(hourOption)

    // Verificar que useHistogramData fue llamado con el nuevo grouping
    expect(useHistogramData).toHaveBeenCalledWith("hour")
  })
})
