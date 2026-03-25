'use client'

import { useState, useEffect, useRef } from 'react'

interface TocItem {
  title: string
  url: string
  items?: TocItem[]
}

interface FlatTocItem {
  title: string
  url: string
  depth: number
}

function flattenToc(items: TocItem[], depth = 2): FlatTocItem[] {
  return items.flatMap((item) => [
    { title: item.title, url: item.url, depth },
    ...(item.items ? flattenToc(item.items, depth + 1) : []),
  ])
}

function TocList({
  items,
  activeId,
  onItemClick,
}: {
  items: TocItem[]
  activeId: string
  onItemClick?: () => void
}) {
  const flat = flattenToc(items)
  return (
    <ol className="space-y-1.5">
      {flat.map((item) => {
        const id = item.url.replace('#', '')
        const isActive = activeId === id
        const isH3 = item.depth >= 3
        return (
          <li key={item.url} className={isH3 ? 'pl-4' : ''}>
            <a
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.url.slice(1))?.scrollIntoView({ behavior: 'smooth' })
                onItemClick?.()
              }}
              className={[
                'block transition-colors leading-snug',
                isH3 ? 'text-xs' : 'text-sm font-medium',
                isActive
                  ? 'text-primary'
                  : 'text-muted hover:text-foreground',
              ].join(' ')}
            >
              {item.title}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

export function InlineToc({ toc }: { toc: TocItem[] }) {
  const [open, setOpen] = useState(true)

  if (!toc || toc.length === 0) return null

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-sm font-semibold text-muted hover:text-foreground transition-colors"
      >
        <span>목차</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-3">
          <TocList items={toc} activeId="" />
        </div>
      )}
    </div>
  )
}

export function FloatingToc({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!toc || toc.length === 0) return

    const flat = flattenToc(toc)
    const ids = flat.map((item) => item.url.replace('#', ''))

    observerRef.current?.disconnect()

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0% -60% 0%',
      threshold: 0,
    })

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [toc])

  if (!toc || toc.length === 0) return null

  return (
    <div className="hidden xl:block fixed top-24 w-52 max-h-[calc(100vh-8rem)] overflow-y-auto" style={{ left: 'calc(50% + 420px)' }}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">목차</p>
      <TocList items={toc} activeId={activeId} />
    </div>
  )
}
