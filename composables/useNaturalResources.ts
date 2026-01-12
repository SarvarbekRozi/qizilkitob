import type { NaturalResource } from '~/types/natural-resource'
import resourcesData from '~/data/natural-resources.json'

export const useNaturalResources = () => {
  const resources = resourcesData.resources as NaturalResource[]
  const allResources = ref<NaturalResource[]>(resources)

  const getResourceBySlug = (slug: string): NaturalResource | undefined => {
    return resources.find(resource => resource.slug === slug)
  }

  const getLatestResources = (limit: number = 6): NaturalResource[] => {
    return resources.slice(0, limit)
  }

  return {
    allResources,
    getResourceBySlug,
    getLatestResources
  }
}
