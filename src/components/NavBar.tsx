import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'
import { ISiteData } from '../types/graphql'

import { NavDropdown } from '../elements/NavDropdown'
import { MyIconLinks } from '../elements/MyIconLinks'

import hyper from './logo-black-40.svg'

interface INavBarProps {
  site: ISiteData
}

export class NavBar extends React.PureComponent<INavBarProps> {
  render() {
    const { title } = this.props.site.siteMetadata
    const navDropdownOptions = [
      { key: '/', title: 'Frontpage' },
      { key: '/blog', title: 'Blog' },
    ]
    return (
      <NavBarContainer>
        <Nav>
          <Logo src={hyper}/>
          <NavLink className="title" to="/">{title}</NavLink>
          <NavLink className="blog-link" to="/blog">Blog</NavLink>
          <MyIconLinks />
          <NavDropdown options={navDropdownOptions} onSelect={(e: any) => console.log(e)}/>
        </Nav>
      </NavBarContainer>
    )
  }
}

const NavBarContainer = styled.header`
  background: linear-gradient(#5095fb -59%, #5FA0FF); // #589bff
`
const Logo = styled.img`
  margin-right: 20px;
`
const Nav = styled.nav`
  align-items: center;
  display: flex;
  padding: 40px;
  position: relative;
  ${raise(2)}
  @media screen and (max-width: 460px) {
    padding: 20px;
  }
  .title {
    font-family: 'Rubik',sans-serif;
    font-weight: 500;
    text-rendering: optimizeLegibility;
    /* font-size: 1.2rem; */
    /* line-height: 1.1; */
  }
  ${NavDropdown} {
    visibility: hidden;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 420px) {
    > ${MyIconLinks} {
      display: none;
      visibility: hidden;
    }
    .blog-link {
      display: none;
      visibility: hidden;
    }
    ${NavDropdown} {
      visibility: initial;
    }
  }
`

const NavLink = styled(Link)`
  color: #fff;
  margin-right: 40px;
  text-decoration: none;
  position: relative;
  @media screen and (max-width: 460px) {
    margin-right: 20px;
  }
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
    background-color: #fff; // #757575; #cbcbcb;
    @media screen and (max-width: 460px) {
      right: -10px;
    }
  }
`
