import type { NaturalResource } from '~/types/natural-resource'

export const useNaturalResources = () => {
  const { getNaturalResources } = useApi()

  const { data, pending, error, refresh } = useAsyncData(
    'natural-resources-all',
    () => getNaturalResources({ per_page: 12, sort_by: 'sort', sort_dir: 'asc' })
  )

  const allResources = computed<NaturalResource[]>(() => (data.value?.data as NaturalResource[]) || [])

  const getResourceBySlug = (slug: string): NaturalResource | undefined => {
    return allResources.value.find(resource => resource.slug === slug)
  }

  const getLatestResources = (limit: number = 6): NaturalResource[] => {
    return allResources.value.slice(0, limit)
  }

  return {
    allResources,
    pending,
    error,
    refresh,
    getResourceBySlug,
    getLatestResources
  }
}