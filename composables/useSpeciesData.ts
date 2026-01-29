import type { Species } from '~/types/species'

export const useSpeciesData = () => {
  const { getSpecies } = useApi()

  const { data, pending, error, refresh } = useAsyncData(
    'species-all',
    () => getSpecies({ per_page: 50, sort_by: 'sort', sort_dir: 'asc' })
  )

  const allSpecies = computed<Species[]>(() => (data.value?.data as Species[]) || [])

  const getSpeciesBySlug = (slug: string): Species | undefined => {
    return allSpecies.value.find(s => s.slug === slug)
  }

  const getSpeciesByCategory = (category: 'animal' | 'plant'): Species[] => {
    return allSpecies.value.filter(s => s.category === category)
  }

  const getSpeciesByDangerLevel = (level: string): Species[] => {
    return allSpecies.value.filter(s => s.conservationStatus.level === level)
  }

  const getRelatedSpecies = (speciesIds: string[]): Species[] => {
    return allSpecies.value.filter(s => speciesIds.includes(s.slug))
  }

  const getFeaturedSpecies = (limit: number = 6): Species[] => {
    return allSpecies.value.slice(0, limit)
  }

  return {
    allSpecies,
    pending,
    error,
    refresh,
    getSpeciesBySlug,
    getSpeciesByCategory,
    getSpeciesByDangerLevel,
    getRelatedSpecies,
    getFeaturedSpecies
  }
}