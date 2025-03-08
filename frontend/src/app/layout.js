import { Space_Grotesk } from 'next/font/google'
import CustomLayout from './CustomLayout'
import './globals.css'

const space = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Researchify Assignment',
  description: 'Researchify Assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={space.className}>
        <CustomLayout>
          {children}
        </CustomLayout>
      </body>
    </html>
  )
}
