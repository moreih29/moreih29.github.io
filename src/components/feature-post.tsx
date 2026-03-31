import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate, getCategoryColor } from '@/lib/utils'

export function FeaturePost({ post }: { post: Post }) {
  const color = getCategoryColor(post.category)

  return (
    <Link href={`/posts/${post.slug}`} className="group block mb-12">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card border-t-2 border-t-[#94a3b8] shadow-[var(--shadow-raised)]">
        <div className="flex flex-col px-10 py-8 md:px-14 md:py-10">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}
            >
              {post.category}
            </span>
            {post.series && (
              <span className="text-xs text-muted">
                {post.series}
              </span>
            )}
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground group-hover:text-primary transition-colors md:text-3xl line-clamp-2">
            {post.title}
          </h2>
          <p className="mb-3 max-w-2xl text-sm text-muted line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted">{formatDate(post.date)}</p>
            <span className="text-xs font-medium text-primary group-hover:underline">
              읽기 →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
