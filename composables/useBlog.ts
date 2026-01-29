import type { BlogPost } from '~/types/blog'

export const useBlog = () => {
  const { getBlogPosts } = useApi()

  const { data, pending, error, refresh } = useAsyncData(
    'blog-all',
    () => getBlogPosts({ per_page: 12, sort_by: 'publish_date', sort_dir: 'desc' })
  )

  const allPosts = computed<BlogPost[]>(() => (data.value?.data as BlogPost[]) || [])

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return allPosts.value.find(p => p.slug === slug)
  }

  const getPostsByCategory = (categorySlug: string): BlogPost[] => {
    return allPosts.value.filter(p => p.category?.slug === categorySlug)
  }

  const getLatestPosts = (limit: number = 3): BlogPost[] => {
    return allPosts.value.slice(0, limit)
  }

  return {
    allPosts,
    pending,
    error,
    refresh,
    getPostBySlug,
    getPostsByCategory,
    getLatestPosts
  }
}