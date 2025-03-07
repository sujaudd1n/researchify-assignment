import { Inter } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Researchify Assignment',
  description: 'Researchify Assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={space.className}>{children}</body>
    </html>
  )
}
