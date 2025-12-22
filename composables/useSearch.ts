import Fuse from 'fuse.js'
import type { Species } from '~/types/species'

export const useSearch = () => {
  const { allSpecies } = useSpeciesData()
  const { locale } = useI18n()

  const searchQuery = ref('')

  const fuse = computed(() => {
    return new Fuse(allSpecies.value, {
      keys: [
        `name.${locale.value}`,
        'scientificName',
        `description.${locale.value}.short`,
        `description.${locale.value}.full`,
        `habitat.location.${locale.value}`
      ],
      threshold: 0.3,
      includeScore: true
    })
  })

  const searchResults = computed<Species[]>(() => {
    if (!searchQuery.value || searchQuery.value.trim() === '') {
      return allSpecies.value
    }

    const results = fuse.value.search(searchQuery.value)
    return results.map(r => r.item)
  })

  const clearSearch = () => {
    searchQuery.value = ''
  }

  return {
    searchQuery,
    searchResults,
    clearSearch
  }
}
