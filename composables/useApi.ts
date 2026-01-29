import type { FetchOptions } from 'ofetch'

export interface ApiResponse<T> {
  success: boolean
  result: T
  msg?: string
  error?: unknown
  code?: string | number | null
}

export const useApi = () => {
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const headers = {
      'Accept-Language': locale.value,
      ...(options.headers || {})
    }

    const response = await $fetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.success) {
      throw createError({
        statusCode: 500,
        statusMessage: response.msg || 'API error'
      })
    }

    return response.result
  }

  const getSpecies = (params: Record<string, any> = {}) => fetchApi<{ data: any[]; pagination?: any }>(`/species`, { params })
  const getSpeciesBySlug = (slug: string) => fetchApi<{ data: any; related?: any[] }>(`/species/${slug}`)
  const getFeaturedSpecies = (limit = 6) => fetchApi<{ data: any[] }>(`/species/featured`, { params: { limit } })
  const getSpeciesStats = () => fetchApi<{ data: any }>(`/species/stats`)
  const getSpeciesForMap = () => fetchApi<{ data: any[] }>(`/species/map`)
  const getSpeciesGallery = (params: Record<string, any> = {}) => fetchApi<{ data: any[]; pagination?: any }>(`/species/gallery`, { params })

  const getNaturalResources = (params: Record<string, any> = {}) => fetchApi<{ data: any[]; pagination?: any }>(`/natural-resources`, { params })
  const getNaturalResourceBySlug = (slug: string) => fetchApi<{ data: any; related?: any[] }>(`/natural-resources/${slug}`)
  const getFeaturedResources = (limit = 6) => fetchApi<{ data: any[] }>(`/natural-resources/featured`, { params: { limit } })
  const getLatestResources = (limit = 6) => fetchApi<{ data: any[] }>(`/natural-resources/latest`, { params: { limit } })
  const getResourceCategories = () => fetchApi<{ data: any[] }>(`/natural-resources/categories`)

  const getBlogPosts = (params: Record<string, any> = {}) => fetchApi<{ data: any[]; pagination?: any }>(`/blog`, { params })
  const getBlogPostBySlug = (slugOrId: string) => fetchApi<{ data: any; related?: any[] }>(`/blog/${slugOrId}`)
  const getLatestPosts = (limit = 5) => fetchApi<{ data: any[] }>(`/blog/latest`, { params: { limit } })
  const getPopularPosts = (limit = 5) => fetchApi<{ data: any[] }>(`/blog/popular`, { params: { limit } })
  const getBlogCategories = () => fetchApi<{ data: any[] }>(`/blog/categories`)
  const getPostComments = (postId: string | number) => fetchApi<{ data: any[]; total?: number }>(`/blog/${postId}/comments`)
  const addPostComment = (postId: string | number, body: { message: string; author?: string; reply_to?: number | null }) =>
    fetchApi<{ message: string; data: any }>(`/blog/${postId}/comments`, { method: 'POST', body })

  const submitContact = (body: { name: string; email: string; subject?: string; message: string }) =>
    fetchApi<{ message: string; id: number }>(`/contact`, { method: 'POST', body })

  return {
    getSpecies,
    getSpeciesBySlug,
    getFeaturedSpecies,
    getSpeciesStats,
    getSpeciesForMap,
    getSpeciesGallery,
    getNaturalResources,
    getNaturalResourceBySlug,
    getFeaturedResources,
    getLatestResources,
    getResourceCategories,
    getBlogPosts,
    getBlogPostBySlug,
    getLatestPosts,
    getPopularPosts,
    getBlogCategories,
    getPostComments,
    addPostComment,
    submitContact
  }
}