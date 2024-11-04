import { fireEvent, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { LogsTable, useLogsTableData } from "@/components/features/logs/table"
import { renderWithClient } from "@/tests/utils"

import { mockLogData } from "./test-utils"

vi.mock("@/components/features/logs/table/use-table-data")

describe("LogsTable", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should show loading state when isLoading is true", () => {
    vi.mocked(useLogsTableData).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      getRowId: vi.fn(),
    })

    renderWithClient(<LogsTable />)
    expect(screen.getByRole("table")).toBeDefined()
    expect(screen.getAllByRole("row")).toHaveLength(11)
  })

  it("should display no data message when data is empty", () => {
    vi.mocked(useLogsTableData).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      getRowId: vi.fn(),
    })

    renderWithClient(<LogsTable />)

    const noDataMessage = screen.getByText("No logs found.")
    expect(noDataMessage).toBeDefined()
  })

  it("should render table when data is available", () => {
    const mockData = [mockLogData]
    vi.mocked(useLogsTableData).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      getRowId: (row) => row.timeUnixNano.toString(),
    })

    renderWithClient(<LogsTable />)
    expect(screen.getByRole("table")).toBeDefined()
    expect(screen.getByText(mockLogData?.body?.stringValue as string)).toBeDefined()
  })

  it("should expand and collapse row on click", async () => {
    const mockData = [mockLogData]
    vi.mocked(useLogsTableData).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      getRowId: (row) => row.timeUnixNano.toString(),
    })

    renderWithClient(<LogsTable />)

    const messageCell = screen.getByText(mockLogData?.body?.stringValue as string)
    const row = messageCell.closest("tr")
    expect(row).toBeDefined()

    if (row) {
      fireEvent.click(row)
      expect(screen.getByText("Severity Number")).toBeDefined()
      expect(screen.getByText("Service")).toBeDefined()

      fireEvent.click(row)
      expect(screen.queryByText("Severity Number")).toBeNull()
    }
  })
})
