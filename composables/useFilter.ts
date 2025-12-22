import type { Species } from '~/types/species'

export const useFilter = () => {
  const { allSpecies } = useSpeciesData()

  const filters = reactive({
    category: 'all' as 'all' | 'animal' | 'plant',
    dangerLevel: 'all' as 'all' | 'critically_endangered' | 'endangered' | 'vulnerable' | 'near_threatened'
  })

  const filteredSpecies = computed<Species[]>(() => {
    let result = allSpecies.value

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter(s => s.category === filters.category)
    }

    // Filter by danger level
    if (filters.dangerLevel !== 'all') {
      result = result.filter(s => s.conservationStatus.level === filters.dangerLevel)
    }

    return result
  })

  const resetFilters = () => {
    filters.category = 'all'
    filters.dangerLevel = 'all'
  }

  const setCategory = (category: typeof filters.category) => {
    filters.category = category
  }

  const setDangerLevel = (level: typeof filters.dangerLevel) => {
    filters.dangerLevel = level
  }

  return {
    filters,
    filteredSpecies,
    resetFilters,
    setCategory,
    setDangerLevel
  }
}
