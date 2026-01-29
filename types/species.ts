export interface Species {
  id: string
  slug: string
  category: 'animal' | 'plant'
  dangerLevel: 'critically_endangered' | 'endangered' | 'vulnerable' | 'near_threatened'
  name: {
    en: string
    ru: string
    uz: string
  }
  scientificName: string
  description: {
    en: {
      short: string
      full: string
      bullets: string[]
    }
    ru: {
      short: string
      full: string
      bullets: string[]
    }
    uz: {
      short: string
      full: string
      bullets: string[]
    }
  }
  images: {
    main: string | null
    gallery?: string[]
  }
  stats?: {
    mass?: string
    speed?: string
    lifespan?: string
    diet?: string
    height?: string
    bloomPeriod?: string
    habitat?: string
  }
  habitat: {
    location: {
      en: string
      ru: string
      uz: string
    }
    coordinates: {
      lat: number
      lng: number
    }
  }
  conservationStatus: {
    level: string
    population: string
    threats: {
      en: string[]
      ru: string[]
      uz: string[]
    }
  }
  relatedSpecies: string[]
  viewsCount?: number
  featured?: boolean
}

export interface SpeciesData {
  animals?: Species[]
  plants?: Species[]
}
