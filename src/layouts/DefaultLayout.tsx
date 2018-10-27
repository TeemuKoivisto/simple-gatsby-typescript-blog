import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import styled from '../theme/styled'
import { defaultTheme, GlobalStyle } from '../theme/sc-default-theme'

import { NavBar } from '../components/NavBar' 

import { ISiteData } from '../types/graphql'

const siteDataQuery = graphql`
  query SiteDataQuery {
    site {
      siteMetadata {
        title
        tagline
      }
    }
  }
`

export const DefaultLayout = ({ children }) => (
  <StaticQuery query={siteDataQuery} render={DefaultContent(children)}/>
)

const DefaultContent = (children: React.ReactChildren) => (data: ISiteData) => (
  <ThemeProvider theme={defaultTheme}>
    <DefaultWrapper>
      <NavBar data={data}/>
      <DefaultContainer>
        { children }
      </DefaultContainer>
      <GlobalStyle/>
    </DefaultWrapper>
  </ThemeProvider>
)

const DefaultWrapper = styled.main`
`

const DefaultContainer = styled.div`
  margin: ${({ theme }) => theme.margins.default};
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: whitesmoke;
    background-size: cover;
    display: block;
    content: ' ';
    z-index: -1;
    height: 100%;
  }
`