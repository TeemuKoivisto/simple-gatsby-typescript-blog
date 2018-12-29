import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Signature } from '../components/Signature'
import { BlogPager } from '../components/BlogPager'
import { BlogHeader } from '../components/BlogHeader'
import { ShareButtons } from '../components/ShareButtons'
import { Disqus } from '../components/Disqus'

import { ISiteData, ISEOBlogPost, IBlogPostFrontmatter } from '../types/graphql'

// There is a lot of other stuff in props, provided by Gatsby, that I'm not typing here
// since it would quite a lot of work.
interface IBlogPostTemplateProps {
  data: {
    site: ISiteData
    markdownRemark: {
      html: any
      excerpt: string
      frontmatter: IBlogPostFrontmatter
      fields: {
        slug: string
      }
    }
    seoImage: {
      landscape: {
        fluid: {
          src: string
        }
      }
    }
  }
  pageContext: {
    slug: string
    previous: {
      slug?: string
      title?: string
      datePublished?: string
    }
    next: {
      slug?: string
      title?: string
      datePublished?: string
    }
  }
  pathContext: {
    slug: string
    previous: {
      slug?: string
      title?: string
      datePublished?: string
    }
    next: {
      slug?: string
      title?: string
      datePublished?: string
    }
  }
  '*': string
  children: any
  location: any // lots of stuff
  navigate: (to: any, options: any) => void
  pageResources: {
    component: () => void
    page: any
  }
  path: string
}

export default class BlogPostTemplate extends React.PureComponent<IBlogPostTemplateProps> {
  render() {
    const { data: { site, markdownRemark, seoImage }, pageContext } = this.props
    const baseUrl = process.env.NODE_ENV === 'development' ? this.props.location.origin : site.siteMetadata.site.canonicalUrl
    const postUrl = `${baseUrl}${markdownRemark.fields.slug}`
    const blogPost = { ...site.siteMetadata, ...markdownRemark.frontmatter, ...{
      url: postUrl,
      image: seoImage.landscape && `${baseUrl}${seoImage.landscape.fluid.src}`,
    }} as ISEOBlogPost
    const title = markdownRemark.frontmatter.title
    return (
      <DefaultLayout title={title} seoBlogPost={blogPost}>
        <div>
          <BlogHeader frontmatter={markdownRemark.frontmatter}/>
          <h6>{markdownRemark.excerpt}</h6>
          <section dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          <Signature/>
          <BlogPager previous={pageContext.previous} next={pageContext.next}/>
          <ShareButtons url={postUrl} title={title}/>
          <Disqus shortname={site.siteMetadata.disqusShortname} title={title}/>
        </div>
      </DefaultLayout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($imageRegex: String!, $slug: String!) {
    site {
      ...SiteData
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        datePublished(formatString: "YYYY-MM-DD")
        dateModified(formatString: "YYYY-MM-DD")
        tags
        description
        images {
          publicURL
        }
      }
      fields {
        slug
      }
    }
    seoImage: file(relativePath: { regex: $imageRegex }) {
      landscape: childImageSharp {
        fluid(maxWidth: 1000) {
          src
        }
      }
    }
  }
`
