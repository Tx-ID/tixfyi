import './globals.css'

import Image from 'next/image'
import { Geist } from 'next/font/google'
const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'tix.fyi',
  description: `hi, i'm tix`,

  metadataBase: new URL('https://tix.fyi'),

  openGraph: {
    title: 'tix.fyi',
    description: `hi, i'm tix`,
    url: 'https://tix.fyi',
    siteName: 'tix.fyi',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'tix.fyi',
    description: `hi, i'm tix`,
  },
}

export const viewport = {
  themeColor: '#09090b',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={geist.className + " bg-zinc-950 text-zinc-100 min-h-[100dvh] relative"}>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image alt="" src="/background.jpg" fill priority className="object-cover opacity-[0.04]" />
        </div>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
