import {
  IExportLogsServiceRequest,
  IResourceLogs,
  IScopeLogs,
} from "@opentelemetry/otlp-transformer"
import { UseQueryResult } from "@tanstack/react-query"
import { renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { useLogsTableData } from "@/components/features/logs/table"
import { useGetOTLPLogs } from "@/services/queries"

import { mockLogData } from "./test-utils"

vi.mock("@/services/queries", () => ({
  useGetOTLPLogs: vi.fn(),
}))

describe("useLogsTableData", () => {
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

  it("should return loading state", () => {
    vi.mocked(useGetOTLPLogs).mockReturnValue(createLoadingQueryResult())

    const { result } = renderHook(() => useLogsTableData())
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toEqual([])
  })

  it("should transform and return log data", () => {
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
              logRecords: [mockLogData],
            },
          ] as IScopeLogs[],
        },
      ] as IResourceLogs[],
    }

    vi.mocked(useGetOTLPLogs).mockReturnValue(createSuccessQueryResult(mockData))

    const { result } = renderHook(() => useLogsTableData())
    expect(result.current.data).toHaveLength(1)
    expect(result.current.isLoading).toBe(false)
  })

  it("should filter logs correctly", () => {
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
              logRecords: [mockLogData],
            },
          ] as IScopeLogs[],
        },
      ] as IResourceLogs[],
    }

    vi.mocked(useGetOTLPLogs).mockReturnValue(createSuccessQueryResult(mockData))
  })
})
