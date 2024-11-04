import { LogsHistogram } from "@/components/features/logs/histogram/histogram"
import { LogsTable } from "@/components/features/logs/table/table"

export default function Home() {
  return (
    <div className="min-h-screen px-2 py-4 sm:p-8">
      <main className="mx-auto max-w-[1000px] space-y-8">
        <h1 className="text-2xl font-bold sm:text-4xl">OTLP Logs</h1>
        <div className="space-y-8">
          <LogsTable />
          <LogsHistogram />
        </div>
      </main>
    </div>
  )
}
