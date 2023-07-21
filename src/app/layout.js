import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jonathan Holmlund. Remote Web and React Native developer working from Dumfries, Scotland',
  description: 'Personal website of Jonathan Holmlund. ' +
      'A web / react native developer working from the north east of England, working and living in Dumfries, Scotland.' +
      'I work on a variety of projects across the stack to produce simple, maintainable solutions to complex problems.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
