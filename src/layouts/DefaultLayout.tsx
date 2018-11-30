import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import styled from '../theme/styled'
import { defaultTheme, GlobalStyle } from '../theme/sc-default-theme'

import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { SEO } from '../components/SEO'

import { ISiteData } from '../types/graphql'

const siteDataQuery = graphql`
  query {
    site {
      ...SiteData
    }
  }
  fragment SiteData on Site {
    siteMetadata {
      url
      title
      tagline
      description
      image
      twitterUser
      facebookAppID
    }
  }
`

interface IProps {
  children: React.ReactNode
  title?: string
  seoBlogPost?: any
}

// This kinda boilerplatish wrapping is because StaticQuery only offers render-method
// for rendering children
export const DefaultLayout: React.SFC<IProps> = (props: IProps) => (
  <StaticQuery query={siteDataQuery} render={DefaultContent(props)}/>
)

const DefaultContent = ({ children, title, seoBlogPost }: IProps) => ({ site }: { site: ISiteData }) => (
  <ThemeProvider theme={defaultTheme}>
    <DefaultWrapper>
      <Helmet>
        <title>{ title || site.siteMetadata.title }</title>
      </Helmet>
      <SEO site={site} blogPost={seoBlogPost}/>
      <NavBar site={site}/>
      <DefaultContainer>
        { children }
      </DefaultContainer>
      <GlobalStyle/>
      <Footer site={site}/>
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