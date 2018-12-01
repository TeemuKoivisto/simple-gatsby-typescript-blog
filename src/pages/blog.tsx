import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import styled, { raise } from '../theme/styled'

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
          <BlogList>
            { allMarkdownRemark.edges.map(({ node }: INode) => 
            <li key={node.frontmatter.title}>
              <BlogLink to={node.fields.slug}>
                <Date>{node.frontmatter.date}</Date>
                <Title>{node.frontmatter.title}</Title>
              </BlogLink>
              <Tags>
                { node.frontmatter.tags.map((t, i) =>
                <Tag key={i}>{t}</Tag>
                )}
              </Tags>
            </li>
            )}
          </BlogList>
        </div>
      </DefaultLayout>
    )
  }
}

const BlogList = styled.ul`
  & > li {
    display: flex;
  }
`

const BlogLink = styled(Link)`
  align-items: center;
  display: flex;
`

const Date = styled.div`
  margin-right: 15px;
`

const Title = styled.div`
  margin-right: 15px;
`

const Tags = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`

const Tag = styled.p`
  background: #ff3354c9; // #393d3ead
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  margin: 0 5px 5px 0 !important; // god damn typography library, drives me crazy with its dumb global styles
  padding: 0 3px 0 3px;
  ${raise(1)};
`

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        ...BlogPost
      }
    }
  }
`
