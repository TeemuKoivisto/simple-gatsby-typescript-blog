import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Signature } from '../components/Signature'
import { BlogPager } from '../components/BlogPager'
import { BlogHeader } from '../components/BlogHeader'
import { ShareButtons } from '../components/ShareButtons'
import { Disqus } from '../components/Disqus'

import { ISiteData, IBlogPostFrontmatter } from '../types/graphql'

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
  }
  pageContext: {
    slug: string
    previous: {
      slug?: string
      title?: string
      date?: string
    }
    next: {
      slug?: string
      title?: string
      date?: string
    }
  }
}

export default class BlogPostTemplate extends React.PureComponent<IBlogPostTemplateProps> {
  render() {
    const { data: { site, markdownRemark }, pageContext } = this.props
    const url = `${site.siteMetadata.url}/${markdownRemark.fields.slug}`
    const blogPost = {
      frontmatter: markdownRemark.frontmatter,
      description: markdownRemark.excerpt,
      url,
    }
    const title = markdownRemark.frontmatter.title
    return (
      <DefaultLayout title={title} seoBlogPost={blogPost}>
        <div>
          <BlogHeader frontmatter={markdownRemark.frontmatter}/>
          <h6>{markdownRemark.excerpt}</h6>
          <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          <Signature />
          <BlogPager previous={pageContext.previous} next={pageContext.next}/>
          <ShareButtons url={url} title={title}/>
          <Disqus shortname={site.siteMetadata.disqusShortname} title={title}/>
        </div>
      </DefaultLayout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      ...SiteData
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
      }
      fields {
        slug
      }
    }
  }
`
