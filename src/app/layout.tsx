import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CannabisQueryProvider } from '@/providers/query-provider'
import { CannabisThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CultivateCo - Cannabis Business Management',
  description: 'Professional cannabis dispensary management platform with compliance tracking and business intelligence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CannabisThemeProvider>
          <CannabisQueryProvider>
            {children}
          </CannabisQueryProvider>
        </CannabisThemeProvider>
      </body>
    </html>
  )
}
