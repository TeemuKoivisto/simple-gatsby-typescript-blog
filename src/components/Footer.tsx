import * as React from 'react'
import { Link } from 'gatsby'

import styled from '../theme/styled'
import { ISiteData } from '../types/graphql'

import { MyIconLinks } from '../elements/MyIconLinks'

interface IProps {
  site: ISiteData
}

function FooterEl(props: IProps) {
  const { title } = props.site.siteMetadata
  return (
    <FooterContainer>
      <NavWrapper>
        <Nav>
          <NavLink to="/" className="title">{title}</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <MyIconLinks />
        </Nav>
        <SmallPrint>
          <CopyrightNotice>{`Copyright © ${new Date().getFullYear()}, Teemu Koivisto`}</CopyrightNotice>
          <SourceLink href="https://github.com/TeemuKoivisto/simple-gatsby-typescript-blog">
            This site's code is Open Source
          </SourceLink>
        </SmallPrint>
      </NavWrapper>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background: linear-gradient(#5FA0FF -59%, #589bff);
  /* border-top: 1px solid hsla(0,0%,0%,0.2); */
  width: 100%;
`
const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 20px;
  position: relative;
`
const NavLink = styled(Link)`
  color: #fff;
  margin-right: 40px;
  text-decoration: none;
  position: relative;
  @media screen and (max-width: 400px) {
    margin-right: 20px;
  }
  &.title {
    color: #fff;
    font-family: 'Permanent Marker',cursive;
    text-shadow: 2px 2px #2b274f;
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
    background-color: #fff;
    @media screen and (max-width: 400px) {
      right: -10px;
    }
  }
`
const SmallPrint = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > * {
    margin: 0;
  }
`
const CopyrightNotice = styled.p`
  font-size: 12px;
`
const SourceLink = styled.a`
  font-size: 12px;
`
export const Footer = styled(FooterEl)``
