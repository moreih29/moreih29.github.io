import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { SearchTrigger } from '@/components/search-trigger'
import { ProgressBar } from '@/components/progress-bar'
import { posts } from '#content'

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '100 900',
})

const jetbrainsMono = localFont({
  src: [
    { path: '../fonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/JetBrainsMono-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'moreih29 blog',
  description: '기술 블로그',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchPosts = posts
    .filter((p) => p.published)
    .map(({ title, slug, description, tags, category, date }) => ({
      title,
      slug,
      description,
      tags,
      category,
      date,
    }))

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${pretendard.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}>
        <ProgressBar />
        <ThemeProvider>
          <div className="mx-auto max-w-5xl px-4 py-8">
            <Header searchPosts={searchPosts} />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

function Header({ searchPosts }: { searchPosts: import('@/components/search-trigger').SearchPost[] }) {
  return (
    <header className="mb-12 border-b border-border pb-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1 text-xl font-bold">
            <img src="/icon.png" alt="moreih29" width={24} height={24} className="rounded-full dark:hidden" />
            <img src="/icon-dark.png" alt="moreih29" width={24} height={24} className="rounded-full hidden dark:block" />
            moreih29
          </Link>
          <Link href="/posts" className="text-sm text-muted hover:text-foreground transition-colors">Posts</Link>
          <Link href="/series" className="text-sm text-muted hover:text-foreground transition-colors">Series</Link>
          <Link href="/tags" className="text-sm text-muted hover:text-foreground transition-colors">Tags</Link>
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger posts={searchPosts} />
          <ThemeToggle />
        </div>
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
