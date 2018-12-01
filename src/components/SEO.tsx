import React from "react"
import Helmet from "react-helmet"

import { ISiteData, IBlogPostFrontmatter } from '../types/graphql'

interface ISEOProps {
  site: ISiteData
  blogPost?: {
    frontmatter: IBlogPostFrontmatter
    url: string
  }
}

interface IBlogPost {
  frontmatter: IBlogPostFrontmatter
  url: string
}

const generateBlogJSONLD = ({ frontmatter, url }: IBlogPost) => ([
  {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    keywords: frontmatter.tags,
    url,
    datePublished: frontmatter.date,
    dateCreated: frontmatter.date,
    author: {
      '@type': 'Person',
      name: 'Teemu Koivisto'
    },
    // image, wordcount?
  }
])

const generateSiteJSONLD = ({ siteMetadata }: ISiteData) => ([
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url: siteMetadata.url,
    name: siteMetadata.title,
    description: siteMetadata.tagline,
    author: {
      '@type': 'Person',
      name: 'Teemu Koivisto'
    }
  }
])

/**
 * General SEO element that renders meta tags with react-helmet
 * Which is kinda shitty library, as it doesn't allow nested components inside of it.
 * So instead everything is rendered here as methods of this SEO. Sigh.
 */
export class SEO extends React.PureComponent<ISEOProps> {
  renderGeneral(description: string, image: string, JSONLD: object) {
    return ([
      // General tags
      <meta key="description" name="description" content={description} />,
      <meta key="image" name="image" content={image} />,
      // Schema.org tags
      <script key="application/ld+json" type="application/ld+json">
        {JSON.stringify(JSONLD)}
      </script>
    ])
  }
  renderFacebook(url: string, title: string, description: string, image: string, facebookAppId: string) {
    return ([
      <meta key="og:url" property="og:url" content={url} />,
      <meta key="og:type"  property="og:type" content="article" />,
      <meta key="og:title" property="og:title" content={title} />,
      <meta key="og:description" property="og:description" content={description} />,
      <meta key="og:image" property="og:image" content={image} />,
      <meta key="fb:app_id" property="fb:app_id" content={facebookAppId}/>
    ])
  }
  renderTwitter(title: string, description: string, image: string) {
    return ([
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
      // <meta name="twitter:creator" content={twitterUser} />,
      <meta key="twitter:title" name="twitter:title" content={title} />,
      <meta key="twitter:description" name="twitter:description" content={description} />,
      <meta key="twitter:image" name="twitter:image" content={image} />
    ])
  }
  render() {
    const { site, blogPost } = this.props
    const JSONLD = blogPost ? generateBlogJSONLD(blogPost) : generateSiteJSONLD(site)
    const { siteMetadata: { url, title, tagline, description, image, facebookAppId } } = site
    return (
      <Helmet>
        { this.renderGeneral(description, image, JSONLD) }
        { this.renderFacebook(url, title, description, image, facebookAppId) }
        { this.renderTwitter(title, description, image) }
      </Helmet>
    )
  }
}
