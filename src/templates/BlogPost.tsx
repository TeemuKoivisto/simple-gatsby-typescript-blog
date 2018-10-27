import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'
import { DefaultLayout } from '../layouts/DefaultLayout'

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
        <Container>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Container>
      </DefaultLayout>
    )
  }
}

const Container = styled.div`
  margin: ${({ theme }) => theme.margins.default};
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
