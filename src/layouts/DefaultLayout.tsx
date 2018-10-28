import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import styled from '../theme/styled'
import { defaultTheme, GlobalStyle } from '../theme/sc-default-theme'

import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

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
      <Footer data={data}/>
    </DefaultWrapper>
  </ThemeProvider>
)

const DefaultWrapper = styled.div`
  background: whitesmoke;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const DefaultContainer = styled.main`
  margin: ${({ theme }) => theme.margins.default};
  margin-bottom: ${({ theme }) => `calc(${theme.margins.default} + ${theme.sizes.footer})`};
  position: relative;
  height: 100%;
  & > div:first-child {
    /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
    padding: 30px 30px 0 30px;
    /* background: white; */
  }
`