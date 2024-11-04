import {
  IExportLogsServiceRequest,
  ILogRecord,
  IResourceLogs,
  IScopeLogs,
} from "@opentelemetry/otlp-transformer"
import { UseQueryResult } from "@tanstack/react-query"
import { renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { useHistogramData } from "@/components/features/logs/histogram/use-histogram-data"
import { useGetOTLPLogs } from "@/services/queries"

vi.mock("@/services/queries", () => ({
  useGetOTLPLogs: vi.fn(),
}))

describe("useHistogramData", () => {
  const createMockLogRecord = (timeUnixNano: string): ILogRecord => ({
    timeUnixNano,
    observedTimeUnixNano: timeUnixNano,
    severityNumber: 1,
    severityText: "INFO",
    body: { stringValue: "test" },
    attributes: [],
    droppedAttributesCount: 0,
    flags: 1,
    traceId: "",
    spanId: "",
  })

  const createSuccessQueryResult = (
    data: IExportLogsServiceRequest
  ): UseQueryResult<IExportLogsServiceRequest, Error> => ({
    data,
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: null,
    status: "success",
    isFetching: false,
    isPending: false,
    isRefetching: false,
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    isLoadingError: false,
    isPaused: false,
    isPlaceholderData: false,
    isRefetchError: false,
    isStale: false,
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: 0,
    fetchStatus: "idle",
    refetch: vi.fn().mockResolvedValue({ data, isSuccess: true }),
    isFetched: false,
    isFetchedAfterMount: false,
    isInitialLoading: false,
    promise: Promise.resolve(data),
  })

  const createLoadingQueryResult = (): UseQueryResult<IExportLogsServiceRequest, Error> => ({
    data: undefined,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: null,
    status: "pending",
    isFetching: true,
    isPending: true,
    isRefetching: false,
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    isLoadingError: false,
    isPaused: false,
    isPlaceholderData: false,
    isRefetchError: false,
    isStale: false,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    fetchStatus: "fetching",
    refetch: vi.fn(),
    isFetched: false,
    isFetchedAfterMount: false,
    isInitialLoading: true,
    promise: Promise.resolve() as unknown as Promise<IExportLogsServiceRequest>,
  })

  it("should transform logs data into histogram data by day", () => {
    const mockLogRecords: ILogRecord[] = [
      createMockLogRecord("1710374400000000000"), // 2024-03-14
      createMockLogRecord("1710460800000000000"), // 2024-03-15
      createMockLogRecord("1710460800000000000"), // 2024-03-15
    ]

    const mockData: IExportLogsServiceRequest = {
      resourceLogs: [
        {
          resource: {
            attributes: [],
            droppedAttributesCount: 0,
          },
          scopeLogs: [
            {
              scope: { name: "test" },
              logRecords: mockLogRecords,
            },
          ] as IScopeLogs[],
        },
      ] as IResourceLogs[],
    }

    vi.mocked(useGetOTLPLogs).mockReturnValue(createSuccessQueryResult(mockData))

    const { result } = renderHook(() => useHistogramData("day"))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.histogramData).toHaveLength(2)
    expect(result.current.histogramData[0].count).toBe(1) // 14 de marzo
    expect(result.current.histogramData[1].count).toBe(2) // 15 de marzo
  })

  it("should transform logs data into histogram data by hour", () => {
    const mockLogRecords: ILogRecord[] = [
      createMockLogRecord("1710374400000000000"), // 2024-03-14 00:00
      createMockLogRecord("1710378000000000000"), // 2024-03-14 01:00
      createMockLogRecord("1710378000000000000"), // 2024-03-14 01:00
    ]

    const mockData: IExportLogsServiceRequest = {
      resourceLogs: [
        {
          resource: {
            attributes: [],
            droppedAttributesCount: 0,
          },
          scopeLogs: [
            {
              scope: { name: "test" },
              logRecords: mockLogRecords,
            },
          ] as IScopeLogs[],
        },
      ] as IResourceLogs[],
    }

    vi.mocked(useGetOTLPLogs).mockReturnValue(createSuccessQueryResult(mockData))

    const { result } = renderHook(() => useHistogramData("hour"))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.histogramData).toHaveLength(2)
    expect(result.current.histogramData[0].count).toBe(1) // 00:00
    expect(result.current.histogramData[1].count).toBe(2) // 01:00
  })

  it("should handle loading state", () => {
    vi.mocked(useGetOTLPLogs).mockReturnValue(createLoadingQueryResult())

    const { result } = renderHook(() => useHistogramData("day"))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.histogramData).toEqual([])
  })

  it("should handle empty data", () => {
    const emptyData: IExportLogsServiceRequest = {
      resourceLogs: [],
    }

    vi.mocked(useGetOTLPLogs).mockReturnValue(createSuccessQueryResult(emptyData))

    const { result } = renderHook(() => useHistogramData("day"))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.histogramData).toEqual([])
  })
})
