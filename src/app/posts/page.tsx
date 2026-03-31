import { posts } from '#content'
import { PostList } from '@/components/post-list'

export const metadata = {
  title: 'Posts',
  description: '모든 게시글 목록',
}

export default function PostsPage() {
  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const seriesCounts: Record<string, number> = {}
  for (const post of published) {
    if (post.series) {
      seriesCounts[post.series] = (seriesCounts[post.series] ?? 0) + 1
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Posts</h1>
      <PostList posts={published} seriesCounts={seriesCounts} />
    </main>
  )
}
