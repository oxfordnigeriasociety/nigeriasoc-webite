import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Oxford Nigeria Society',
  description: 'Championing Nigerian culture within the University of Oxford.',
  openGraph: {
    title: 'Oxford Nigeria Society',
    description: 'Championing Nigerian culture within the University of Oxford.',
    url: 'https://oxfordnigeriasoc.org',
    siteName: 'Oxford Nigeria Society',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
