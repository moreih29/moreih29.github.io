import Link from 'next/link'

interface SeriesPost {
  title: string
  slug: string
  seriesOrder: number
}

interface SeriesNavProps {
  seriesName: string
  posts: SeriesPost[]
  currentSlug: string
}

export function SeriesToc({ seriesName, posts, currentSlug }: SeriesNavProps) {
  const sorted = [...posts].sort((a, b) => a.seriesOrder - b.seriesOrder)

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-5">
      <h3 className="mb-3 text-sm font-semibold text-muted">
        {seriesName}
        <span className="ml-2 text-xs font-normal">({sorted.length}편)</span>
      </h3>
      <ol className="space-y-1.5">
        {sorted.map((post, i) => (
          <li key={post.slug}>
            {post.slug === currentSlug ? (
              <span className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="text-xs text-muted">{i + 1}.</span>
                {post.title}
              </span>
            ) : (
              <Link
                href={`/posts/${post.slug}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <span className="text-xs">{i + 1}.</span>
                {post.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function SeriesPrevNext({ seriesName: _seriesName, posts, currentSlug }: SeriesNavProps) {
  const sorted = [...posts].sort((a, b) => a.seriesOrder - b.seriesOrder)
  const currentIndex = sorted.findIndex((p) => p.slug === currentSlug)
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <nav className="mt-12 grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/posts/${prev.slug}`}
          className="group rounded-xl border border-border bg-card p-4 transition-all hover:bg-card-hover hover:shadow-md"
        >
          <span className="text-xs text-muted">이전 글</span>
          <p className="mt-1 text-sm font-medium group-hover:text-primary transition-colors">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="group rounded-xl border border-border bg-card p-4 text-right transition-all hover:bg-card-hover hover:shadow-md"
        >
          <span className="text-xs text-muted">다음 글</span>
          <p className="mt-1 text-sm font-medium group-hover:text-primary transition-colors">
            {next.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
