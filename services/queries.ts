import { IExportLogsServiceRequest } from "@opentelemetry/otlp-transformer"
import { useQuery } from "@tanstack/react-query"

const OTLP_LOGS_API_URL = "https://take-home-assignment-otlp-logs-api.vercel.app/api/logs"

export const useGetOTLPLogs = () => {
  return useQuery<IExportLogsServiceRequest>({
    queryKey: ["otlp-logs"],
    queryFn: async () => {
      const res = await fetch(OTLP_LOGS_API_URL)
      if (!res.ok) {
        throw new Error("Failed to fetch logs")
      }
      return res.json()
    },
    retry: 3,
    staleTime: 30000, // 30 seconds
    refetchInterval: 10000, // 10 seconds
  })
}
