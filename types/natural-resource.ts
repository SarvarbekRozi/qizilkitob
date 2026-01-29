export interface NaturalResource {
  id: string
  slug: string
  title: {
    uz: string
    ru: string
    en: string
  }
  excerpt: {
    uz: string
    ru: string
    en: string
  }
  content: {
    uz: string
    ru: string
    en: string
  }
  image: string | null
  category: string
  images?: {
    main?: {
      url?: string
      thumb?: string
      card?: string
      detail?: string
      full?: string
    } | null
    gallery?: Array<{
      url?: string
      thumb?: string
      card?: string
      detail?: string
      full?: string
    }>
  }
  features: {
    uz: string[]
    ru: string[]
    en: string[]
  }
  stats?: {
    area?: string
    species?: string
    protected?: string
  }
  coordinates?: {
    lat: number
    lng: number
  } | null
  viewsCount?: number
  featured?: boolean
}
