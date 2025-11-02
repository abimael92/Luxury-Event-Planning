import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Poppins, Inter, Playfair_Display, } from "next/font/google"
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


const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
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
      <body className={`relative min-h-screen font-sans ${poppins.variable} ${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
        {/* Global background */}
        <div className="absolute inset-0 -z-50">
          {/* Repeating pattern */}
          <div className="absolute inset-0 bg-[url('/luxury-event-planning-background-pattern.jpg')] bg-repeat [background-size:200px_200px] opacity-50" />
          {/* Color overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-secondary/40 to-accent/60 mix-blend-multiply" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/60 via-pink-400/40 to-blue-500/60" />
        </div>

        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

