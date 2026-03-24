import { posts } from '#content'
import Link from 'next/link'

export const metadata = {
  title: 'Tags — moreih29 blog',
  description: '모든 태그 목록',
}

export default function TagsPage() {
  const published = posts.filter((p) => p.published)

  const tagMap = new Map<string, number>()
  for (const post of published) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }

  const sortedByFreq = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1])
  const sortedAlpha = Array.from(tagMap.entries()).sort((a, b) => a[0].localeCompare(b[0]))

  const maxCount = Math.max(...tagMap.values(), 1)
  const minCount = Math.min(...tagMap.values(), 1)

  function getFontSize(count: number) {
    if (maxCount === minCount) return 'text-base'
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio >= 0.8) return 'text-2xl font-bold'
    if (ratio >= 0.6) return 'text-xl font-semibold'
    if (ratio >= 0.4) return 'text-lg'
    if (ratio >= 0.2) return 'text-base'
    return 'text-sm'
  }

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Tags</h1>
        <p className="mt-2 text-sm text-muted">{tagMap.size}개의 태그</p>
      </header>

      <section className="mb-12 rounded-xl border border-border bg-card p-8">
        <div className="flex flex-wrap gap-4 leading-loose">
          {sortedByFreq.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className={`${getFontSize(count)} text-muted hover:text-primary transition-colors`}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-xl font-semibold">전체 태그</h2>
        <ul className="divide-y divide-border">
          {sortedAlpha.map(([tag, count]) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="flex items-center justify-between py-3 text-sm hover:text-primary transition-colors"
              >
                <span>#{tag}</span>
                <span className="text-muted">{count}개</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
