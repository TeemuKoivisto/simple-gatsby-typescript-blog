import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'
import { ISiteData } from '../types/graphql'
// IoMdMail IoLogoLinkedin IoLogoGithub
import { IoMdMail, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'

import hyper from './logo-black-40.svg'

interface INavBarProps {
  site: ISiteData
}

export class NavBar extends React.PureComponent<INavBarProps> {
  render() {
    const { title } = this.props.site.siteMetadata
    return (
      <NavBarContainer>
        <Nav>
          <Logo src={hyper}/>
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
  background: linear-gradient(#5095fb -59%, #5FA0FF); // #589bff
`

const MyIconLinks = styled.div`
  display: flex;
`

const Logo = styled.img`
  margin-right: 20px;
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
  align-items: center;
  display: flex;
  padding: 40px;
  position: relative;
  ${raise(2)}
  @media screen and (max-width: 400px) {
    padding: 20px;
  }
`

const NavLink = styled(Link)`
  color: #fff;
  margin-right: 40px;
  text-decoration: none;
  position: relative;
  @media screen and (max-width: 400px) {
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
    @media screen and (max-width: 400px) {
      right: -10px;
    }
  }
`
