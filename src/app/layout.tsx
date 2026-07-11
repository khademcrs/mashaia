import type { Metadata } from 'next'
import './globals.css'


export const viewport = {
  themeColor: '#ff0000',
}

export const metadata: Metadata = {
  title: 'مشاية',
  description: 'منصة تفاعلية لمواكب الأربعين',
  appleWebApp: {
    title: 'مشاية',
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
        <link rel="apple-touch-icon" href="/icon.svg?v=2" />
      </head>
      <body>{children}</body>
    </html>
  )
}
