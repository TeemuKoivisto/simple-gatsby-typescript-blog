import React from 'react'
import { graphql } from 'gatsby'

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
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </DefaultLayout>
    )
  }
}

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
