import { useCallback, useMemo } from "react"
import { IKeyValue } from "@opentelemetry/otlp-transformer"

import { useGetOTLPLogs } from "@/services/queries"

import { OTLP_ATTRIBUTES } from "./constants"
import { EnhancedLogRecord } from "./types"

/**
 * Helper function to safely extract attribute values from OpenTelemetry key-value pairs
 * @param attributes - Array of OpenTelemetry key-value attribute pairs
 * @param key - The attribute key to search for
 * @returns The string value of the attribute if found, undefined otherwise
 */
const extractAttributeValue = (
  attributes: IKeyValue[] | undefined,
  key: string
): string | undefined => {
  try {
    const attribute = attributes?.find((attr) => attr.key === key)
    return attribute?.value?.stringValue ?? undefined
  } catch (error) {
    console.warn(`Error extracting attribute ${key}:`, error)
    return undefined
  }
}

/**
 * Custom hook to fetch and transform OpenTelemetry logs data for table display
 * @returns Object containing:
 * - data: Transformed log records with enhanced service, telemetry, and scope information
 * - isLoading: Loading state of the data fetch
 * - getRowId: Callback function to generate unique row IDs
 */
export function useLogsTableData() {
  const { data, isLoading, isError } = useGetOTLPLogs()

  // Transform raw OTLP logs into a flattened array of enhanced log records
  const transformedData = useMemo(() => {
    if (!data) return []

    try {
      return (
        data?.resourceLogs
          ?.flatMap((resourceLog) => {
            // Extract service-level metadata from resource attributes
            const serviceInfo = {
              namespace: extractAttributeValue(
                resourceLog.resource?.attributes,
                OTLP_ATTRIBUTES.SERVICE.NAMESPACE
              ),
              name: extractAttributeValue(
                resourceLog.resource?.attributes,
                OTLP_ATTRIBUTES.SERVICE.NAME
              ),
              version: extractAttributeValue(
                resourceLog.resource?.attributes,
                OTLP_ATTRIBUTES.SERVICE.VERSION
              ),
            }

            return resourceLog.scopeLogs?.flatMap((scopeLog) => {
              // Extract telemetry SDK information from scope attributes
              const telemetryInfo = {
                name: extractAttributeValue(
                  scopeLog.scope?.attributes,
                  OTLP_ATTRIBUTES.TELEMETRY.SDK_NAME
                ),
                language: extractAttributeValue(
                  scopeLog.scope?.attributes,
                  OTLP_ATTRIBUTES.TELEMETRY.SDK_LANGUAGE
                ),
                version: extractAttributeValue(
                  scopeLog.scope?.attributes,
                  OTLP_ATTRIBUTES.TELEMETRY.SDK_VERSION
                ),
              }

              // Extract scope name information
              const scopeInfo = {
                name: scopeLog.scope?.name,
              }

              // Combine log record with extracted metadata
              return scopeLog.logRecords?.map((logRecord) => ({
                ...logRecord,
                serviceInfo,
                telemetryInfo,
                scopeInfo,
              }))
            })
          })
          // Filter out any undefined values and type assert the result
          .filter((log): log is EnhancedLogRecord => log !== undefined) ?? []
      )
    } catch (error) {
      console.error("Error transforming logs data:", error)
      return []
    }
  }, [data])

  // Generate unique row IDs using the log record's timestamp
  const getRowId = useCallback((row: EnhancedLogRecord) => row.timeUnixNano.toString(), [])

  return {
    data: transformedData,
    isLoading,
    isError,
    getRowId,
  }
}
