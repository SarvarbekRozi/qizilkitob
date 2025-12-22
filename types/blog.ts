export interface BlogPost {
  id: string
  slug: string
  title: {
    en: string
    uz: string
  }
  excerpt: {
    en: string
    uz: string
  }
  content: {
    en: string
    uz: string
  }
  image: string
  author: string
  publishDate: string
  category: string
  tags: string[]
}
