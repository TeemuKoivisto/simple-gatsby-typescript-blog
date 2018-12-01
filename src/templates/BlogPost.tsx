import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { SEO } from '../components/SEO'
import { Signature } from '../components/Signature'
import { BlogPager } from '../components/BlogPager'
import { BlogHeader } from '../components/BlogHeader'
import { Disqus } from '../components/Disqus'

import { ISiteData, IBlogPostFrontmatter } from '../types/graphql'

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
}

export default class BlogPostTemplate extends React.PureComponent<IBlogPostTemplateProps> {
  render() {
    const { data: { site, markdownRemark }} = this.props
    const url = site.siteMetadata.url + '/' + markdownRemark.fields.slug
    const blogPost = { frontmatter: markdownRemark.frontmatter, url }
    return (
      <DefaultLayout title={markdownRemark.frontmatter.title} seoBlogPost={blogPost}>
        <div>
          <BlogHeader frontmatter={markdownRemark.frontmatter}/>
          <h6>{markdownRemark.excerpt}</h6>
          <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          <Signature />
          <BlogPager />
          <Disqus shortname={site.siteMetadata.disqusShortname} title={markdownRemark.frontmatter.title}/>
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
        date
        tags
      }
      fields {
        slug
      }
    }
  }
`
