'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate, getCategoryColor } from '@/lib/utils'
import { Pagination } from '@/components/pagination'

function SeriesCard({
  name,
  category,
  seriesPosts,
}: {
  name: string
  category: string
  seriesPosts: Post[]
}) {
  const sorted = [...seriesPosts].sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
  const color = getCategoryColor(category)
  return (
    <Link href={`/posts/${sorted[0].slug}`} className="group block">
      <article className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:bg-card-hover hover:shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}>
              {category}
            </span>
            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              {sorted.length}편
            </span>
          </div>
        </div>
        <h2 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">
          {name}
        </h2>
        <ol className="mb-3 space-y-1">
          {sorted.map((p, i) => (
            <li key={p.slug} className="text-sm text-muted truncate">
              <span className="mr-1.5 text-xs">{i + 1}.</span>
              {p.title}
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted">
          최근 업데이트 {formatDate(sorted[sorted.length - 1].date)}
        </p>
      </article>
    </Link>
  )
}

function StandaloneCard({ post }: { post: Post }) {
  const color = getCategoryColor(post.category)
  const displayTags = post.tags.slice(0, 2)
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className={`h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-lg${!post.cover ? ' hover:bg-card-hover' : ''}`}>
        {post.cover && (
          <div className="overflow-hidden">
            <img
              src={post.cover}
              alt={post.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col p-6">
          <span className={`mb-3 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}>
            {post.category}
          </span>
          <h2 className="mb-1 text-lg font-semibold group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="mb-3 text-xs text-muted">{formatDate(post.date)}</p>
          <p className="mb-4 flex-1 text-sm text-muted line-clamp-2">
            {post.description}
          </p>
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <span key={tag} className="rounded-md bg-tag-bg px-2 py-0.5 text-xs text-tag-text">
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs text-muted">+{post.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}

const POSTS_PER_PAGE = 9

export function SeriesView({ posts }: { posts: Post[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const categories = Array.from(new Set(posts.map((p) => p.category))).sort()

  const filtered = selected.length === 0 ? posts : posts.filter((p) => selected.includes(p.category))

  // 시리즈 그룹핑
  const seriesMap = new Map<string, { category: string; posts: Post[] }>()
  const standalonePosts: Post[] = []

  for (const post of filtered) {
    if (post.series) {
      const existing = seriesMap.get(post.series)
      if (existing) {
        existing.posts.push(post)
      } else {
        seriesMap.set(post.series, { category: post.category, posts: [post] })
      }
    } else {
      standalonePosts.push(post)
    }
  }

  const seriesList = Array.from(seriesMap.entries())

  const totalPages = Math.ceil(standalonePosts.length / POSTS_PER_PAGE)
  const pagedStandalone = standalonePosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <label
            key={cat}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              selected.includes(cat)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted hover:border-foreground hover:text-foreground'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => {
                setSelected(prev =>
                  prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                )
                setPage(1)
              }}
              className="hidden"
            />
            {cat}
          </label>
        ))}
      </div>

      {seriesList.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">시리즈</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {seriesList.map(([name, data]) => (
              <SeriesCard key={name} name={name} category={data.category} seriesPosts={data.posts} />
            ))}
          </div>
        </section>
      )}

      {standalonePosts.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">독립 글</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pagedStandalone.map((post) => (
              <StandaloneCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </section>
      )}

      {seriesList.length === 0 && standalonePosts.length === 0 && (
        <p className="py-12 text-center text-muted">해당 카테고리에 글이 없습니다.</p>
      )}
    </div>
  )
}
