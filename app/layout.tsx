import { Analytics } from '@vercel/analytics/next'
import { Kanit, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const kanit = Kanit({ subsets: ['latin', 'thai'], variable: '--font-kanit', weight: ['400', '500', '600', '700', '800'] })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'K-pop 韓文金牌導師',
  description: '用 K-pop 歌詞、單字與對話，輕鬆學會實用韓文。',
  generator: 'v0.app',
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#0c0c0c' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant" className={`${kanit.variable} ${geistMono.variable} bg-background`}><body className="font-sans antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
