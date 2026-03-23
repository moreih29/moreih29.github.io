import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'moreih29 blog',
  description: '기술 블로그',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="mb-12">
      <nav className="flex items-center justify-between">
        <a href="/" className="text-xl font-bold">moreih29</a>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t pt-8 text-sm text-gray-500">
      <p>© 2026 moreih29. All rights reserved.</p>
    </footer>
  )
}
