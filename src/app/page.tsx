import { posts } from '#content'
import Link from 'next/link'

export default function Home() {
  const published = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Posts</h1>
      <ul className="space-y-6">
        {published.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <h2 className="text-xl font-semibold group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{post.date}</p>
              <p className="mt-2 text-gray-600">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
