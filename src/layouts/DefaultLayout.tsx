import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import ReactSEOMetaTags from 'react-seo-meta-tags'

import styled from '../theme/styled'
import { defaultTheme, GlobalStyle } from '../theme/sc-default-theme'

import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

import { breakpoints } from '../constants'

import { ISiteData, ISEOBlogPost } from '../types/graphql'

const siteDataQuery = graphql`
  query {
    site {
      ...SiteData
    }
  }
  fragment SiteData on Site {
    siteMetadata {
      title
      description
      image
      facebookAppId
      disqusShortname
      site {
        siteName
        canonicalUrl
      }
      author {
        name
        image
      }
    }
  }
  fragment BlogPost on MarkdownRemarkEdge {
    node {
      id
      frontmatter {
        title
        description
        datePublished(formatString: "YYYY-MM-DD")
        dateModified(formatString: "YYYY-MM-DD")
        tags
        images {
          publicURL
        }
      }
      fields {
        slug
      }
      excerpt
    }
  }
`

interface IProps {
  children: React.ReactNode
  title?: string
  seoBlogPost?: ISEOBlogPost
}

// This kinda boilerplatish wrapping is because StaticQuery only offers render-method
// for rendering children
export const DefaultLayout: React.SFC<IProps> = (props: IProps) => (
  <StaticQuery query={siteDataQuery} render={DefaultContent(props)}/>
)

const DefaultContent = ({ children, seoBlogPost }: IProps) => ({ site }: { site: ISiteData }) => (
  <ThemeProvider theme={defaultTheme}>
    <DefaultWrapper>
      <ReactSEOMetaTags
        render={(el: any) => <Helmet>{el}</Helmet>}
        website={site.siteMetadata}
        blogPost={seoBlogPost}
        facebook={{ facebookAppId: site.siteMetadata.facebookAppId }}
      />
      <Helmet>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#2d89ef"/>
        <meta name="theme-color" content="#ffffff"/>
      </Helmet>
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
  background: #f1f3ff;
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
  background: #fff;
  border-radius: 20px;
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
  max-width: 800px;
  margin: ${({ theme }) => `4rem auto calc(4rem + ${theme.sizes.footer}) auto`};
  max-width: 600px;
  position: relative;
  height: 100%;
  & > div:first-child {
    padding: 2rem 3vw 0 4vw;
  }
  @media screen and (min-width: 900px) {
    max-width: 800px;
    & > div:first-child {
      padding: 2rem 8vw 0 8vw;
    }
  }
  @media screen and (min-width: ${breakpoints.large}px) {
    & > div:first-child {
      padding: 2rem 6rem 0 6rem;
    }
  }
  @media screen and (max-width: 650px) {
    margin: ${({ theme }) => `2rem 1rem calc(2rem + ${theme.sizes.footer}) 1rem`};
  }
  @media screen and (max-width: 400px) {
    margin: ${({ theme }) => `2rem 0.5rem calc(2rem + ${theme.sizes.footer}) 0.5rem`};
  }
`
