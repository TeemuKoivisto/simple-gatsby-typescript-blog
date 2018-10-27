import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'
import { ISiteData } from '../types/graphql'

interface INavBarProps {
  data: ISiteData
}

export class NavBar extends React.PureComponent<INavBarProps> {
  render() {
    const { title } = this.props.data.site.siteMetadata
    return (
      <NavBarContainer>
        <Nav>
          <NavLink to="/">{title}</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/login" className="right-end">Sign in</NavLink>
        </Nav>
      </NavBarContainer>
    )
  }
}

const NavBarContainer = styled.div`

`

const Nav = styled.nav`
  display: flex;
  padding: 20px;
  position: relative;
  ${raise(2)};
`

const NavLink = styled(Link)`
  margin-right: 40px;
  text-decoration: none;
  position: relative;
  &.right-end {
    position: absolute;
    right: 5px;
  }
  &:not(:last-child):before {
    content: " ";
    cursor: auto;
    display: block;
    height: 1rem;
    width: 1px;
    right: -20px;
    position: absolute;
    top: 6px; // Hmm
    background-color: #757575; // #cbcbcb;
  }
`
