export interface BlogPost {
  id: string
  slug: string
  title: {
    en: string
    ru: string
    uz: string
  }
  excerpt: {
    en: string
    ru: string
    uz: string
  }
  content?: {
    en: string
    ru: string
    uz: string
  }
  image: string | null
  author: string
  publishDate: string
  category?: {
    id: number
    slug: string
    title: string
  } | null
  tags: Array<{
    id: number
    slug: string
    title: string
  }>
  images?: {
    main?: {
      url?: string
      thumb?: string
      card?: string
      full?: string
    } | null
  }
  viewsCount?: number
  video?: string
  audio?: string
}

export interface BlogComment {
  id: number
  author: string
  message: string
  date: string
  replies?: BlogComment[]
}
