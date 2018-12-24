import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import ReactSEOMetaTags from 'react-seo-meta-tags'

import styled from '../theme/styled'
import { defaultTheme, GlobalStyle } from '../theme/sc-default-theme'

import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

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
        schemaType
      }
      organization {
        name
        logo
        url
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
  margin: ${({ theme }) => `4rem 2rem calc(4rem + ${theme.sizes.footer}) 2rem`};
  position: relative;
  height: 100%;
  @media screen and (max-width: 600px) {
    margin: ${({ theme }) => `2rem 1rem calc(2rem + ${theme.sizes.footer}) 1rem`};
  }
  @media screen and (max-width: 400px) {
    margin: ${({ theme }) => `2rem 0.5rem calc(2rem + ${theme.sizes.footer}) 0.5rem`};
  }
  & > div:first-child {
    /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
    padding: 30px 30px 0 30px;
  }
`
