import type { Metadata } from "next"

import { TanstackQueryProvider } from "@/components/common/providers/tanstack-query"

import "./globals.css"

export const metadata: Metadata = {
  title: "LogScope - OpenTelemetry Log Explorer",
  description:
    "A modern web interface for exploring, analyzing and visualizing OpenTelemetry logs with advanced filtering and visualization capabilities.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  )
}
