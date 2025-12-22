import type { BlogPost } from '~/types/blog'
import blogData from '~/data/blog.json'

export const useBlog = () => {
  const { locale } = useI18n()

  const allPosts = computed<BlogPost[]>(() => {
    return blogData.posts as BlogPost[]
  })

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return allPosts.value.find(p => p.slug === slug)
  }

  const getPostsByCategory = (category: string): BlogPost[] => {
    return allPosts.value.filter(p => p.category === category)
  }

  const getLatestPosts = (limit: number = 3): BlogPost[] => {
    return allPosts.value
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit)
  }

  return {
    allPosts,
    getPostBySlug,
    getPostsByCategory,
    getLatestPosts
  }
}
