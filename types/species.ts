export interface Species {
  id: string
  slug: string
  category: 'animal' | 'plant'
  dangerLevel: 'critically_endangered' | 'endangered' | 'vulnerable' | 'near_threatened'
  name: {
    en: string
    uz: string
  }
  scientificName: string
  description: {
    en: {
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
    main: string
    gallery?: string[]
  }
  stats: {
    mass?: string
    speed?: string
    lifespan: string
    diet?: string
    height?: string
    bloomPeriod?: string
    habitat?: string
  }
  habitat: {
    location: {
      en: string
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
      uz: string[]
    }
  }
  relatedSpecies: string[]
}

export interface SpeciesData {
  animals?: Species[]
  plants?: Species[]
}
