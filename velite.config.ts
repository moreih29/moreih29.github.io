import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'

export default defineConfig({
  collections: {
    posts: defineCollection({
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string().max(100),
        slug: s.slug('posts'),
        date: s.isodate(),
        description: s.string().max(200),
        updated: s.isodate().optional(),
        tags: s.array(s.string()).default([]),
        published: s.boolean().default(true),
        series: s.string().optional(),
        seriesOrder: s.number().optional(),
        category: s.string().default('General'),
        metadata: s.metadata(),
        excerpt: s.excerpt(),
        body: s.mdx(),
      }),
    }),
  },
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: { dark: 'github-dark-dimmed', light: 'github-light' },
        keepBackground: false,
      }],
    ],
  },
})
