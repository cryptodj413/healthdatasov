import { AuthProvider } from "@/app/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'HealthDataSov',
  description: "EMR Data Sovereignty Platform - Realizing The People's Revenue Stream with Web3, AI & Vana Blockchain",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </AuthProvider>
      </body>

      {/* <div className="mt-12 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          This app demonstrates VANA DLP integration with Google Drive - footer
        </p>
      </div> */}
    </html>
  )
}
