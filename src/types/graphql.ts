
export interface ISiteData {
  siteMetadata: {
    title: string
    description: string
    image: string
    facebookAppId: string
    disqusShortname: string
    site: {
      siteName: string
      canonicalUrl: string
    }
    author: {
      name: string
      schemaType: string
    }
    organization: {
      name: string
      url: string
    }
  }
}

export interface IBlogPosts {
  totalCount: number
  edges: INode[]
}

export interface IBlogPostFrontmatter {
  title: string
  date: string // Can be converted into date, which you can actually do in the graphql query (parseDate or something)
  description: string // Should be a short description about the topic, <=200 words. Mainly for SEO purposes.
  tags: string[]
  images: IImage[]
}

export interface IImage {
  publicURL: string
}

export interface INode {
  node: {
    frontmatter: IBlogPostFrontmatter
    fields: {
      slug: string
    }
  }
}
