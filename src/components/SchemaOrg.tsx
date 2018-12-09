interface ISiteProps {
  url: string
  title: string
  description: string
  author: {
    name: string
  }
}

interface IBreadcrumbProps {
  url: string
  title: string
  image: string
}

interface IBlogPostingProps {
  url: string
  title: string
  description: string
  image: string
  date: string
  canonicalUrl: string
  tags: string[]
  author: {
    name: string
  }
  organization: {
    name: string
    url: string
  }
}

const generateSiteJSONLD = ({ url, title, description, author } : ISiteProps) => (
{
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  url,
  name: title,
  description,
  author: {
    '@type': 'Person',
    name: author.name
  }
})

const generateBreadcrumbList = ({ url, title, image } : IBreadcrumbProps) => (
{
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': url,
        name: title,
        image,
      },
    },
  ],
})

const generateBlogPosting = ({ url, title, description, image, date, tags, canonicalUrl, author, organization } : IBlogPostingProps) => (
{
  '@context': 'http://schema.org',
  '@type': 'BlogPosting',
  url,
  name: title,
  // alternateName: defaultTitle,
  headline: title,
  keywords: tags,
  description,
  author: {
    '@type': 'Person',
    name: author.name,
  },
  image: {
    '@type': 'ImageObject',
    url: image,
  },
  publisher: {
    '@type': 'Organization',
    url: organization.url,
    // logo: organization.logo,
    name: organization.name,
  },
  mainEntityOfPage: {
    '@type': 'WebSite',
    '@id': canonicalUrl,
  },
  datePublished: date,
  dateModified: date, // Recommended by https://search.google.com/structured-data/testing-tool
})

export const createWebsiteJSONLD = (props: ISiteProps) =>
  JSON.stringify([
    generateSiteJSONLD(props)
  ])

export const createBlogPostJSONLD = (props: IBlogPostingProps) =>
  JSON.stringify([
    generateSiteJSONLD(props),
    generateBreadcrumbList(props),
    generateBlogPosting(props)
  ])
