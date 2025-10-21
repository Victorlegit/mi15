import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NAVIEROS Y CONSIGNACIONES S.A DE C.V",
  description:
    "Specialists in shipagency, international maritime transport and logistics, we carry breakbulk commodities, steel, project cargo, over-dimensioned, heavylift cargo, and bulk shipments.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
