export const OTLP_ATTRIBUTES = {
  SERVICE: {
    NAMESPACE: "service.namespace",
    NAME: "service.name",
    VERSION: "service.version",
  },
  TELEMETRY: {
    SDK_NAME: "telemetry.sdk.name",
    SDK_LANGUAGE: "telemetry.sdk.language",
    SDK_VERSION: "telemetry.sdk.version",
  },
} as const

export const SEVERITY_OPTIONS = [
  { label: "ERROR", value: "ERROR" },
  { label: "INFO", value: "INFO" },
  { label: "WARN", value: "WARN" },
  { label: "DEBUG", value: "DEBUG" },
  { label: "TRACE", value: "TRACE" },
]
