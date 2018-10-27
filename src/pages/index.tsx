import * as React from 'react'
import { graphql, Link } from 'gatsby'

import { DefaultLayout } from '../layouts/DefaultLayout'

import { IBlogPosts, INode } from '../types/graphql'

interface IFrontPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
      }
    },
    allMarkdownRemark: IBlogPosts
  }
}

export default class FrontPage extends React.Component<IFrontPageProps, {email: string, password: string}> {
  readonly state = {
    email: '',
    password: ''
  }
  render() {
    const { title, tagline } = this.props.data.site.siteMetadata
    const { data: { allMarkdownRemark }} = this.props
    return (
      <DefaultLayout>
        <div>
          <h1>This is my awesome website</h1>
          <p>{tagline}</p>
          <p>
            Hi, and welcome!
          </p>
          <div>
            <h2>My most recent blog posts</h2>
            <ul>
              { allMarkdownRemark.edges.map(({ node }: INode) => 
              <li key={node.frontmatter.title}><Link to={node.fields.slug}>{node.frontmatter.title}</Link></li>
              )}
            </ul>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

export const query = graphql`
  query FrontPageQuery {
    site {
      siteMetadata {
        title
        tagline
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        ...BlogPost
      }
    }
  }
`
