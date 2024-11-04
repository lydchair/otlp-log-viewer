import { Card, CardContent } from "@/components/ui/card"

import { EnhancedLogRecord } from "./types"
import { formatTime, getTimeDifference } from "./utils"

interface ExpandedLogDetailsProps {
  log: EnhancedLogRecord
}

export function ExpandedLogDetails({ log }: ExpandedLogDetailsProps) {
  return (
    <Card className="bg-muted/50">
      <CardContent className="space-y-2 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium sm:text-sm">Severity Number</p>
            <p className="text-xs text-muted-foreground sm:text-sm">{log.severityNumber}</p>
          </div>
          <div>
            <p className="text-xs font-medium sm:text-sm">Observed Time</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {formatTime(log.observedTimeUnixNano).date}{" "}
              {formatTime(log.observedTimeUnixNano).time}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium sm:text-sm">Service</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {log.serviceInfo.name} ({log.serviceInfo.namespace})
            </p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Version: {log.serviceInfo.version}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium sm:text-sm">Telemetry SDK</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {log.telemetryInfo.name} ({log.telemetryInfo.language})
            </p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Version: {log.telemetryInfo.version}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium sm:text-sm">Collection Latency</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {getTimeDifference(log.timeUnixNano, log.observedTimeUnixNano)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium sm:text-sm">Scope</p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {log.scopeInfo.name || "N/A"}
            </p>
          </div>
          {log.attributes && log.attributes.length > 0 && (
            <div className="col-span-1 sm:col-span-2">
              <p className="text-xs font-medium sm:text-sm">Attributes</p>
              <pre className="mt-1 overflow-x-auto rounded-md bg-muted p-2 text-xs sm:text-sm">
                {JSON.stringify(log.attributes, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
