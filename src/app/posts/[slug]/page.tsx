import { posts } from '#content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXContent } from '@/components/mdx-content'
import { categoryColors } from '@/lib/constants'
import { SeriesToc, SeriesPrevNext } from '@/components/series-nav'

export function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post || !post.published) notFound()

  const color = categoryColors[post.category] ?? categoryColors['General']

  const seriesPosts = post.series
    ? posts
        .filter((p) => p.published && p.series === post.series)
        .map((p) => ({ title: p.title, slug: p.slug, seriesOrder: p.seriesOrder ?? 0 }))
    : []

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}>
            {post.category}
          </span>
          <span className="text-sm text-muted">{new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}</span>
        </div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="rounded-md bg-tag-bg px-2 py-0.5 text-xs text-tag-text hover:bg-primary/10 hover:text-primary transition-colors">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.series && seriesPosts.length > 0 && (
        <SeriesToc
          seriesName={post.series}
          posts={seriesPosts}
          currentSlug={slug}
        />
      )}

      <div className="prose max-w-none dark:prose-invert">
        <MDXContent code={post.body} />
      </div>

      {post.series && seriesPosts.length > 0 && (
        <SeriesPrevNext
          seriesName={post.series}
          posts={seriesPosts}
          currentSlug={slug}
        />
      )}
    </article>
  )
}
