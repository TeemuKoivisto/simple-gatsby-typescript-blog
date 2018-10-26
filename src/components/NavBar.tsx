import * as React from 'react'
import { Link } from 'gatsby'

import styled from '../theme/styled'
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
`

const NavLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  &.right-end {
    position: absolute;
    right: 5px;
  }
`
