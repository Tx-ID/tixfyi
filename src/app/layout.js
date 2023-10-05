import './globals.css'

import { Lexend } from 'next/font/google'
const lexend = Lexend({ subsets: ['latin'] })

export const metadata = {
  title: `Tix's Portal`,
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night" id="html">
      <body className={lexend.className + " bg-zinc-900 min-w-screen min-h-screen flex flex-col items-center justify-center"}>
        {children}
      </body>
    </html>
  )
}