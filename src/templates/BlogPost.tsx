import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { SEO } from '../components/SEO'
import { Signature } from '../components/Signature'
import { BlogPager } from '../components/BlogPager'
import { BlogHeader } from '../components/BlogHeader'

import { ISiteData, IBlogPostFrontmatter } from '../types/graphql'

interface IBlogPostTemplateProps {
  data: {
    site: ISiteData
    markdownRemark: {
      html: any
      excerpt: string
      frontmatter: IBlogPostFrontmatter
    }
  }
}

export default class BlogPostTemplate extends React.PureComponent<IBlogPostTemplateProps> {
  render() {
    const { data: { site, markdownRemark }} = this.props
    return (
      <DefaultLayout title={markdownRemark.frontmatter.title}>
        <SEO site={site} frontmatter={markdownRemark.frontmatter}/>
        <div>
          <BlogHeader frontmatter={markdownRemark.frontmatter}/>
          <h6>{markdownRemark.excerpt}</h6>
          <MarkDownContainer dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          <Signature />
          <BlogPager />
        </div>
      </DefaultLayout>
    )
  }
}

const MarkDownContainer = styled.div`
`

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
    }
  }
`
