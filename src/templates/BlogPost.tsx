import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Signature } from '../components/Signature'

interface IBlogPostTemplateProps {
  data: {
    markdownRemark: {
      html: any
      frontmatter: {
        title: string
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
          <h1>{post.frontmatter.title}</h1>
          <MarkDownContainer dangerouslySetInnerHTML={{ __html: post.html }} />
          <Signature />
        </div>
      </DefaultLayout>
    )
  }
}

const MarkDownContainer = styled.div`
  & > pre {
  }
`

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
