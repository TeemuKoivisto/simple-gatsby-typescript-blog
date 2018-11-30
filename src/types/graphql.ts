
export interface ISiteData {
  siteMetadata: {
    url: string
    title: string
    tagline: string
    description: string
    image: string
    twitterUser: string
    facebookAppID: string
  }
}

export interface IBlogPosts {
  totalCount: number
  edges: INode[]
}

export interface IBlogPostFrontmatter {
  title: string
  date: Date
  tags: string[]
}

export interface INode {
  node: {
    frontmatter: IBlogPostFrontmatter
    fields: {
      slug: string
    }
  }
}
