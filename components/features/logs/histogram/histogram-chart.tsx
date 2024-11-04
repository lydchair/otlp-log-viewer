"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  count: {
    label: "Count",
  },
} satisfies ChartConfig

interface HistogramChartProps {
  data: Array<{ timestamp: string; count: number }>
}

export default function HistogramChart({ data }: HistogramChartProps) {
  const xAxisConfig = {
    angle: -45,
    textAnchor: "end" as const,
    height: 70,
    interval: 0,
    fontSize: 12,
    tickFormatter: (value: string) => value,
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[400px] min-w-[600px] md:min-w-[800px] xl:min-w-[960px]"
    >
      <LineChart
        width={960}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 40, bottom: xAxisConfig.height }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
        <XAxis
          dataKey="timestamp"
          angle={xAxisConfig.angle}
          textAnchor={xAxisConfig.textAnchor}
          height={xAxisConfig.height}
          interval={xAxisConfig.interval}
          tick={{ fontSize: xAxisConfig.fontSize }}
          tickFormatter={xAxisConfig.tickFormatter}
          className="text-muted-foreground"
        />
        <YAxis
          allowDecimals={false}
          className="text-muted-foreground"
          width={30}
          tickFormatter={(value) => value.toString()}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Line
          type="monotone"
          dataKey="count"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
        />
      </LineChart>
    </ChartContainer>
  )
}
