import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

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
interface IProps {
  data: {
    site: ISiteData
    mdx: {
      body: any
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

export default class BlogPostTemplate extends React.PureComponent<IProps> {
  render() {
    const { data: { site, mdx, seoImage }, pageContext } = this.props
    const baseUrl = process.env.NODE_ENV === 'development' ? this.props.location.origin : site.siteMetadata.siteUrl
    const postUrl = `${baseUrl}${mdx.fields.slug}`
    // This abomination is the combination of siteMetadata from gatsby-config.js,
    // data from the markdown file this blog-post is generated from and the beautifully
    // mushed together URLs of the blog-post & its image so that in development it picks up
    // the localhost address and in production the canonical URL defined in gatsby-config.js
    const blogPost = { ...site.siteMetadata, ...mdx.frontmatter, ...{
      url: postUrl,
      image: seoImage && seoImage.landscape && `${baseUrl}${seoImage.landscape.fluid.src}`,
      publisher: site.siteMetadata.author,
    }} as ISEOBlogPost
    const title = mdx.frontmatter.title
    // Use markdown's description field if provided, otherwise just 100 first characters.
    const excerpt = mdx.frontmatter.description || mdx.excerpt
    return (
      <DefaultLayout title={title} seoBlogPost={blogPost}>
        <BlogContainer>
          <BlogHeader frontmatter={mdx.frontmatter} excerpt={excerpt}/>
          <section>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </section>
          <Signature/>
          <BlogPager previous={pageContext.previous} next={pageContext.next}/>
          <ShareButtons url={postUrl} title={title}/>
          <Disqus shortname={site.siteMetadata.disqusShortname} title={title}/>
        </BlogContainer>
      </DefaultLayout>
    )
  }
}

const BlogContainer = styled.div`

`

export const pageQuery = graphql`
  query BlogPostBySlug($imageRegex: String!, $slug: String!) {
    site {
      ...SiteData
    }
    mdx(fields: { slug: { eq: $slug }}) {
      body
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
