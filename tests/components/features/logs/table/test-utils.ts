import { IAnyValue, IKeyValue } from "@opentelemetry/otlp-transformer"

import { EnhancedLogRecord } from "@/components/features/logs/table"

export const mockLogData: EnhancedLogRecord = {
  timeUnixNano: 1234567890000000000,
  observedTimeUnixNano: 1234567890000000000,
  severityNumber: 1,
  severityText: "INFO",
  body: { stringValue: "Test log message" } as IAnyValue,
  attributes: [
    { key: "service.name", value: { stringValue: "test-service" } },
    { key: "service.version", value: { stringValue: "1.0.0" } },
  ] as IKeyValue[],
  traceId: "test-trace-id",
  spanId: "test-span-id",
  flags: 1,
  droppedAttributesCount: 0,
  serviceInfo: { name: "test-service", version: "1.0.0", namespace: "default" },
  telemetryInfo: { name: "test-sdk", version: "1.0.0", language: "test-language" },
  scopeInfo: { name: "test-scope" },
}
