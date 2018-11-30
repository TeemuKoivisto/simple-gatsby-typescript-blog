import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

import { DefaultLayout } from '../layouts/DefaultLayout'

import { IBlogPosts, INode } from '../types/graphql'

interface IBlogPageProps {
  data: {
    allMarkdownRemark: IBlogPosts
  }
}

export default class BlogPage extends React.PureComponent<IBlogPageProps> {
  render() {
    const { data: { allMarkdownRemark }} = this.props
    return (
      <DefaultLayout>
        <div>
          <h1>My blog posts</h1>
          <ul>
            { allMarkdownRemark.edges.map(({ node }: INode) => 
            <li key={node.frontmatter.title}><Link to={node.fields.slug}>{node.frontmatter.title}</Link></li>
            )}
          </ul>
        </div>
      </DefaultLayout>
    )
  }
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        ...BlogPost
      }
    }
  }
  fragment BlogPost on MarkdownRemarkEdge {
    node {
      id
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
      fields {
        slug
      }
      excerpt
    }
  }
`

// export const query = graphql`
//   query {
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//           }
//           fields {
//             slug
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `

// export const query = graphql`
//   query BlogPageQuery {
//     site {
//       siteMetadata {
//         title
//         tagline
//       }
//     }
//   }
// `
