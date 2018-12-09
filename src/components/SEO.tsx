import React from 'react'
import Helmet from 'react-helmet'
import { createWebsiteJSONLD, createBlogPostJSONLD } from './SchemaOrg'

import { ISiteData, IBlogPostFrontmatter } from '../types/graphql'

interface ISEOProps {
  site: ISiteData
  blogPost?: IBlogPost
}

interface IBlogPost {
  frontmatter: IBlogPostFrontmatter
  url: string
  description: string
  seoImage: string
}

/**
 * General SEO element that renders meta tags with react-helmet
 * Which is kinda shitty library, as it doesn't allow nested components inside of it.
 * So instead everything is rendered here as methods of this SEO. Sigh.
 */
export class SEO extends React.PureComponent<ISEOProps> {
  renderGeneral(description: string, image: string) {
    return ([
      // General tags
      <meta key="description" name="description" content={description} />,
      <meta key="image" name="image" content={image} />,
      // Google site verification TODO
      <meta key="google-site-verification" name="google-site-verification" content="4GIke6DKlXgvoQ1caBPxl2PHfw9Ul81M46TI3KhGwS8" />
    ])
  }
  renderNonBlogOgTags() {
    return ([
      <meta key="og:type" property="og:type" content="website" />,
    ])
  }
  renderBlogOgTags() {
    return ([
      <meta key="og:type" property="og:type" content="article" />,
    ])
  }
  renderFacebook(url: string, title: string, description: string, image: string, siteName: string, facebookAppId: string) {
    return ([
      <meta key="og:url" property="og:url" content={url} />, // Important
      <meta key="og:title" property="og:title" content={title} />, // Important
      <meta key="og:description" property="og:description" content={description} />, // Somewhat important
      // Facebook recommends 1200x630 size, ratio of 1.91:1
      // But 1200x1200 is also fine
      <meta key="og:image" property="og:image" content={image} />, // Important
      <meta key="og:site_name" property="og:site_name" content={siteName} />, // Eeh... can't hurt?
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
  renderBlogPostSEO({ siteMetadata }: ISiteData, blogPost: IBlogPost) {
    const { title, date, description, tags } = blogPost.frontmatter
    const image = blogPost.seoImage || siteMetadata.image
    return (
      <Helmet>
        { this.renderGeneral(description, image) }
        <script key="application/ld+json" type="application/ld+json">
          { createBlogPostJSONLD({
            url: blogPost.url,
            title,
            description,
            image,
            tags,
            date,
            canonicalUrl: siteMetadata.canonicalUrl,
            author: siteMetadata.author,
            organization: siteMetadata.organization,
          })}
        </script>,
        { this.renderBlogOgTags() }
        { this.renderFacebook(blogPost.url, title, description, image, siteMetadata.siteName, siteMetadata.facebookAppId) }
        { this.renderTwitter(title, description, image) }
      </Helmet>
    )
  }
  render() {
    const { site: { siteMetadata }, blogPost } = this.props
    const { canonicalUrl, title, siteName, description, image, author, facebookAppId } = siteMetadata
    // http://ogp.me/#types
    if (blogPost) {
      return this.renderBlogPostSEO(this.props.site, blogPost)
    }
    return (
      <Helmet>
        { this.renderGeneral(description, image) }
        <script key="application/ld+json" type="application/ld+json">
          { createWebsiteJSONLD({
            url: canonicalUrl, // TODO WRONG, should be page's url
            title,
            description,
            author,
          })}
        </script>,
        { this.renderNonBlogOgTags() }
        { this.renderFacebook(canonicalUrl, title, description, image, siteName, facebookAppId) }
        { this.renderTwitter(title, description, image) }
      </Helmet>
    )
  }
}
