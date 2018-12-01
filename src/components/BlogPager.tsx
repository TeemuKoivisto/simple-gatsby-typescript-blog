import * as React from 'react'
import { Link } from 'gatsby'

import styled from '../theme/styled'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

interface IBlogPagerProps {
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

export class BlogPager extends React.PureComponent<IBlogPagerProps> {
  render() {
    const { previous, next } = this.props
    return (
      <BlogPagerContainer>
        { previous.slug ?
        <IconLink to={previous.slug}>
          <FiChevronsLeft size={24}/>
          <LinkText className="m-left">
            <p>{previous.title}</p>
            <p>{previous.date}</p>
          </LinkText>
        </IconLink> : <div></div>}
        { next.slug ? <IconLink to={next.slug}>
          <LinkText className="m-right">
            <p>{next.title}</p>
            <p>{next.date}</p>
          </LinkText>
          <FiChevronsRight size={24}/>
        </IconLink> : <div></div>}
      </BlogPagerContainer>
    )
  }
}

const BlogPagerContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 20px;
  & > svg {
  }
`

const IconLink = styled(Link)`
  align-items: center;
  color: black;
  display: flex;
`

const LinkText = styled.div`
  margin: 0;
  &.m-left {
    margin-left: 20px;
  }
  &.m-right {
    margin-right: 20px;
  }
  & > p:first-child {
    font-weight: bold;
  }
  & > p {
    margin: 0;
  }
`