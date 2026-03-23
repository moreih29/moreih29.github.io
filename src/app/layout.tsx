import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

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
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="mx-auto max-w-5xl px-4 py-8">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="mb-12 border-b border-border pb-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold">moreih29</a>
          <a href="/" className="text-sm text-muted hover:text-foreground transition-colors">Posts</a>
          <a href="/series" className="text-sm text-muted hover:text-foreground transition-colors">Series</a>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-border pt-8 text-sm text-muted">
      <div className="flex items-center justify-between">
        <p>&copy; 2026 moreih29. All rights reserved.</p>
        <a href="https://github.com/moreih29" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          GitHub
        </a>
      </div>
    </footer>
  )
}
