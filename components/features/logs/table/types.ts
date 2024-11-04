import { ILogRecord } from "@opentelemetry/otlp-transformer"

export type ServiceInfo = {
  namespace: string | undefined
  name: string | undefined
  version: string | undefined
}

export type TelemetryInfo = {
  name: string | undefined
  language: string | undefined
  version: string | undefined
}

export type ScopeInfo = {
  name: string | undefined
}

export type EnhancedLogRecord = ILogRecord & {
  serviceInfo: ServiceInfo
  telemetryInfo: TelemetryInfo
  scopeInfo: ScopeInfo
}
