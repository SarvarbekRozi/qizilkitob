export interface NaturalResource {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  features: string[]
  stats?: {
    area?: string
    species?: string
    protected?: string
  }
}
