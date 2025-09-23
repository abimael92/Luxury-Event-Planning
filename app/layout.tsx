import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Planora - Luxury Event Planning",
  description: "Premium event planning marketplace for luxury experiences",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`relative min-h-screen font-sans ${poppins.variable} ${inter.variable} ${playfair.variable}`}
      >
        {/* Global background */}
        <div className="absolute inset-0 -z-10">
          {/* Repeating pattern */}
          <div className="absolute inset-0 bg-[url('/luxury-event-planning-background-pattern.jpg')] bg-repeat [background-size:200px_200px] opacity-5" />
          {/* Color overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 mix-blend-multiply" />
        </div>

        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

