import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { defaultTheme } from '../theme/defaultTheme'

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
    <div>
      <NavBar data={data}/>
      { children }
    </div>
  </ThemeProvider>
)
