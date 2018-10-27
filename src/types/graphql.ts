
export interface ISiteData {
  site: {
    siteMetadata: {
      title: string
      tagline: string
    }
  }
}

export interface IBlogPosts {
  totalCount: number
  edges: INode[]
}

export interface INode {
  node: {
    frontmatter: {
      title: string
      date: Date
    }
    fields: {
      slug: string
    }
  }
}
