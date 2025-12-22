import type { Species } from '~/types/species'
import animalsData from '~/data/species/animals.json'
import plantsData from '~/data/species/plants.json'

export const useSpeciesData = () => {
  const { locale } = useI18n()

  const allSpecies = computed<Species[]>(() => {
    const animals = animalsData.animals || []
    const plants = plantsData.plants || []
    return [...animals, ...plants] as Species[]
  })

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
    return allSpecies.value.filter(s => speciesIds.includes(s.id))
  }

  const getFeaturedSpecies = (limit: number = 6): Species[] => {
    return allSpecies.value.slice(0, limit)
  }

  return {
    allSpecies,
    getSpeciesBySlug,
    getSpeciesByCategory,
    getSpeciesByDangerLevel,
    getRelatedSpecies,
    getFeaturedSpecies
  }
}
