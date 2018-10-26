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
      { children }
      <GlobalStyle/>
    </DefaultWrapper>
  </ThemeProvider>
)

const DefaultWrapper = styled.main`
  margin: 20px;
`
