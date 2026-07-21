import type { Metadata } from 'next'
import './globals.css'

import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#ff0000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'مَشّاية',
  description: 'منصة تفاعلية لمواكب الأربعين',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'مَشّاية',
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
