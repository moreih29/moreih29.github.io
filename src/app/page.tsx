import { posts } from '#content'
import { CategoryFilter } from '@/components/category-filter'

export default function Home() {
  const published = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Posts</h1>
      <CategoryFilter posts={published} />
    </div>
  )
}
