import { fireEvent, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { HistogramHeader } from "@/components/features/logs/histogram/histogram-header"
import { renderWithClient } from "@/tests/utils"

describe("HistogramHeader", () => {
  const defaultProps = {
    totalLogs: 15,
    grouping: "day" as const,
    onGroupingChange: vi.fn(),
  }

  it("should render total logs count", () => {
    renderWithClient(<HistogramHeader {...defaultProps} />)
    expect(screen.getByText("Total Logs: 15")).toBeDefined()
  })

  it("should render title", () => {
    renderWithClient(<HistogramHeader {...defaultProps} />)
    expect(screen.getByText("Log Distribution Over Time")).toBeDefined()
  })

  it("should handle grouping change", () => {
    renderWithClient(<HistogramHeader {...defaultProps} />)

    const select = screen.getByRole("combobox")
    fireEvent.click(select)

    const hourOption = screen.getByRole("option", { name: "By Hour" })
    fireEvent.click(hourOption)

    expect(defaultProps.onGroupingChange).toHaveBeenCalledWith("hour")
  })
})
