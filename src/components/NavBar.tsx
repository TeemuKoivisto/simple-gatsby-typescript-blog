import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'
import { ISiteData } from '../types/graphql'
// IoMdMail IoLogoLinkedin IoLogoGithub
import { IoMdMail, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'

interface INavBarProps {
  site: ISiteData
}

export class NavBar extends React.PureComponent<INavBarProps> {
  render() {
    const { title } = this.props.site.siteMetadata
    return (
      <NavBarContainer>
        <Nav>
          <NavLink to="/">{title}</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <MyIconLinks>
            <IconLink href="mailto:contact@teemukoivisto.xyz">
              <IoMdMail size={24}/>
            </IconLink>
            <IconLink href="https://github.com/teemukoivisto">
              <IoLogoGithub size={24}/>
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/teemu-koivisto-75304b114">
              <IoLogoLinkedin size={24}/>
            </IconLink>
          </MyIconLinks>
        </Nav>
      </NavBarContainer>
    )
  }
}

const NavBarContainer = styled.header`
  background: linear-gradient(#1773dad1 -59%, #298effc9);
`

const MyIconLinks = styled.div`
  display: flex;
`

const IconLink = styled.a`
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  &:not(:last-child) {
    margin-right: 10px;
  }
`

const Nav = styled.nav`
  display: flex;
  padding: 40px;
  position: relative;
  ${raise(2)};
`

const NavLink = styled(Link)`
  color: #fff;
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
    background-color: #fff; // #757575; #cbcbcb;
  }
`
