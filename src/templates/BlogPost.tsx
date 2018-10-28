import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Signature } from '../components/Signature'
import { BlogPager } from '../components/BlogPager'
import { BlogHeader } from '../components/BlogHeader'

interface IBlogPostTemplateProps {
  data: {
    markdownRemark: {
      html: any
      frontmatter: {
        title: string
        date: Date
      }
    }
  }
}

export default class BlogPostTemplate extends React.PureComponent<IBlogPostTemplateProps> {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <DefaultLayout>
        <div>
          <BlogHeader frontmatter={post.frontmatter}/>
          <MarkDownContainer dangerouslySetInnerHTML={{ __html: post.html }} />
          <Signature />
          <BlogPager />
        </div>
      </DefaultLayout>
    )
  }
}

const MarkDownContainer = styled.div`
`

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
