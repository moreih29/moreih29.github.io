import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate, getCategoryColor } from '@/lib/utils'

export function FeaturePost({ post }: { post: Post }) {
  const color = getCategoryColor(post.category)

  return (
    <Link href={`/posts/${post.slug}`} className="group block mb-12">
      <div className="relative h-[280px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-50 via-slate-100 to-steel-100 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent dark:from-slate-950/80" />
        <div className="relative flex h-full flex-col justify-end px-10 py-8 md:px-14 md:py-10">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}
            >
              {post.category}
            </span>
            {post.series && (
              <span className="text-xs text-slate-300 dark:text-slate-400">
                {post.series}
              </span>
            )}
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors md:text-3xl line-clamp-2">
            {post.title}
          </h2>
          <p className="mb-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(post.date)}</p>
            <span className="text-xs font-medium text-primary group-hover:underline">
              읽기 →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
