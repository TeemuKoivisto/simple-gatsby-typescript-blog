import * as React from 'react'
import { Link } from 'gatsby'

import styled from '../theme/styled'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

interface IBlogPagerProps {
}

export class BlogPager extends React.PureComponent<IBlogPagerProps> {
  render() {
    return (
      <BlogPagerContainer>
        <IconLink to="blog/prev">
          <FiChevronsLeft size={24}/>
          <LinkText className="m-left">Long time ago ...</LinkText>
        </IconLink>
        <IconLink to="blog/next">
          <LinkText className="m-right">I invented the future!</LinkText>
          <FiChevronsRight size={24}/>
        </IconLink>
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

const LinkText = styled.p`
  margin: 0;
  &.m-left {
    margin-left: 20px;
  }
  &.m-right {
    margin-right: 20px;
  }
`