import * as React from 'react'
import { graphql } from 'gatsby'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Button } from '../elements/Button'

interface IFrontPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
      }
    }
  }
}

export default class FrontPage extends React.PureComponent<IFrontPageProps> {
  render() {
    const { title, tagline } = this.props.data.site.siteMetadata
    return (
      <DefaultLayout>
        <div>
          <h1>Front page</h1>
          <h1>{title}</h1>
          <p>{tagline}</p>
          <Button>I am a button</Button>
        </div>
      </DefaultLayout>
    )
  }
}

export const query = graphql`
  query FrontPageQuery {
    site {
      siteMetadata {
        title
        tagline
      }
    }
  }
`
