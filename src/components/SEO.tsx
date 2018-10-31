import React from "react"
import Helmet from "react-helmet"

import { ISiteData, IBlogPostFrontmatter } from '../types/graphql'

interface IProps {
  site: ISiteData
  frontmatter?: IBlogPostFrontmatter
}

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

const generateBlogJSONLD = ({ siteMetadata }: ISiteData, frontmatter: IBlogPostFrontmatter) => ([
  {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    keywords: frontmatter.tags,
    url: siteMetadata.url + '/slug',
    datePublished: frontmatter.date,
    dateCreated: frontmatter.date,
    author: {
      '@type': 'Person',
      name: 'Teemu Koivisto'
    },
    // image, wordcount?
  }
])

export class SEO extends React.PureComponent<IProps> {
  render() {
    const { site, frontmatter } = this.props
    const JSONLD = frontmatter ? generateBlogJSONLD(site, frontmatter) : generateSiteJSONLD(site)
    const { siteMetadata: { url, title, tagline, description, image, twitterUser, facebookAppID } } = site
    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(JSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        {frontmatter ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="fb:app_id"
          content={facebookAppID}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={twitterUser}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    )
  }
}
