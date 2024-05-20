export type Neo4jDate = {
  day: number
  month: number
  year: number
}

export type Tag = {
  _id: string
  name: string
  article_count: number
  navigation_item: boolean
}

export type Author = {
  _id: string
  display_name: string
  article_count: number
  isAdmin: boolean
}

export type Article = {
  _id: string

  title: string
  content: string
  summary: string
  thumbnail_src: string
  views: number

  published: boolean

  tags: Tag[]

  author: Author

  authorship: {
    creation_date: Neo4jDate
    edition_date: Neo4jDate
  }

  cached?: boolean
}
