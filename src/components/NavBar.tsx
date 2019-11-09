import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'
import { ISiteData } from '../types/graphql'

import { NavDropdown } from '../elements/NavDropdown'
import { MyIconLinks } from '../elements/MyIconLinks'

interface IProps {
  site: ISiteData
}

function NavBarEl(props: IProps) {
  const { title } = props.site.siteMetadata
  const navDropdownOptions = [
    { key: '/', title: 'Frontpage' },
    { key: '/blog', title: 'Blog' },
  ]
  return (
    <NavBarContainer>
      <Nav>
        <TitleLink to="/">
          <Title>Teemu</Title>
          <Title>Koivisto</Title>
        </TitleLink>
        <NavLink className="blog-link" to="/blog">Blog</NavLink>
        <MyIconLinks />
        <NavDropdown options={navDropdownOptions} onSelect={(e: any) => console.log(e)}/>
      </Nav>
    </NavBarContainer>
  )
}

const NavBarContainer = styled.header`
  background: linear-gradient(#5095fb -59%, #5FA0FF); // #589bff
  position: relative;
  z-index: 1;
`
const Title = styled.h1`
  color: #fff;
  font-family: 'Permanent Marker', cursive;
  font-size: 26px;
  letter-spacing: 2px;
  line-height: 26px;
  margin: 0;
  text-rendering: optimizeLegibility;
  text-shadow: 2px 2px #2b274f;
  &:nth-child(2) {
    margin-left: 12px;
  }
`
const TitleLink = styled(Link)`
  cursor: pointer;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0 40px 0 40px;
`
const Nav = styled.nav`
  align-items: center;
  display: flex;
  padding: 32px 0;
  position: relative;
  ${raise(2)}
  ${NavDropdown} {
    visibility: hidden;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }
  @media screen and (max-width: 500px) {
    padding: 20px 0;
    & > ${MyIconLinks} {
      display: none;
      visibility: hidden;
    }
    .blog-link {
      display: none;
      visibility: hidden;
    }
    ${NavDropdown} {
      visibility: visible;
    }
  }
`

const NavLink = styled(Link)`
  color: #fff;
  margin-right: 40px; // For spacing out the dividing bars
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
export const NavBar = styled(NavBarEl)``
